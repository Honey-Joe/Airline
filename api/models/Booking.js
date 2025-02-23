const mongoose = require("mongoose");

const PassengerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
});

const BookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    flight: { type: mongoose.Schema.Types.ObjectId, ref: "Flight", required: true },
    passengers: [PassengerSchema],
    classType: {
      type: String,
      enum: ["Economy", "Business", "First Class"],
      required: true,
    },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
