const mercadopago = require('mercadopago');
const { v4: uuidv4 } = require('uuid');

const {
  PROD_ACCESS_TOKEN,
} = process.env;

function Mercadopago(req, res) {
  const idOrden = uuidv4();
  mercadopago.configure({
    access_token: PROD_ACCESS_TOKEN,
  });
  const preference = {
    items: [req.body],
    external_reference: `${idOrden}`,
    back_urls: {
      success: 'http://localhost:3001/mercadopago/pagos',
      failure: 'http://localhost:3001/mercadopago/pagos',
      pending: 'http://localhost:3001/mercadopago/pagos',
    },
  };
  mercadopago.preferences.create(preference)
    .then((r) => {
      console.log(r);
      global.id = r.body.id;
      res.json({ id: global.id, init_point: r.body.init_point });
    }).catch((error) => {
      console.log(error);
    });
}

function pay(req, res) {
  const mp = new mercadopago(PROD_ACCESS_TOKEN);
  const {id} = req.params
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
  pay,
};