const router = require('express').Router();
const {
  Mercadopago,
  createPlan,
  getPlans,
  pay,
} = require('../controllers/mercadopago.js');
const middlewareError = require('../middleware/middlewareError.js');

router.route('/').post(middlewareError(Mercadopago));
router
  .route('/plans')
  .get(middlewareError(getPlans))
  .post(middlewareError(createPlan));
router
  .route('/pagos/:id')
  .get(pay);

module.exports = router;
