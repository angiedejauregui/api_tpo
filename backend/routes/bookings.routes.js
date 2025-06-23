const express = require("express");
const { createBooking, getBookingsByClientId, updateBooking } = require("../controllers/bookings.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/", verifyToken, createBooking);
router.get("/by-client", verifyToken, getBookingsByClientId);
router.patch("/:id", verifyToken, updateBooking);

module.exports = router;