const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema(
  {
    airline: { type: String, required: true },
    flightNumber: { type: String, required: true, unique: true },
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    price: { type: Number, required: true },
    totalSeats: { type: Number, required: true },
    seats: [
      {
        seatNumber: { type: String  }, // Removed unique: true
        isBooked: { type: Boolean, default: false },
      }
    ], // ✅ Seats stored directly inside Flight schema
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flight", FlightSchema);
