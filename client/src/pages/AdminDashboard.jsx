import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateFlight from "../components/UpdateFlight";

const AdminDashboard = () => {
  const [flights, setFlights] = useState([]);
  const [editingFlight, setEditingFlight] = useState(null);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/flights");
      setFlights(response.data);
    } catch (error) {
      toast.error("Error fetching flights");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/flights/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Flight deleted successfully!");
      fetchFlights();
    } catch (error) {
      toast.error("Error deleting flight");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Manage Flights</h2>
      {flights.length === 0 ? (
        <p>No flights available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Flight</th>
              <th className="border p-2">From</th>
              <th className="border p-2">To</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight._id} className="text-center">
                <td className="border p-2">{flight.airline} ({flight.flightNumber})</td>
                <td className="border p-2">{flight.departure}</td>
                <td className="border p-2">{flight.arrival}</td>
                <td className="border p-2">
                  <button
                    onClick={() => setEditingFlight(flight)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(flight._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingFlight && (
        <UpdateFlight flightId={editingFlight._id} onClose={() => setEditingFlight(null)} />
      )}
    </div>
  );
};

export default AdminDashboard;
