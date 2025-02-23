import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/LandingPage";
import Login from "./components/Login";
import Flights from "./components/Flights";
import AddFlight from "./components/AddFlight";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UpdateFlight from "./components/UpdateFlight";
import BookingForm from "./pages/BookingForm";
import MyBookings from "./components/MyBookings";
import TicketBooked from "./pages/TicketBooked";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("user"); // Fetch user role
    if (userRole === "admin") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirect Admin to Admin Dashboard */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/book-flight/:flightId" element={<BookingForm />} />
        <Route path="/my-bookings" element={<MyBookings />} />


        {/* Admin Only Routes */}
        {isAdmin ?(
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/addflight" element={<AddFlight />} />
            <Route path="/update-flight/:id" element={<UpdateFlight />} />
            <Route path="/tickets-booked/:id" element={<TicketBooked />} />
          </>
        ):(<></>)}

        {/* Redirect unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
