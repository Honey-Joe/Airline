import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFlight = () => {
  const navigate = useNavigate();
  const [flightData, setFlightData] = useState({
    flightNumber: "",
    airline: "",
    departure: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    seatsAvailable: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    setFlightData({ ...flightData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token"); // Get JWT token
      const response = await axios.post(
        "http://localhost:5000/api/flights",
        flightData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Flight added successfully!");
      setTimeout(() => navigate("/admin-dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Error adding flight");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-5">Add Flight</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="flightNumber"
          placeholder="Flight Number"
          value={flightData.flightNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="airline"
          placeholder="Airline Name"
          value={flightData.airline}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="departure"
          placeholder="Departure Location"
          value={flightData.departure}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="destination"
          placeholder="Destination Location"
          value={flightData.destination}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <label className="block">
          <span className="text-gray-700">Departure Time</span>
          <input
            type="datetime-local"
            name="departureTime"
            value={flightData.departureTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Arrival Time</span>
          <input
            type="datetime-local"
            name="arrivalTime"
            value={flightData.arrivalTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>

        <input
          type="number"
          name="price"
          placeholder="Ticket Price"
          value={flightData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="seatsAvailable"
          placeholder="Seats Available"
          value={flightData.seatsAvailable}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Flight
        </button>
      </form>
    </div>
  );
};

export default AddFlight;
