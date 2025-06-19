const express = require("express");
const { createBooking } = require("../controllers/bookings.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/", verifyToken, createBooking);

module.exports = router;