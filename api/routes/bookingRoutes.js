const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const {
  bookTicket,
  getUserBookings,
  getAllBookings,
  getFlightBookings,
  cancelBooking,
} = require("../controllers/bookingController");

const router = express.Router();

// Book a ticket (User)
router.post("/", authMiddleware, bookTicket);

// Get bookings for logged-in user
router.get("/", authMiddleware, getUserBookings);

// Get all bookings (Admin only)
router.get("/all", authMiddleware, adminMiddleware, getAllBookings);

// Get bookings for a specific flight
router.get("/flight/:flightId", authMiddleware, getFlightBookings);

// Cancel a booking (User)
router.delete("/:id", authMiddleware, cancelBooking);

module.exports = router;
