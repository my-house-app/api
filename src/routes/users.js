const router = require('express').Router();
const {
  getUsers,
} = require('../controllers/users.js');
const middlewareError = require('../middleware/middlewareError.js');

router
  .route('/')
  .get(middlewareError(getUsers));

module.exports = router;
