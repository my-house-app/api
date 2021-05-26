const router = require('express').Router();
const {
  getAllMyBookings,
} = require('../controllers/booking.js');
const middlewareError = require('../middleware/middlewareError.js');

router.route('/:id')// id del usuario |id publicacion en construccion
  .get(middlewareError(getAllMyBookings));

module.exports = router;
