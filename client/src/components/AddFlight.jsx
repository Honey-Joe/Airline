import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddFlight = () => {
  const [flightData, setFlightData] = useState({
    airline: "",
    flightNumber: "",
    departure: "",
    arrival: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    totalSeats: "",
  });

  const handleChange = (e) => {
    setFlightData({ ...flightData, [e.target.name]: e.target.value });
  };
  const generateSeats = (flightNumber, totalSeats) => {
    const seatsArray = [];
    for (let i = 1; i <= totalSeats; i++) {
      seatsArray.push({ seatNumber: `${flightNumber.toUpperCase()}-S${i}`, isBooked: false });
    }
    return seatsArray;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const seats = generateSeats(flightData.flightNumber, Number(flightData.totalSeats));

      const flightPayload = {
        ...flightData,
        totalSeats: Number(flightData.totalSeats),
        price: Number(flightData.price),
        seats, // ✅ Send generated seats
      };

      const res = await axios.post("http://localhost:5000/api/flights", flightPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message || "Flight added successfully!");
      setFlightData({
        airline: "",
        flightNumber: "",
        departure: "",
        arrival: "",
        departureTime: "",
        arrivalTime: "",
        price: "",
        totalSeats: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding flight");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Add Flight</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="airline" placeholder="Airline" value={flightData.airline} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="flightNumber" placeholder="Flight Number" value={flightData.flightNumber} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="departure" placeholder="Departure" value={flightData.departure} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="arrival" placeholder="Arrival" value={flightData.arrival} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="datetime-local" name="departureTime" value={flightData.departureTime} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="datetime-local" name="arrivalTime" value={flightData.arrivalTime} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="price" placeholder="Price" value={flightData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="totalSeats" placeholder="Total Seats" value={flightData.totalSeats} onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Add Flight</button>
      </form>
    </div>
  );
};

export default AddFlight;
