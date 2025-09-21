const express = require('express');
const { createBooking, listBookings, getBooking, cancelBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, listBookings);

router.route('/:id')
  .get(protect, getBooking)
  .delete(protect, cancelBooking);

module.exports = router;
