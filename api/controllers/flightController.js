const Flight = require("../models/Flight");

// ✅ Add a New Flight
exports.addFlight = async (req, res) => {
  try {
    const { airline, flightNumber, departure, arrival, departureTime, arrivalTime, price, totalSeats } = req.body;

    // Generate seat numbers dynamically
    const seats = Array.from({ length: totalSeats }, (_, i) => ({
      seatNumber: `S${i + 1}`, // Seat format: S1, S2, S3...
      isBooked: false,
    }));

    const newFlight = new Flight({
      airline,
      flightNumber,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      price,
      seats,
    });

    await newFlight.save();
    res.status(201).json({ message: "Flight added successfully", flight: newFlight });
  } catch (error) {
    res.status(500).json({ message: "Error adding flight", error });
  }
};

// ✅ Get All Flights
exports.getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flights", error });
  }
};

// ✅ Get a Single Flight by ID
exports.getFlightById = async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await Flight.findById(id);
    if (!flight) return res.status(404).json({ message: "Flight not found" });

    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flight details", error });
  }
};

// ✅ Update Flight Details
exports.updateFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFlight = await Flight.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedFlight) return res.status(404).json({ message: "Flight not found" });

    res.status(200).json({ message: "Flight updated successfully", flight: updatedFlight });
  } catch (error) {
    res.status(500).json({ message: "Error updating flight", error });
  }
};

// ✅ Delete a Flight
exports.deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFlight = await Flight.findByIdAndDelete(id);

    if (!deletedFlight) return res.status(404).json({ message: "Flight not found" });

    res.status(200).json({ message: "Flight deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting flight", error });
  }
};

// ✅ Get Available Seats for a Flight
exports.getAvailableSeats = async (req, res) => {
  try {
    const { flightId } = req.params;
    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ message: "Flight not found" });

    const availableSeats = flight.seats.filter(seat => !seat.isBooked);
    res.status(200).json({ availableSeats });
  } catch (error) {
    res.status(500).json({ message: "Error fetching available seats", error });
  }
};
