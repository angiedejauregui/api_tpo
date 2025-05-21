const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateRecoveryCode = require("../utils/generateRecoveryCode");
const sendRecoveryEmail = require("../utils/sendRecoveryEmail");

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


const forgotPassword = async (email) => {
  if (!email) {
    throw new Error("El email es obligatorio");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const code = generateRecoveryCode();
  user.resetPasswordToken = code;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  await sendRecoveryEmail(email, code);

  return user;
};


const verifyCode = async (email, code) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  if (
    user.resetPasswordToken !== code ||
    !user.resetPasswordExpires ||
    user.resetPasswordExpires < Date.now()
  ) {
    throw new Error("Código de recuperación incorrecto o expirado");
  }

  return user;
};


const resetPassword = async (email, newPassword, confirmPassword) => {
  if (!newPassword || !confirmPassword) {
    throw new Error("Todos los campos son obligatorios");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("Las contraseñas no coinciden");
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    throw new Error(
      "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número"
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  user.recoveryCode = undefined;
  user.recoveryCodeExpiration = undefined;
  await user.save();

  return user;
};


module.exports = { login, forgotPassword, verifyCode, resetPassword };
