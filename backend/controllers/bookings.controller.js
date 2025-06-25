const { createBookingService } = require('../services/bookings.service');
const Booking = require('../models/bookings.model');
const Service = require('../models/class.model');
const User = require('../models/user.model');

const createBooking = async (req, res) => {
  try {
    const booking = await createBookingService(req.body, req.userId);

    res.status(201).json({
      message: 'Reserva creada correctamente',
      booking: {
        id: booking._id,
        serviceId: booking.serviceId,
        trainerId: booking.trainerId,
        clientId: booking.clientId,
        selectedSlots: booking.selectedSlots,
        message: booking.message,
        status: booking.status,
        createdAt: booking.createdAt
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBookingsByClientId = async (req, res) => {
  try {
    /*const { client } = req.query;*/
    const userId = req.userId;
    console.log("🔍 getBookingsById userId:", userId);
    const populatedBookings = await Booking.find({ clientId: userId })
    /*const populatedBookings = await Booking.find({ clientId: userId })*/
      .populate("serviceId")
      .populate("trainerId");

    return res.status(200).json(populatedBookings);
  } catch (error) {
    console.error("getBookingsById ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getBookingsByTrainerId = async (req, res) => {
  try {
    const trainerId = req.userId; // o req.user._id si usás req.user
    console.log("🔍 getBookingsByTrainer trainerId:", trainerId);

    const bookings = await Booking.find({ trainerId })
      .populate("clientId", "name lastName email profileImage")
      .populate("serviceId");

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("getBookingsByTrainer ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
};


const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }
    
    res.json({
      id:          updated._id,
      serviceId:   updated.serviceId,
      trainerId:   updated.trainerId,
      clientId:    updated.clientId,
      selectedSlots: updated.selectedSlots,
      message:     updated.message,
      status:      updated.status,
      createdAt:   updated.createdAt
    });
    
  } catch (error) {
    console.error("Error al actualizar reserva:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getBookingsByClientId,
  getBookingsByTrainerId,
  updateBooking,
};
