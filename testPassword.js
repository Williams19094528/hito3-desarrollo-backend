const bcrypt = require("bcryptjs");

// Contraseña en la base de datos
const hashedPassword =
  "$2a$10$MCc/ZSd0Hc5Ox6LRXKR.VOtQUuNfv.5ucGRaK.2sJNiPKvhA66cGi";
// Contraseña enviada desde el frontend
const plainPassword = "admin123";

const isMatch = bcrypt.compareSync(plainPassword, hashedPassword);
console.log("¿La contraseña coincide?:", isMatch);
