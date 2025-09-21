const Flight = require('../models/Flight');

// Create flight (admin)
const createFlight = async (req, res, next) => {
  try {
    const { flightNumber, airline, from, to, departureTime, arrivalTime, seats, price } = req.body;
    if (!flightNumber || !airline || !from || !to || !departureTime || !arrivalTime || !price) {
      res.status(400);
      throw new Error('Missing required fields');
    }
    const exists = await Flight.findOne({ flightNumber });
    if (exists) {
      res.status(400);
      throw new Error('Flight number already exists');
    }
    const flight = await Flight.create({
      flightNumber, airline, from, to, departureTime, arrivalTime, seats: seats || 100, price
    });
    res.status(201).json(flight);
  } catch (err) {
    next(err);
  }
};

// List flights (public)
const listFlights = async (req, res, next) => {
  try {
    // Add filtering by from/to/date/price if provided
    const { from, to, date } = req.query;
    const query = {};
    if (from) query.from = from;
    if (to) query.to = to;
    if (date) {
      const d = new Date(date);
      const start = new Date(d.setHours(0,0,0,0));
      const end = new Date(d.setHours(23,59,59,999));
      query.departureTime = { $gte: start, $lte: end };
    }
    const flights = await Flight.find(query).sort({ departureTime: 1 });
    res.json(flights);
  } catch (err) {
    next(err);
  }
};

// Get single flight
const getFlight = async (req, res, next) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) { res.status(404); throw new Error('Flight not found'); }
    res.json(flight);
  } catch (err) {
    next(err);
  }
};

// Update flight (admin)
const updateFlight = async (req, res, next) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!flight) { res.status(404); throw new Error('Flight not found'); }
    res.json(flight);
  } catch (err) {
    next(err);
  }
};

// Delete flight (admin)
const deleteFlight = async (req, res, next) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) { res.status(404); throw new Error('Flight not found'); }
    res.json({ message: 'Flight deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createFlight, listFlights, getFlight, updateFlight, deleteFlight };
