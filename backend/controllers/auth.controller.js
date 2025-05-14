const User = require('../models/user.model');
const { login } = require('../services/auth.service');
const generateToken = require('../utils/generateToken');

const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await login(email, password);
        const token = generateToken(user._id);

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: {
                id: user._id,
                name: user.name,
                lastName: user.lastName,
                phone: user.phone,
                birthDate: user.birthDate,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

module.exports = { loginController };