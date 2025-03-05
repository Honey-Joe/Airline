const express = require("express");
const router = express.Router();
const {
  addFlight,
  getFlights,
  getFlightById,
  updateFlight,
  deleteFlight,
  getAvailableSeats,
} = require("../controllers/flightController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

// ✅ Public Routes
router.get("/", getFlights);
router.get("/:id", getFlightById);
router.get("/seats/:flightId", getAvailableSeats);

// ✅ Admin Routes
router.post("/", authMiddleware, adminMiddleware, addFlight);
router.put("/:id", authMiddleware, adminMiddleware, updateFlight);
router.delete("/:id", authMiddleware, adminMiddleware, deleteFlight);

module.exports = router;
