const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  passengers: {
    type: [{ name: String, age: Number, seatClass: { type: String, default: 'Economy' } }],
    required: true
  },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['CONFIRMED','CANCELLED','PENDING'], default: 'CONFIRMED' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
