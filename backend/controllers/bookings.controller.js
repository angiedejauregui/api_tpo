const { 
  createBookingService,
  acceptBookingService,
  cancelBookingService,
  getOccupiedSlotsForClass
} = require('../services/bookings.service');
const Booking = require('../models/bookings.model');
const Service = require('../models/class.model');
const User = require('../models/user.model');
const notificationsService = require("../services/notifications.service");

const createBooking = async (req, res) => {
  try {
    const booking = await createBookingService(req.body, req.userId);

    // Notificación al entrenador que tiene una nueva solicitud
    await sendNotification(
      booking.trainerId,
      `Nueva solicitud de clase para ${booking.serviceId?.category ?? ""}`
    );
    
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

<<<<<<< HEAD
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
=======
const getBookingsByTrainer = async (req, res) => {
  try {
    const trainerId = req.query.trainerId;
    if (!trainerId) return res.status(400).json({ error: "TrainerId requerido" });

    const bookings = await Booking.find({ trainerId })
      .populate("clientId")
      .populate("serviceId")
      .sort({ createdAt: -1 });
      
    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error al obtener bookings del entrenador:", error);
>>>>>>> 4edaefacca629e4b849bc14972c921d126e10fcc
    return res.status(500).json({ error: error.message });
  }
};

<<<<<<< HEAD

=======
>>>>>>> 4edaefacca629e4b849bc14972c921d126e10fcc
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

const { sendNotification } = require("../services/notifications.service");
const { populate } = require('../models/notification.model');

const acceptBooking = async (req, res) => {
  try {
    const booking = await acceptBookingService(req.params.id);
    // Enviar notificación al cliente que la solicitud fue aceptada
    await sendNotification(
      booking.clientId,
      `Tu solicitud para la clase ${booking.serviceId?.category ?? ""} fue aceptada`
    );
    res.status(200).json({ booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await cancelBookingService(req.params.id);

    // Enviar notificación al cliente que la solicitud fue cancelada
    await sendNotification(
      booking.clientId,
      `Tu solicitud para la clase ${booking.serviceId?.category ?? ""} fue cancelada`
    );

    res.status(200).json({
      message: `Solicitud cancelada para ${booking.clientId?.name}`,
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClassOccupiedSlots = async (req, res) => {
  try {
    const { id } = req.params;
    const slots = await getOccupiedSlotsForClass(id);
    res.status(200).json(slots);
  } catch (error) {
    console.error("Error al obtener slots ocupados:", error);
    res.status(500).json({ error: "Error al obtener los horarios ocupados" });
  }
};

module.exports = {
  createBooking,
  getBookingsByClientId,
<<<<<<< HEAD
  getBookingsByTrainerId,
=======
  getBookingsByTrainer,
>>>>>>> 4edaefacca629e4b849bc14972c921d126e10fcc
  updateBooking,
  acceptBooking,
  cancelBooking,
  getClassOccupiedSlots
};