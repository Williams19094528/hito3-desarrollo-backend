const { verificarCredenciales } = require("./Models/consultas");

const usuario = {
  email: "admin@hito3.com",
  password: "admin123", // Ajusta este valor si cambiaste la contraseña en la BD
};

verificarCredenciales(usuario)
  .then((result) => {
    console.log("Credenciales verificadas:", result);
  })
  .catch((err) => {
    console.error("Error al verificar credenciales:", err);
  });
