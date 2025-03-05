const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true, unique: true },
  isBooked: { type: Boolean, default: false },
});

const FlightSchema = new mongoose.Schema(
  {
    airline: { type: String, required: true },
    flightNumber: { type: String, required: true, unique: true },
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    price: { type: Number, required: true },
    seats: [SeatSchema], // ✅ Stores seat availability
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flight", FlightSchema);
