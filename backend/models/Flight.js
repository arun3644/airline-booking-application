// models/Flight.js
const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  airline: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  seats: { type: Number, default: 100 },
  price: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Flight', flightSchema);
