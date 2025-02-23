const Flight = require("../models/Flight");

// 🔹 Add a Flight (Admin Only)
exports.addFlight = async (req, res) => {
  try {
    const { flightNumber, airline, departure, destination, departureTime, arrivalTime, price, seatsAvailable } = req.body;
    
    const newFlight = new Flight({ flightNumber, airline, departure, destination, departureTime, arrivalTime, price, seatsAvailable });
    await newFlight.save();
    
    res.status(201).json({ message: "Flight added successfully", flight: newFlight });
  } catch (error) {
    res.status(500).json({ message: "Error adding flight", error });
  }
};

// 🔹 Get All Flights (User & Admin)
exports.getFlights = async (req, res) => {
  const flights = await Flight.find();
  res.json(flights);
};

// 🔹 Get Flight by ID (User & Admin)
exports.getFlightById = async (req, res) => {
  const flight = await Flight.findById(req.params.id);
  if (!flight) return res.status(404).json({ message: "Flight not found" });
  res.json(flight);
};

// 🔹 Update Flight (Admin Only)
exports.updateFlight = async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFlight) return res.status(404).json({ message: "Flight not found" });

    res.json({ message: "Flight updated successfully", updatedFlight });
  } catch (error) {
    res.status(500).json({ message: "Error updating flight", error });
  }
};

// 🔹 Delete Flight (Admin Only)
exports.deleteFlight = async (req, res) => {
  await Flight.findByIdAndDelete(req.params.id);
  res.json({ message: "Flight deleted successfully" });
};
