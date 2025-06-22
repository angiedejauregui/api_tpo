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

/*const getBookingsById = async (req, res) => {
  try {
    const bookings = await Booking.find({ clientId: req.userId });
    /*if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No se encontraron reservas' });
    }*/
    /*console.log("bookings", bookings)*/
    /*const validBookings = [];

    for (const booking of bookings) {
      const serviceExists = await Service.exists({ _id: booking.serviceId });
      const trainerExists = await User.exists({ _id: booking.trainerId });

      if (serviceExists && trainerExists) {
        validBookings.push(booking);
      }
    }

    if (validBookings.length === 0) {
      return res.status(404).json({ message: 'Las reservas no tienen relaciones válidas' });
    }
    const populatedBookings = await Booking.find({ clientId: userId })
      .populate("serviceId", "category")
      .populate("trainerId", "name lastName");
    /*const populatedBookings = await Booking.find({
      _id: { $in: validBookings.map(b => b._id) }
    })
      .populate('serviceId', 'category')
      .populate('trainerId', 'name lastName');

    return res.status(200).json(populatedBookings);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener tus reservas' });
  }
};
*/

module.exports = { createBooking, getBookingsByClientId };
