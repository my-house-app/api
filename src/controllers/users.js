/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable key-spacing */
/* eslint-disable no-multi-spaces */
const { User, VisitDate, Post } = require('../db.js');
// const { v4: uuidv4 } = require('uuid');
const { buidlWhereUser, getCurrentPage } = require('../utils.js');

async function getUsers(req, res) {
  const limit =  Number(req.query.limit)  || 10;
  const page = Number(req.query.page)     || 1;// falta una validacion
  const offset = (page * limit) - limit;
  const atributo = req.query.atributo   || null;
  const orden =    req.query.orden      || null;
  const block = {
    email:         req.query.email         || null,
    name:         req.query.name         || null,
    password:      req.query.password      || null,
    phone:         Number(req.query.phone)         || null,
    photo:         req.query.photo         || null,
    city:          req.query.city          || null,
    street_number: req.query.street_number || null,
    zip_code:      req.query.zip_code      || null,
    type:          req.query.type          || null,
    status:        req.query.status        || null,
  }; // futuros filtros
  console.log('offset: ', offset);
  const queryUser = {
    limit,
    offset,
    where: buidlWhereUser(block),
    // include: { all: true, nested: true },
    // include: [{},{}]
    // include: {
    //   model: Post,
    //   include: {
    //     model: VisitDates,
    //   },
    // },
    attributes: {
      exclude:['createdAt', 'updatedAt'],
    },
    // duplicating: false,
  };

  if (atributo && orden) {
    queryUser.order = [[atributo, orden]];
  }
  const { count } = await User.findAndCountAll(queryUser);
  queryUser.include = { all: true, nested: true };
  const { rows } = await User.findAndCountAll(queryUser);

  return res.send({ count, users: rows, currentPage: getCurrentPage(offset, limit), });
}

async function getBookings(req, res) {
  const limit =  Number(req.query.limit)  || 10;
  const page = Number(req.query.page)     || 1;// falta una validacion
  const offset = (page * limit) - limit;
  // const atributo = req.query.atributo   || null;
  // const orden =    req.query.orden      || null;

  const queryBooking = {
    limit,
    offset,
    include: [ { model:Post },{ model: User }],
    attributes: {
      exclude:['createdAt', 'updatedAt'],
    },
    // duplicating: false,
  };
  const { count } = await VisitDate.findAndCountAll({});
  console.log(' count: ', count);
  // const { rows } = await VisitDate.findAndCountAll({ include: [ { model:Post },{ model: User }] });
  const { rows } = await VisitDate.findAndCountAll(queryBooking);
  console.log(' rows: ', rows);
  return res.send({ count, bookings: rows, currentPage: getCurrentPage(offset, limit), });
}

module.exports = {
  getUsers,
  getBookings
};
