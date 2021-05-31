const { Op } = require('sequelize');
const {
  Post,
} = require('../db.js');

async function updater(req, res) {
  const posts = await Post.update(
    { status: 'Expired' },
    {
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { status: 'Available' },
              { premium: false },
              {
                date: {
                  [Op.lte]: new Date(
                    new Date().setDate(new Date().getDate()),
                  ),
                },
              },
            ],
          },
          {
            [Op.and]: [
              { status: 'Available' },
              { premium: true },
              {
                date: {
                  [Op.lte]: new Date(
                    new Date().setDate(new Date().getDate()),
                  ),
                },
              },
            ],
          },
        ],
      },
    },
  );

  res.json(posts);
}

module.exports = {
  updater,
};
