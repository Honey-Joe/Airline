const express = require("express");
const { addFlight, getFlights, getFlightById, updateFlight, deleteFlight } = require("../controllers/flightController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, addFlight);
router.get("/", getFlights);
router.get("/:id", authMiddleware, getFlightById);
router.put("/:id", authMiddleware, adminMiddleware, updateFlight);
router.delete("/:id", authMiddleware, adminMiddleware, deleteFlight);

module.exports = router;
