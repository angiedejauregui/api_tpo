const express = require("express");
<<<<<<< HEAD
const { createBooking, getBookingsByClientId, updateBooking, getBookingsByTrainerId } = require("../controllers/bookings.controller");
=======
const { 
    createBooking, 
    getBookingsByClientId, 
    getBookingsByTrainer,
    updateBooking, 
    acceptBooking, 
    cancelBooking,
    getClassOccupiedSlots
} = require("../controllers/bookings.controller");
>>>>>>> 4edaefacca629e4b849bc14972c921d126e10fcc
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/", verifyToken, createBooking);
router.get("/by-client", verifyToken, getBookingsByClientId);
<<<<<<< HEAD
router.get("/by-trainer", verifyToken, getBookingsByTrainerId);
=======
router.get("/by-trainer", verifyToken, getBookingsByTrainer);
>>>>>>> 4edaefacca629e4b849bc14972c921d126e10fcc
router.patch("/:id", verifyToken, updateBooking);
router.patch("/:id/accept", verifyToken, acceptBooking);
router.patch("/:id/cancel", verifyToken, cancelBooking);
router.get("/:id/occupied-slots", getClassOccupiedSlots);


module.exports = router;