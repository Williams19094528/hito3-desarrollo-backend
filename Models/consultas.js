const { DB_CONFIG, SALT_ROUNDS } = require("../Config/secretKey");
const { Pool } = require("pg");
const format = require("pg-format");
const bcrypt = require("bcryptjs");

const pool = new Pool(DB_CONFIG);

// Verifica las credenciales del usuario
const verificarCredenciales = async (usuario) => {
  const { email, password } = usuario;

  console.log("Datos recibidos en verificarCredenciales:", { email, password });

  const query = format(
    "SELECT usuarios.email, perfil.tipo, usuarios.password, clientes.nombre, clientes.apellido, clientes.usuario_id FROM usuarios JOIN perfil ON usuarios.id = perfil.usuario_id JOIN clientes ON clientes.usuario_id = perfil.usuario_id WHERE usuarios.email = %L",
    email
  );

  console.log("Consulta generada:", query);

  try {
    const result = await pool.query(query);
    console.log("Resultado de la consulta:", result.rows);

    if (
      !result.rows[0] ||
      !bcrypt.compareSync(password, result.rows[0].password)
    ) {
      console.log("Credenciales incorrectas");
      throw { code: 401, message: "Credenciales incorrectas" };
    }

    console.log("Credenciales verificadas:", result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error("Error en verificarCredenciales:", err);
    throw err;
  }
};

// Obtener todos los productos
const getProductos = async () => {
  const query = "SELECT * FROM productos";
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error("Error en getProductos:", err);
    throw err;
  }
};

// Obtener un producto por su partnumber
const getProducto = async (partnumber) => {
  const query = format(
    "SELECT * FROM productos WHERE partnumber = %L",
    partnumber
  );
  try {
    const result = await pool.query(query);
    return result.rows[0];
  } catch (err) {
    console.error("Error en getProducto:", err);
    throw err;
  }
};

// Guarda un nuevo usuario
const saveUser = async (user) => {
  let { email, password, nombre, apellido, direccion, telefono } = user;

  console.log("Datos recibidos en saveUser:", { email, nombre, apellido });

  email = email.toLowerCase();
  const checkEmail = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );

  if (checkEmail.rows.length > 0) {
    console.log("El usuario ya existe:", email);
    throw { code: 409, message: "El usuario ya existe" };
  }

  const passwordEncriptada = bcrypt.hashSync(password);
  const values = [email, passwordEncriptada];

  console.log("Valores a insertar en usuarios:", values);

  try {
    const insertUserQuery = `
      INSERT INTO usuarios (email, password) 
      VALUES ($1, $2) RETURNING id
    `;
    const userId = (await pool.query(insertUserQuery, values)).rows[0].id;

    console.log("ID del nuevo usuario:", userId);

    const respuesta = await pool.query(
      "INSERT INTO clientes (usuario_id, nombre, apellido, direccion, telefono) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, nombre, apellido, direccion, telefono]
    );

    console.log("Nuevo cliente insertado:", respuesta.rows[0]);
    return respuesta.rows[0];
  } catch (err) {
    console.error("Error en saveUser:", err);
    throw err;
  }
};

module.exports = {
  verificarCredenciales,
  saveUser,
  getProductos,
  getProducto,
};
