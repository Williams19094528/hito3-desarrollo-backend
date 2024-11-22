const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../Config/secretKey");
const { verificarCredenciales } = require("../Models/consultas");

const verifyToken = (req, res, next) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No hay token" });
  }
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.userId = payload.id;
    req.tipo = payload.tipo;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Token no valido" });
  }
};

const crearToken = async (req, res, next) => {
  try {
    const user = await verificarCredenciales(req.body);
    if (!user) {
      res.status(401).json({ message: "Credenciales incorrectas" });
    } else {
      const token = Token(user);
      res.status(201).json({ token });
    }
  } catch (err) {
    console.log(err);
    res.status(err.code).json(err.message);
  }
};

const Token = (usuario) => {
  console.log(`usuario: ${usuario}`);
  const payload = {
    email: usuario.email,
    tipo: usuario.tipo,
    id: usuario.usuario_id,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "7d", algorithm: "HS256" });
};

module.exports = { verifyToken, crearToken };
