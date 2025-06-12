const { registerUser } = require('../services/users.service');
const User = require('../models/user.model');

const createUser = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        phone: user.phone,
        birthDate: user.birthDate,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Error al registrar:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,            
      { new: true }        
    );

    if (!updatedUser) return res.status(404).json({ error: "Usuario no encontrado" });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el perfil" });
  }
};

module.exports = { createUser, getUserById, updateUser, getUserProfile };