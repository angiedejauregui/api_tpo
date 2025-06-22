const express = require("express");
const { createBooking, getBookingsByClientId } = require("../controllers/bookings.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/", verifyToken, createBooking);
router.get("/by-client", verifyToken, getBookingsByClientId);

module.exports = router;