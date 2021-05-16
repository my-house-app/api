const router = require('express').Router();
const {
  getUsers,
  getBookings,
} = require('../controllers/users.js');
const middlewareError = require('../middleware/middlewareError.js');

router
  .route('/')
  .get(middlewareError(getUsers));
router
  .route('/bookings')
  .get(middlewareError(getBookings));
module.exports = router;
