import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingForm = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  
  const [passengers, setPassengers] = useState([{ name: "", age: "", gender: "" }]);
  const [classType, setClassType] = useState("Economy");
  const [error, setError] = useState("");

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { name: "", age: "", gender: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        { flightId, passengers, classType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking Successful!");
      navigate("/my-bookings");
    } catch (err) {
      setError("Booking failed, please try again.");
      console.log(err)
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Book Your Flight</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {passengers.map((passenger, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Passenger Name"
              value={passenger.name}
              onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={passenger.age}
              onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <select
              value={passenger.gender}
              onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        ))}

        <button type="button" onClick={addPassenger} className="bg-green-500 text-white px-4 py-2 rounded">
          + Add Passenger
        </button>

        <div className="mt-4">
          <label className="block text-gray-700 font-bold">Select Class Type:</label>
          <select
            value={classType}
            onChange={(e) => setClassType(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          >
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
