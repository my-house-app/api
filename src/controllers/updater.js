const { Op } = require('sequelize');
const {
  Order,
} = require('../db.js');

async function updater(req, res) {
  const orders = await Order.update(
    { status: 'expired' },
    {
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { status: 'active' },
              { servicePlanId: 1 },
              {
                date: {
                  [Op.lte]: new Date(
                    new Date().setDate(new Date().getDate() - 30),
                  ),
                },
              },
            ],
          },
          {
            [Op.and]: [
              { status: 'active' },
              { servicePlanId: 2 },
              {
                date: {
                  [Op.lte]: new Date(
                    new Date().setDate(new Date().getDate() - 90),
                  ),
                },
              },
            ],
          },
        ],
      },
    },
  );

  res.json(orders);
}

module.exports = {
  updater,
};
