const { verificarCredenciales } = require("../Models/consultas");

const checkCredenciales = async (req, res, next) => {
  const { email, password } = req.body;

  // Verificamos que ambos campos estén presentes
  if (!email || !password) {
    console.error("Error: Falta email o password");
    return res
      .status(400)
      .json({ message: "Debe proporcionar email y password" });
  }

  console.log("Datos recibidos en checkCredenciales:", { email, password });

  try {
    // Verificamos las credenciales con la base de datos
    const user = await verificarCredenciales({ email, password });
    console.log("Usuario verificado en checkCredenciales:", user);

    // Pasamos el usuario al siguiente middleware
    req.user = user;
    next();
  } catch (error) {
    console.error(
      "Error al verificar credenciales en checkCredenciales:",
      error
    );
    res.status(error.code || 500).json({ message: error.message });
  }
};

module.exports = { checkCredenciales };
