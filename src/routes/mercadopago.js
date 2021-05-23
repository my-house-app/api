const router = require('express').Router();
const {
  Mercadopago,
  createPlan,
  getPlans,
  createOrder,
  getOrder,
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
  .get(middlewareError(getOrder))
  .post(middlewareError(createOrder));
router
  .route('/order/:id')
  .get(middlewareError(getOrder));
router
  .route('/pagos/:id')
  .get(pay);

module.exports = router;
