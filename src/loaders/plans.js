const { v4: uuidv4 } = require('uuid');

const plans = [{
  id: uuidv4(),
  plan: 'Basic',
  description: 'Visibilidad por 30 dias',
  price: 29900,
  numberPhotos: 10,
}, {
  id: uuidv4(),
  plan: 'Premium',
  description: 'Visibilidad por 90 dias',
  price: 69900,
  numberPhotos: 20,
}];

module.exports = plans;
