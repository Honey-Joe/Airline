import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TicketBooked = () => {
  const { id } = useParams(); // Flight ID from URL
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bookings/flight/${id}`,{
            headers:{
                Authorization: "Bearer "+token
            }
        });
        setBookings(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Tickets Booked</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No tickets booked for this flight.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="p-4 border rounded-lg shadow-md bg-white">
              <h3 className="text-lg font-bold">Booking ID: {booking._id}</h3>
              <p className="text-gray-600">User: {booking.user.name} (Email: {booking.user.email})</p>
              <p className="text-gray-600">Total Price: ${booking.totalPrice}</p>
              <p className="text-gray-600">Class: {booking.classType}</p>
              <p className={`font-bold ${booking.status === "confirmed" ? "text-green-600" : "text-red-600"}`}>
                Status: {booking.status}
              </p>

              <h4 className="font-bold mt-2">Passengers:</h4>
              <ul className="list-disc ml-6">
                {booking.passengers.map((passenger, index) => (
                  <li key={index}>
                    {passenger.name}, {passenger.age} years old ({passenger.gender})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketBooked;
