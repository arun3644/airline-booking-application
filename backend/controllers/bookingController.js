const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const sendMail = require('../utils/sendEmail');

// Create booking (authenticated users)
const createBooking = async (req, res, next) => {
  try {
    const user = req.user;
    const { flightId, passengers } = req.body;
    if (!flightId || !passengers || !Array.isArray(passengers) || passengers.length === 0) {
      res.status(400);
      throw new Error('flightId and passengers are required');
    }

    const flight = await Flight.findById(flightId);
    if (!flight) { res.status(404); throw new Error('Flight not found'); }

    // Calculate total price (simple: price * passenger count)
    const totalPrice = flight.price * passengers.length;

    // Create booking
    const booking = await Booking.create({
      user: user._id,
      flight: flight._id,
      passengers,
      totalPrice,
      status: 'CONFIRMED'
    });

    // Optionally reduce seats (one simple approach)
    if (flight.seats >= passengers.length) {
      flight.seats -= passengers.length;
      await flight.save();
    } else {
      // not enough seats
      res.status(400);
      throw new Error('Not enough seats available');
    }

    // Send email confirmation (non-blocking)
    try {
      const subject = `Booking Confirmation - ${flight.flightNumber}`;
      const text = `Hello ${user.name}, your booking is confirmed. Booking ID: ${booking._id}. Total: ${totalPrice}`;
      await sendMail({ to: user.email, subject, text });
    } catch (mailErr) {
      console.warn('Email sending failed:', mailErr.message);
      // Do not fail booking if email fails
    }

    const populated = await Booking.findById(booking._id).populate('flight').populate('user', '-password');
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

// List bookings for logged-in user, or all bookings for admin
const listBookings = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      const bookings = await Booking.find().populate('flight').populate('user', '-password');
      return res.json(bookings);
    }
    const bookings = await Booking.find({ user: req.user._id }).populate('flight');
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

// Get single booking (owner or admin)
const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('flight').populate('user', '-password');
    if (!booking) { res.status(404); throw new Error('Booking not found'); }
    if (req.user.role !== 'admin' && booking.user._id.toString() !== req.user._id.toString()) {
      res.status(403); throw new Error('Forbidden');
    }
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

// Cancel booking (owner or admin)
const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('flight');
    if (!booking) { res.status(404); throw new Error('Booking not found'); }
    if (req.user.role !== 'admin' && booking.user.toString() !== req.user._id.toString()) {
      res.status(403); throw new Error('Forbidden');
    }
    booking.status = 'CANCELLED';
    await booking.save();

    // restore seats
    const flight = await Flight.findById(booking.flight._id);
    flight.seats += booking.passengers.length;
    await flight.save();

    res.json({ message: 'Booking cancelled', booking });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBooking, listBookings, getBooking, cancelBooking };
