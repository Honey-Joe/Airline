import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/flights", 
          {
            headers:{
              Authorization: "Bearer "+token
            }
          }
        );
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const handleBookNow = (flightId) => {
    navigate(`/book-flight/${flightId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Available Flights</h1>

      {loading ? (
        <p className="text-center">Loading flights...</p>
      ) : flights.length === 0 ? (
        <p className="text-center">No flights available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flights.map((flight) => (
            <div key={flight._id} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-blue-600">{flight.airline}</h2>
              <p className="text-gray-700"><strong>Flight Number:</strong> {flight.flightNumber}</p>
              <p className="text-gray-700"><strong>From:</strong> {flight.departure} → <strong>To:</strong> {flight.destination}</p>
              <p className="text-gray-700"><strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
              <p className="text-gray-700"><strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
              <p className="text-gray-700"><strong>Price:</strong> ${flight.price}</p>
              <p className="text-gray-700"><strong>Seats Available:</strong> {flight.seatsAvailable}</p>

              <button 
                className={`mt-4 w-full py-2 rounded-lg text-white ${flight.seatsAvailable > 0 ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}
                disabled={flight.seatsAvailable === 0}
                onClick={() => handleBookNow(flight._id)}
              >
                {flight.seatsAvailable > 0 ? "Book Now" : "Sold Out"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Flights;
