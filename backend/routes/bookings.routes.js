const express = require("express");
const { createBooking, getBookingsById } = require("../controllers/bookings.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/", verifyToken, createBooking);
router.get("/my-bookings", verifyToken, getBookingsById);

module.exports = router;