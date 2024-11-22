const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const Admin = "Cliente";

app.use(cors(corsOptions));
app.use(express.json());

const { Pool } = require("pg");
const { DB_CONFIG } = require("./Config/secretKey");
const pool = new Pool(DB_CONFIG);

// Verificar conexión a la base de datos
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err);
  } else {
    console.log("Conexión exitosa a la base de datos:", res.rows[0]);
  }
});

// Importar middlewares y modelos
const { verifyToken, crearToken } = require("./Middlewares/authMiddleware");
const { checkCredenciales } = require("./Middlewares/checkCredenciales");
const {
  saveUser,
  getProductos,
  getProducto,
  addProducto,
  modificarProducto,
  createOrder,
  getOrderDetailsById,
  modificarStatusOrden,
  getMyOrders,
} = require("./Models/consultas");

// Rutas Login
app.post("/api/login", checkCredenciales, crearToken);

app.post("/api/crearUsuario", async (req, res) => {
  const usuario = req.body;
  try {
    const user = await saveUser(usuario);
    console.log(`Respuesta: ${user}`);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(err.code).json(err.message);
  }
});

app.get("/api", async (req, res) => {
  res.status(200).json({ message: "Bienvenido a la API Proyecto Final" });
});

// Nueva Ruta: Obtener todos los productos
app.get("/api/productos", async (req, res) => {
  try {
    const productos = await getProductos();
    res.status(200).json(productos);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Ruta para obtener un producto específico por su partnumber
app.get("/api/productos/:partnumber", async (req, res) => {
  const { partnumber } = req.params;
  try {
    const producto = await getProducto(partnumber);
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (err) {
    console.error("Error al obtener producto:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Rutas para manejo de errores
app.get("*", (req, res) => {
  res.status(404).json({ message: "No existe la ruta" });
});
app.post("*", (req, res) => {
  res.status(404).json({ message: "No existe la ruta" });
});

// Servidor
app.listen(3001, () => {
  console.log("Sevidor activo en el puerto 3001");
});

module.exports = app;
