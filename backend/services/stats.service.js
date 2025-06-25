const Booking = require("../models/bookings.model");
const Review = require("../models/reviews.model");
const Stats = require("../models/stats.model");

const getTrainerStats = async (trainerId) => {
  const bookings = await Booking.find({ trainerId });
  const reviews = await Review.find({ trainerId }).populate("clientId", "name").sort({ createdAt: -1 });

  const totalBookings = bookings.length;
  const completedBookings = bookings.filter(b => b.status === "Completada").length;
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews : 0;

  const ratingsDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach(r => {
    ratingsDistribution[r.rating] = (ratingsDistribution[r.rating] || 0) + 1;
  });

  const latestComments = reviews.slice(0, 10).map(r => ({
    clientName: r.clientId.name,
    rating: r.rating,
    comment: r.comment,
    date: r.createdAt,
  }));

  return {
    views: 0, 
    conversionRate: 0, 
    totalBookings,
    completedBookings,
    averageRating,
    totalReviews,
    ratingsDistribution,
    latestComments,
  };
};

async function updateTrainerStats({ trainerId, rating, comment, clientName }) {
  let stats = await Stats.findOne({ trainerId });
  /* Si no existe Stats entonces lo creo */
  if (!stats) {
    stats = new Stats({
      trainerId,
      views: 0,
      conversionRate: 0,
      totalBookings: 0,
      completedBookings: 0,
      averageRating: rating,
      totalReviews: 1,
      ratingsDistribution: new Map([
        ["1", 0],
        ["2", 0],
        ["3", 0],
        ["4", 0],
        ["5", 0],
        [String(rating), 1]
      ]),
      latestComments: [
        {
          clientName,
          rating,
          comment,
          date: new Date()
        },
      ],
    });

    await stats.save();
    return stats;
  }

  if (!stats.ratingsDistribution) {
    stats.ratingsDistribution = new Map();
  }
  
  const currentCount = stats.ratingsDistribution.get(String(rating)) || 0;
  stats.ratingsDistribution.set(String(rating), currentCount + 1);

  const totalReviews = stats.totalReviews + 1;
  const newAverageRating = ((stats.averageRating * stats.totalReviews) + rating) / totalReviews;

  const newComment = {
    clientName,
    rating,
    comment,
    date: new Date().toISOString().split("T")[0],
  };
  const updatedComments = [newComment, ...(stats.latestComments || [])].slice(0, 10);

  stats.ratingsDistribution = updatedDistribution;
  stats.averageRating = newAverageRating;
  stats.totalReviews = totalReviews;
  stats.latestComments = updatedComments;

  await stats.save();
}

async function incrementViewsService(trainerId) {
    const stats = await Stats.findOneAndUpdate(
      { trainerId },
      { $inc: { views: 1 } },
      { new: true, upsert: true }
    );
  
    // actualizamos tasa de conversión
    const conversionRate = stats.totalBookings > 0 ? (stats.totalBookings / stats.views) * 100 : 0;
    stats.conversionRate = conversionRate;
    await stats.save();
  }

module.exports = { getTrainerStats, updateTrainerStats, incrementViewsService };