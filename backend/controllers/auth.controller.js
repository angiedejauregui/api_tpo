const User = require("../models/user.model");
const { login, forgotPassword, verifyCode, resetpassword, resetPassword } = require("../services/auth.service");
const generateToken = require("../utils/generateToken");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await login(email, password);
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        phone: user.phone,
        birthDate: user.birthDate,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};


const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await forgotPassword(email);
    res.status(200).json({
      email: user.email,
      message: "Se envió un enlace de recuperación a tu correo.",
    })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const verifyCodeController = async (req, res) => {
  console.log("BODY RECIBIDO:", req.body);                                                                                 
  const { email, code } = req.body;       

  try {
    const user = await verifyCode(email, code);
    res.status(200).json({
      email: user.email,
      message: "Código correcto. Podés continuar con el cambio de contraseña.",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const resetPasswordController = async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body;

    try {
        const user = await resetPassword(email, newPassword, confirmPassword);
        res.status(200).json({
            email: user.email,
            message: "Tu contraseña fue actualizada correctamente.",
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { loginController, forgotPasswordController, verifyCodeController, resetPasswordController };
