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

module.exports = {
  createBookingService
};
