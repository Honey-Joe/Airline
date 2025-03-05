import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateFlight = ({ flightId, onClose }) => {
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

  useEffect(() => {
    fetchFlightDetails();
  }, []);

  const fetchFlightDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/flights/${flightId}`);
      setFlightData(response.data);
    } catch (error) {
      toast.error("Error fetching flight details");
    }
  };

  const handleChange = (e) => {
    setFlightData({ ...flightData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/flights/${flightId}`, flightData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Flight updated successfully!");
      onClose(); // Close modal or refresh list
    } catch (error) {
      toast.error("Error updating flight");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Update Flight</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input type="text" name="airline" value={flightData.airline} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="flightNumber" value={flightData.flightNumber} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="departure" value={flightData.departure} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="arrival" value={flightData.arrival} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="datetime-local" name="departureTime" value={flightData.departureTime} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="datetime-local" name="arrivalTime" value={flightData.arrivalTime} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" name="price" value={flightData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" name="totalSeats" value={flightData.totalSeats} onChange={handleChange} className="w-full p-2 border rounded" required />
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update</button>
            <button type="button" className="bg-red-500 text-white py-2 px-4 rounded" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFlight;
