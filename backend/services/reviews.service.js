const Review = require("../models/reviews.model");
const Booking = require("../models/bookings.model");

const createReviewService = async ( { trainerId, bookingId, clientId, rating, comment } ) => {

  const booking = await Booking.findById(bookingId);
  if (
    !booking ||
    booking.clientId.toString() !== clientId ||
    booking.trainerId.toString() !== trainerId ||
    booking.status !== "Confirmada"
  ) {
    throw new Error("NOT_ALLOWED");
  }

  const review = await Review.create({
    trainerId,
    bookingId,
    rating,
    comment,
    clientId,
  });

  return review;
};

const getReviewsByTrainerId = async (trainerId) => {
  const filter = trainerId ? { trainerId } : {};
  return await Review.find(filter)
    .populate("clientId", "name lastName")
    .sort({ createdAt: -1 });
};

module.exports = {
  createReviewService,
  getReviewsByTrainerId,
};