require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const flightRoutes = require("./routes/flightRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/flights",flightRoutes);
app.use("/api/bookings", bookingRoutes);


app.listen(5000, () => console.log("Server running on port 5000"));
