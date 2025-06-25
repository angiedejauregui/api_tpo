const Review = require("../models/reviews.model");
const Booking = require("../models/bookings.model");
const Stat = require("../models/stats.model");
const User = require("../models/user.model");
const { updateTrainerStats } = require("../services/stats.service");

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
  console.log("create review service", clientId);
  const client = await User.findById(clientId);

  await updateTrainerStats({
    trainerId,
    rating,
    comment,
    clientName: client ? client.name : "Usuario no definido",
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