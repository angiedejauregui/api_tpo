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
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
