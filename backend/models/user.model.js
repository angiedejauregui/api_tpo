const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  birthDate: { type: Date, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Cliente', 'Entrenador'],
    required: true
  },
  cvu: { type: String }, // requerido solo para entrenadores
  profileImage: {
    type: String,
    default: "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
