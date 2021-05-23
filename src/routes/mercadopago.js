const router = require('express').Router();
const {
  Mercadopago,
  createPlan,
  getPlans,
  createOrder,
  pay,
} = require('../controllers/mercadopago.js');
const middlewareError = require('../middleware/middlewareError.js');

router.route('/').post(middlewareError(Mercadopago));
router
  .route('/plans')
  .get(middlewareError(getPlans))
  .post(middlewareError(createPlan));

router
  .route('/order')
  .get(middlewareError(getPlans))
  .post(middlewareError(createOrder));
router
  .route('/pagos/:id')
  .get(pay);

module.exports = router;
