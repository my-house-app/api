const { v4: uuidv4 } = require('uuid');

const plans = [{
  id: uuidv4(),
  plan: 'Basic',
  description: 'increased visibility for 30 days',
  price: 29900,
  numberPhotos: 10,
}, {
  id: uuidv4(),
  plan: 'Premium',
  description: 'increased visibility for 90 days',
  price: 69900,
  numberPhotos: 20,
}];

module.exports = plans;
