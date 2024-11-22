const { saveUser } = require("./Models/consultas");

const usuario = {
  email: "newuser@example.com",
  password: "123456",
  nombre: "Carlos",
  apellido: "Diaz",
  direccion: "Calle Nueva 456",
  telefono: "9876543210",
};

saveUser(usuario)
  .then((result) => {
    console.log("Usuario creado:", result);
  })
  .catch((err) => {
    console.error("Error al crear usuario:", err);
  });
