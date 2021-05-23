const mercadopago = require('mercadopago');
const { ServicePlans, Order } = require('../db.js');
const { v4: uuidv4 } = require('uuid');

const {
  PROD_ACCESS_TOKEN,
} = process.env;

function Mercadopago(req, res) {
  const idOrden = uuidv4();
  mercadopago.configure({
    access_token: PROD_ACCESS_TOKEN,
    theme: {
      elementsColor: '#da1c1c',
      headerColor: '#da1c1c',
    },
  });
  const preference = {
    items: [req.body],
    external_reference: `${idOrden}`,
    back_urls: {
      success: 'http://localhost:3000/mercadopago/pagos',
      failure: 'http://localhost:3000/mercadopago/pagos',
    },
    //auto_return: 'approved',
    payment_methods: {
      excluded_payment_methods: [
        {
          // id: 'master',
        },
      ],
      excluded_payment_types: [
        {
          id: 'ticket',
        },
        {
          id: 'bank_transfer',
        },
      ],
    },
    binary_mode: true,
  };
  mercadopago.preferences.create(preference)
    .then((r) => {
      global.id = r.body.id;
      res.json({ id: global.id, init_point: r.body.init_point });
    }).catch((error) => {
      console.log(error);
    });
}

async function createPlan(req, res) {
  const {
    plan, description, price, numberPhotos,
  } = req.body;
  const id = uuidv4();
  await ServicePlans.create({
    id,
    plan,
    description,
    price,
    numberPhotos,
  });
  res.json({ message: 'successfully created plan' });
}

async function getPlans(req, res) {
  const plans = await ServicePlans.findAll();
  res.json(plans);
}

async function createOrder(req, res) {
  const {
    userId, servicePlanId, status, paymentStatus, paymentId,
  } = req.body;
  const id = uuidv4();
  const order = await Order.create({
    id,
    status,
    paymentId,
    paymentStatus,
    userId,
    servicePlanId,
  });
  console.log('prueba______', order)
  // await order.setServicePlans(planId);
  // await order.setUser(userId);
  res.json({ message: 'successfully created order' });
}

function pay(req, res) {
  const mp = new mercadopago(PROD_ACCESS_TOKEN);
  const { id } = req.params
  // console.info("Buscando el id", id)
  mp.get('/v1/payments/search', { status: 'pending' })// {"external_reference":id})
    .then((resultado) => {
      // console.info('resultado', resultado)
      res.json({ resultado });
    })
    .catch((err) => {
      console.error('No se consulto:', err);
      res.json({
        error: err,
      });
    });
}

module.exports = {
  Mercadopago,
  createPlan,
  getPlans,
  createOrder,
  pay,
};
