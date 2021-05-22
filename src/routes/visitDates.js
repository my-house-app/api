const router = require('express').Router();
const {
  getAllMyBookings,
} = require('../controllers/user.js');
const middlewareError = require('../middleware/middlewareError.js');

router.route('/:id')// id publicacion en construccion
  .get(middlewareError(getAllMyBookings));

module.exports = router;
