const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section with Full-Screen Background */}
      <section
        className="relative bg-cover bg-center h-screen flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/jjyo3gsee/place-flying-sunset-sky.jpg?updatedAt=1740308278031')",
        }}
      >
        {/* Black Light Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-white text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold">Fly Beyond Limits</h1>
          <p className="mt-4 text-lg md:text-xl">
            Seamless Booking | Best Deals | Comfortable Journeys
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
            <a href="/flights">Book Now</a>
          </button>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md hover:scale-105 transition">
          <img
            src="Airline_2.jpg"
            alt="Destinations"
            className="rounded-lg mb-3"
          />
          <h3 className="text-xl font-bold">Explore Destinations</h3>
          <p className="text-gray-300">
            Travel to the most beautiful places with our premium airline
            services.
          </p>
        </div>
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md hover:scale-105 transition">
          <img
            src="Airline_3.jpg"
            alt="Best Deals"
            className="rounded-lg mb-3"
          />
          <h3 className="text-xl font-bold">Best Deals</h3>
          <p className="text-gray-300">
            Get the best discounts and offers on every booking you make!
          </p>
        </div>
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md hover:scale-105 transition">
          <img src="Airline_1.jpg" alt="Luxury" className="rounded-lg mb-3" />
          <h3 className="text-xl font-bold">Luxury & Comfort</h3>
          <p className="text-gray-300">
            Experience the best comfort while flying with us.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
