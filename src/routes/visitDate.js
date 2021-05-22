const router = require('express').Router();
const {
  addBooking, getBooking, deleteBooking, updateBooking,
} = require('../controllers/booking.js');
const middlewareError = require('../middleware/middlewareError.js');

router.route('/').post(middlewareError(addBooking));
router.route('/:id')
  .get(middlewareError(getBooking))
  .put(middlewareError(updateBooking))
  .delete(middlewareError(deleteBooking));

module.exports = router;
