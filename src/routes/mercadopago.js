const router = require('express').Router();
const {
  Mercadopago,
  pay,
} = require('../controllers/mercadopago.js');
const middlewareError = require('../middleware/middlewareError.js');

router.route('/').post(middlewareError(Mercadopago));
router
  .route('/pagos/:id')
  .get(pay);

module.exports = router;
