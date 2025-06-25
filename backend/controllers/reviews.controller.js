import { createReviewService, getReviewsByTrainerId } from "../services/reviews.service.js";

export const createReview = async (req, res) => {
  try {
    const review = await createReviewService({
      trainerId: req.body.trainerId,
      bookingId: req.body.bookingId,
      rating: req.body.rating,
      comment: req.body.comment,
      clientId: req.userId,
    });

    res.status(201).json({
      id: review._id,
      rating: review.rating,
      comment: review.comment,
      trainerId: review.trainerId,
      clientId: review.clientId,
      bookingId: review.bookingId,
      createdAt: review.createdAt,
    });
  } catch (err) {
    if (err.message === "NOT_ALLOWED") {
      return res.status(403).json({ error: "Solo podés dejar una review si tomaste una clase con este entrenador" });
    }
    res.status(500).json({ error: "Error al crear la reseña" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await getReviewsByTrainerId(req.query.trainerId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener reseñas" });
  }
};

export const getReviewsByTrainer = async (req, res) => {
    try {
      const { trainerId } = req.params;
      const reviews = await getReviewsByTrainerId(trainerId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener reseñas por entrenador" });
    }
  };