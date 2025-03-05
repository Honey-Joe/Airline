const Booking = require("../models/Booking");
const Flight = require("../models/Flight");

// ✅ Fetch Available Seats for a Flight
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

// ✅ Book a Ticket with Seat Selection
exports.bookTicket = async (req, res) => {
  try {
    const { flightId, passengers, classType } = req.body;
    const userId = req.user.id;

    // Get Flight Details
    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ message: "Flight not found" });

    // Get available seats
    let availableSeats = flight.seats.filter(seat => !seat.isBooked).map(seat => seat.seatNumber);

    if (availableSeats.length < passengers.length) {
      return res.status(400).json({ message: "Not enough available seats" });
    }

    // Assign seats to passengers
    let assignedPassengers = passengers.map((p, index) => ({
      ...p,
      seat: availableSeats[index] // Assign first available seat
    }));

    // Mark seats as booked
    assignedPassengers.forEach(passenger => {
      const seatIndex = flight.seats.findIndex(seat => seat.seatNumber === passenger.seat);
      flight.seats[seatIndex].isBooked = true;
    });

    // Calculate total price (Business Class = 1.5x price)
    let totalPrice = flight.price * passengers.length;
    if (classType === "Business") totalPrice *= 1.5;

    // Create booking
    const newBooking = new Booking({
      user: userId,
      flight: flightId,
      passengers: assignedPassengers,
      totalPrice,
      classType,
      status: "confirmed",
    });

    await newBooking.save();
    await flight.save();

    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Error booking ticket", error });
  }
};

// ✅ Get All Bookings for Logged-in User
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("flight");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user bookings", error });
  }
};

// ✅ Get All Bookings (Admin Only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user flight");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all bookings", error });
  }
};

// ✅ Get All Bookings for a Specific Flight
exports.getFlightBookings = async (req, res) => {
  try {
    const { flightId } = req.params;
    const bookings = await Booking.find({ flight: flightId }).populate("user passengers");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flight bookings", error });
  }
};

// ✅ Cancel a Booking & Release Seats
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Find booking
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Find flight and restore seats
    const flight = await Flight.findById(booking.flight);
    if (flight) {
      booking.passengers.forEach(passenger => {
        const seatIndex = flight.seats.findIndex(seat => seat.seatNumber === passenger.seat);
        if (seatIndex !== -1) {
          flight.seats[seatIndex].isBooked = false; // Release seat
        }
      });
      await flight.save();
    }

    // Update booking status
    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling booking", error });
  }
};
