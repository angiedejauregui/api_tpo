const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  selectedSlots: [{ type: String, required: true }],
  message: { type: String },
  status: { type: String, enum: ["Pendiente", "Confirmada", "Cancelada"], default: "Pendiente" },
  paymentInfo: {
    cardNumber: String,
    cardHolder: String,
    cvv: String,
    expirationDate: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);