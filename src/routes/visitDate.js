const router = require('express').Router();
const {
  addBooking, deleteBooking,
} = require('../controllers/booking.js');
const middlewareError = require('../middleware/middlewareError.js');

router.route('/').post(middlewareError(addBooking));
router.route('/:id')
  .delete(middlewareError(deleteBooking));

module.exports = router;
