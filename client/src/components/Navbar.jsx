import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("user");
    setUserRole(role);
  }, []);

  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="https://ik.imagekit.io/jjyo3gsee/4759005.jpg?updatedAt=1740308960803"
            alt="Airline Logo"
            className="h-12 w-12 mr-3 rounded-full"
          />
          <h1 className="text-2xl font-bold">Airline Management</h1>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navbar Links */}
        <div
          className={`md:flex md:items-center ${
            isOpen ? "block" : "hidden"
          } absolute md:static top-16 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent p-4 md:p-0`}
        >
          <Link to="/" className="block md:inline-block px-4 py-2 hover:bg-blue-500 rounded">
            Home
          </Link>

          {isAuthenticated ? (
            <>
              {userRole === "admin" ? (
                <>
                  <Link to="/admin-dashboard" className="block md:inline-block px-4 py-2 hover:bg-blue-500 rounded">
                    Admin Dashboard
                  </Link>
                  <Link to="/addflight" className="block md:inline-block px-4 py-2 hover:bg-blue-500 rounded">
                    Add Flight
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/flights" className="block md:inline-block px-4 py-2 hover:bg-blue-500 rounded">
                    Book Flight
                  </Link>
                  <Link to="/my-bookings" className="block md:inline-block px-4 py-2 hover:bg-blue-500 rounded">
                    My Bookings
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="block md:inline-block px-4 py-2 bg-red-500 hover:bg-red-700 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block md:inline-block px-4 py-2 hover:bg-blue-500 rounded">
                Login
              </Link>
              <Link to="/register" className="block md:inline-block px-4 py-2 hover:bg-blue-500 rounded">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
