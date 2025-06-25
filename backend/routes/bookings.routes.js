const express = require("express");

const { 
    createBooking, 
    getBookingsByClientId,
    getBookingsByTrainerId,
    updateBooking, 
    acceptBooking, 
    cancelBooking,
    getClassOccupiedSlots
} = require("../controllers/bookings.controller");

const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/", verifyToken, createBooking);
router.get("/by-client", verifyToken, getBookingsByClientId);
router.get("/by-trainer", verifyToken, getBookingsByTrainerId);
router.patch("/:id", verifyToken, updateBooking);
router.patch("/:id/accept", verifyToken, acceptBooking);
router.patch("/:id/cancel", verifyToken, cancelBooking);
router.get("/:id/occupied-slots", getClassOccupiedSlots);


module.exports = router;