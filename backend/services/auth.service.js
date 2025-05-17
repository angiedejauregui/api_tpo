const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Todos los campos son obligatorios");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Contraseña incorrecta");
  }
  
  return user;
};

module.exports = { login };
