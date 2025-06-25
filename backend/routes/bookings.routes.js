const express = require("express");
const { createBooking, getBookingsByClientId, updateBooking, getBookingsByTrainerId } = require("../controllers/bookings.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/", verifyToken, createBooking);
router.get("/by-client", verifyToken, getBookingsByClientId);
router.get("/by-trainer", verifyToken, getBookingsByTrainerId);
router.patch("/:id", verifyToken, updateBooking);

module.exports = router;