const router = require('express').Router();
const paymentConfirmation = require('../controllers/mailer');
const middlewareError = require('../middleware/middlewareError.js');

router.route('/payment').post(middlewareError(paymentConfirmation));

module.exports = router;