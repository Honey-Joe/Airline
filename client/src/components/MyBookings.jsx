import { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("confirmed"); // Default tab

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">My Bookings</h2>

      {/* Tabs for Confirmed and Cancelled */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-2 rounded-md ${
            activeTab === "confirmed" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("confirmed")}
        >
          Confirmed Tickets
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-md ${
            activeTab === "cancelled" ? "bg-red-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("cancelled")}
        >
          Cancelled Tickets
        </button>
      </div>

      {/* Filtered Bookings Based on Active Tab */}
      <div className="grid gap-4">
        {bookings
          .filter((booking) => booking.status === activeTab)
          .map((booking) => (
            <div key={booking._id} className="p-4 border rounded-lg shadow-md bg-white">
              <h3 className="text-lg font-bold">{booking.flight?.airline} - {booking.flight?.flightNumber}</h3>
              <p className="text-gray-600">
                From: {booking.flight?.departure} → To: {booking.flight?.destination}
              </p>
              <p className="text-gray-600">Departure: {new Date(booking.flight?.departureTime).toLocaleString()}</p>
              <p className="text-gray-600">Arrival: {new Date(booking.flight?.arrivalTime).toLocaleString()}</p>
              <p className="text-gray-600">Class: {booking.classType}</p>
              <p className="text-gray-600 flex gap-3">Passengers: {booking.passengers.map((e)=>{
                return(
                    <>
                    <p>{e.name}</p>
                    </>
                )
              })}</p>
              <p className="font-bold text-green-600">Total Price: ${booking.totalPrice}</p>
              {activeTab === "confirmed" && (
                <button
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem("token");
                      await axios.delete(`http://localhost:5000/api/bookings/${booking._id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      setBookings(bookings.map((b) =>
                        b._id === booking._id ? { ...b, status: "cancelled" } : b
                      ));
                    } catch (error) {
                      console.error("Error cancelling booking:", error);
                    }
                  }}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
      </div>

      {/* Show message if no bookings available */}
      {bookings.filter((booking) => booking.status === activeTab).length === 0 && (
        <p className="text-center text-gray-500">No {activeTab} bookings available.</p>
      )}
    </div>
  );
};

export default MyBookings;
