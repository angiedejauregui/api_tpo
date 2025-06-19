const Booking = require('../models/bookings.model');
const Service = require('../models/services.model'); // Asegurate que sea el correcto

const createBookingService = async (data, clientId) => {
  const { serviceId, selectedSlots, mensaje, paymentInfo } = data;

  // Buscar el servicio para obtener el trainerId
  const service = await Service.findById(serviceId);
  if (!service) {
    throw new Error("Servicio no encontrado");
  }

  const newBooking = new Booking({
    serviceId,
    trainerId: service.trainerId, // Este campo debe existir en el modelo del servicio
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
