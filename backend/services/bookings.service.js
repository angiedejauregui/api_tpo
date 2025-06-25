const Booking = require('../models/bookings.model');
const Service = require('../models/class.model'); 

const createBookingService = async (data, clientId) => {
  const { serviceId, selectedSlots, mensaje, paymentInfo } = data;

  const service = await Service.findById(serviceId);
  if (!service) {
    throw new Error("Servicio no encontrado");
  }

  const newBooking = new Booking({
    serviceId,
    trainerId: service.instructor,
    clientId,
    selectedSlots,
    message: mensaje,
    paymentInfo,
    status: "Pendiente"
  });

  await newBooking.save();
  return newBooking;
};

const acceptBookingService = async (bookingId) => {
  const updated = await Booking.findByIdAndUpdate(
    bookingId,
    { status: "Confirmada" },
    { new: true }
  ).populate("clientId serviceId");

  if (!updated) throw new Error("Reserva no encontrada");

  return updated;
};

const cancelBookingService = async (bookingId) => {
  const updated = await Booking.findByIdAndUpdate(
    bookingId,
    { status: "Cancelada" },
    { new: true }
  ).populate("clientId serviceId");

  if (!updated) throw new Error("Reserva no encontrada");

  return updated;
};

const getOccupiedSlotsForClass = async (classId) => {
  const bookings = await Booking.find({
    serviceId: classId,
    status: { $ne: "Cancelada" } 
  });

  const slotCount = {};

  bookings.forEach((booking) => {
    booking.selectedSlots.forEach((slotStr) => {
      slotCount[slotStr] = (slotCount[slotStr] || 0) + 1;
    });
  });

  return slotCount;
};

module.exports = {
  createBookingService,
  cancelBookingService,
  acceptBookingService,
  getOccupiedSlotsForClass
};
