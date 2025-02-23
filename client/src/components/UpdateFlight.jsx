import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateFlight = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState({
    airline: "",
    flightNumber: "",
    departure: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    seatsAvailable: "",
  });

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/flights/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFlight(response.data);
      } catch (error) {
        console.error("Error fetching flight details:", error);
      }
    };

    fetchFlight();
  }, [id]);

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/flights/${id}`, flight, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Flight updated successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error updating flight:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Update Flight</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="airline" value={flight.airline} onChange={handleChange} className="input-field" placeholder="Airline Name" required />
          <input type="text" name="flightNumber" value={flight.flightNumber} onChange={handleChange} className="input-field" placeholder="Flight Number" required />
          <input type="text" name="departure" value={flight.departure} onChange={handleChange} className="input-field" placeholder="Departure" required />
          <input type="text" name="destination" value={flight.destination} onChange={handleChange} className="input-field" placeholder="Destination" required />
          <input type="datetime-local" name="departureTime" value={flight.departureTime} onChange={handleChange} className="input-field" required />
          <input type="datetime-local" name="arrivalTime" value={flight.arrivalTime} onChange={handleChange} className="input-field" required />
          <input type="number" name="price" value={flight.price} onChange={handleChange} className="input-field" placeholder="Price" required />
          <input type="number" name="seatsAvailable" value={flight.seatsAvailable} onChange={handleChange} className="input-field" placeholder="Seats Available" required />
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Update Flight</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFlight;
