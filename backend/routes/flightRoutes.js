const express = require('express');
const {
  createFlight, listFlights, getFlight, updateFlight, deleteFlight
} = require('../controllers/flightController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

const router = express.Router();

router.route('/')
  .get(listFlights)         // public
  .post(protect, permit('admin'), createFlight); // admin create

router.route('/:id')
  .get(getFlight)
  .put(protect, permit('admin'), updateFlight)
  .delete(protect, permit('admin'), deleteFlight);

module.exports = router;
