const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  airline: { type: String, required: true },
  departure: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  price: { type: Number, required: true },
  seatsAvailable: { type: Number, required: true } // New Field Added
}, { timestamps: true });

module.exports = mongoose.model("Flight", FlightSchema);
