import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/flights");
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>

      <div className="grid gap-6">
        {flights.map((flight) => (
          <div key={flight._id} className="p-4 border rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-bold">{flight.airline} - {flight.flightNumber}</h3>
            <p className="text-gray-600">From: {flight.departure} → To: {flight.destination}</p>
            <p className="text-gray-600">Departure: {new Date(flight.departureTime).toLocaleString()}</p>
            <p className="text-gray-600">Arrival: {new Date(flight.arrivalTime).toLocaleString()}</p>
            <p className="text-gray-600">Seats Available: {flight.seatsAvailable}</p>

            <div className="flex space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() => navigate(`/update-flight/${flight._id}`)}
              >
                Update Flight
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                onClick={() => navigate(`/tickets-booked/${flight._id}`)}
              >
                Tickets Booked
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={async () => {
                  try {
                    await axios.delete(`http://localhost:5000/api/flights/${flight._id}`);
                    setFlights(flights.filter((f) => f._id !== flight._id));
                  } catch (error) {
                    console.error("Error deleting flight:", error);
                  }
                }}
              >
                Delete Flight
              </button>
            </div>
          </div>
        ))}
      </div>

      {flights.length === 0 && <p className="text-center text-gray-500 mt-6">No flights available.</p>}
    </div>
  );
};

export default AdminDashboard;
