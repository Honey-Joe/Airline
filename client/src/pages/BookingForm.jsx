import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookingForm = () => {
  const flight = useParams();
  const flightId = flight.flightId
  const [passengers, setPassengers] = useState([
    { name: "", age: "", gender: "Male" },
  ]);
  const [classType, setClassType] = useState("Economy");
  const [availableSeats, setAvailableSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Fetch Available Seats
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/flights/seats/${flightId}`
        );
        setAvailableSeats(response.data.availableSeats.map(seat => seat.seatNumber));
      } catch (err) {
        console.error("Error fetching seats:", err);
      }
    };
    fetchSeats();
  }, [flightId]);

  // ✅ Handle Passenger Input Change
  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  // ✅ Add New Passenger
  const addPassenger = () => {
    if (passengers.length < availableSeats.length) {
      setPassengers([...passengers, { name: "", age: "", gender: "Male" }]);
    } else {
      setError("No more available seats.");
    }
  };

  // ✅ Remove Passenger
  const removePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passengers.some(p => !p.name || !p.age)) {
      setError("Please fill in all passenger details.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        { flightId, passengers, classType },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Booking successful!");
      setPassengers([{ name: "", age: "", gender: "Male" }]); // Reset form
    } catch (err) {
      console.error("Booking error:", err);
      setError(err.response?.data?.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">Book Your Flight</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {passengers.map((passenger, index) => (
          <div key={index} className="border p-3 rounded-md relative">
            <h3 className="font-semibold mb-2">Passenger {index + 1}</h3>
            <input
              type="text"
              placeholder="Name"
              value={passenger.name}
              onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
              className="w-full p-2 border rounded-md mb-2"
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={passenger.age}
              onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
              className="w-full p-2 border rounded-md mb-2"
              required
            />
            <select
              value={passenger.gender}
              onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
              className="w-full p-2 border rounded-md mb-2"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {index > 0 && (
              <button
                type="button"
                onClick={() => removePassenger(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addPassenger}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Add Passenger
        </button>

        <label className="block font-semibold mt-4">Class Type</label>
        <select
          value={classType}
          onChange={(e) => setClassType(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="First Class">First Class</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded-md ${
            loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
