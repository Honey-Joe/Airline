const Booking = require("../models/Booking");
const Flight = require("../models/Flight");

// Book a Ticket
exports.bookTicket = async (req, res) => {
  try {
    const { flightId, passengers, classType } = req.body;
    const userId = req.user.id;

    // Get Flight Details
    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ message: "Flight not found" });

    // Calculate Total Price (Example: Business Class 1.5x, Economy 1x)
    let totalPrice = flight.price * passengers.length;
    if (classType === "Business") totalPrice *= 1.5;

    // Check Seat Availability
    if (flight.seatsAvailable < passengers.length) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    // Create Booking
    const newBooking = new Booking({
      user: userId,
      flight: flightId,
      passengers,
      totalPrice,
      classType,
      status: "confirmed",
    });

    await newBooking.save();

    // Update Available Seats in Flight
    flight.seatsAvailable -= passengers.length;
    await flight.save();

    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Error booking ticket", error });
  }
};

// Get Bookings for Logged-in User
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("flight");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

// Get All Bookings (Admin Only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user flight");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all bookings", error });
  }
};

// Get Bookings for a Specific Flight
exports.getFlightBookings = async (req, res) => {
  try {
    const { flightId } = req.params;
    const bookings = await Booking.find({ flight: flightId }).populate("user passengers");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flight bookings", error });
  }
};

// Cancel Booking (User)
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Find Booking
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Find Flight and Restore Seats
    const flight = await Flight.findById(booking.flight);
    if (flight) {
      flight.seatsAvailable += booking.passengers.length;
      await flight.save();
    }

    // Update Booking Status to "Cancelled"
    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling booking", error });
  }
};
