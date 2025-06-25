const express = require("express");
const router = express.Router();
const { createReview, getAllReviews, getReviewsByTrainer } = require("../controllers/reviews.controller");

const verifyToken = require("../middlewares/verifyToken");

router.post("/", verifyToken, createReview);
router.get("/", getAllReviews);
router.get("/trainer/:trainerId", getReviewsByTrainer);

module.exports = router;