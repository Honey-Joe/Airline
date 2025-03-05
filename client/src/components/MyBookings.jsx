import { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("confirmed"); // Default tab
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update state efficiently without refetching all bookings
      setBookings((prevBookings) =>
        prevBookings.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b
        )
      );
    } catch (error) {
      console.error("Error cancelling booking:", error);
      setError("Could not cancel the booking. Please try again.");
    }
  };

  const filteredBookings = bookings.filter((booking) => booking.status === activeTab);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">My Bookings</h2>

      {/* Tabs for Confirmed and Cancelled */}
      <div className="flex justify-center mb-6">
        {["confirmed", "cancelled"].map((tab) => (
          <button
            key={tab}
            className={`px-5 py-2 mx-2 rounded-md transition-all ${
              activeTab === tab
                ? tab === "confirmed"
                  ? "bg-blue-600 text-white"
                  : "bg-red-600 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Tickets
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-600"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredBookings.length === 0 ? (
        <p className="text-center text-gray-500">No {activeTab} bookings available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredBookings.map((booking) => (
            <div key={booking._id} className="p-5 border rounded-lg shadow-md bg-white">
              <h3 className="text-lg font-bold text-blue-600">
                {booking.flight?.airline} - {booking.flight?.flightNumber}
              </h3>
              <p className="text-gray-600"><strong>From:</strong> {booking.flight?.departure} → <strong>To:</strong> {booking.flight?.arrival}</p>
              <p className="text-gray-600"><strong>Departure:</strong> {new Date(booking.flight?.departureTime).toLocaleString()}</p>
              <p className="text-gray-600"><strong>Arrival:</strong> {new Date(booking.flight?.arrivalTime).toLocaleString()}</p>
              <p className="text-gray-600"><strong>Class:</strong> {booking.classType}</p>

              {/* Passenger List */}
              <div className="text-gray-600">
                <strong>Passengers:</strong>
                <ul className="list-disc ml-5">
                  {booking.passengers.map((passenger, index) => (
                    <li key={index}>{passenger.name} - <span className="font-semibold">Seat: {passenger.seat}</span></li>
                  ))}
                </ul>
              </div>

              <p className="font-bold text-green-600">Total Price: ${booking.totalPrice}</p>

              {/* Cancel Booking Button */}
              {activeTab === "confirmed" && (
                <button
                  className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 w-full"
                  onClick={() => handleCancelBooking(booking._id)}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
