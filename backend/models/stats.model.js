const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema({
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  views: { type: Number, default: 0 },
  conversionRate: { type: Number, default: 0 },
  totalBookings: { type: Number, default: 0 },
  completedBookings: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  ratingsDistribution: {
    type: Map,
    of: Number,
    default: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
  },
  latestComments: [
    {
      clientName: String,
      rating: Number,
      comment: String,
      date: Date,
    },
  ],
});

module.exports = mongoose.model("Stats", statsSchema);