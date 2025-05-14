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
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createUser, getUserById };