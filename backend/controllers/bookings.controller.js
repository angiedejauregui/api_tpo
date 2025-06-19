const createBooking = async (req, res) => {
    try {
      const booking = await createBookingService(req.body, req.user.id);
  
      res.status(201).json({
        id: booking._id,
        serviceId: booking.serviceId,
        trainerId: booking.trainerId,
        clientId: booking.clientId,
        selectedSlots: booking.selectedSlots,
        message: booking.message,
        status: booking.status,
        createdAt: booking.createdAt
      });
    } catch (error) {
      console.error("Error al crear reserva:", error.message);
      res.status(400).json({ error: error.message });
    }
  };

module.exports = { createBooking };