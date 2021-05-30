const router = require('express').Router();
const {
  updater,
} = require('../controllers/updater.js');
const middlewareError = require('../middleware/middlewareError.js');

router.route('/').get(middlewareError(updater));

module.exports = router;
