const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const registerUser = async ( {name, lastName, phone, birthDate, email, password, confirmPassword, role, cvu} ) => {

  if (!name || !lastName || !phone || !birthDate || !email || !password || !confirmPassword || !role) {
    throw new Error('Todos los campos son obligatorios');   
  }

  if (role === 'Entrenador' && !cvu) {
    throw new Error('El CVU es obligatorio para entrenadores');
  }
    
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número');
  }

  if (password !== confirmPassword) {
    throw new Error('Las contraseñas no coinciden');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('El email ya está registrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        lastName,
        phone,
        birthDate,
        email,
        password: hashedPassword,
        role,
        ...(role === 'Entrenador' && { cvu })
    });
    await newUser.save();
    return newUser;
}

module.exports = { registerUser };