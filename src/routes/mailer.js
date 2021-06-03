const router = require('express').Router();
const { paymentConfirmation, sendBooking } = require('../controllers/mailer');
const middlewareError = require('../middleware/middlewareError.js');

router.route('/payment').post(middlewareError(paymentConfirmation));
router.route('/booking').post(middlewareError(sendBooking));
// eliminar un usuarios y notificarlo
module.exports = router;
