/* eslint-disable no-console */
/* eslint-disable no-multi-spaces */
/* eslint-disable key-spacing */
/* eslint-disable camelcase */
const { isRegEx, quitarAcentos } = require('../utils.js');
const { Post, Image, User } = require('../db.js');
const { buidlWhere, getCurrentPage } = require('../utils');

async function getPosts(req, res) {
  const limit    = Number(req.query.limit)      || 10;
  const page     = Number(req.query.page)       || 1;
  const offset   = (page * limit) - limit;
  const atributo = req.query.atributo           || null;
  const orden =    req.query.orden              || null;
  const block = {
    // post_name:        req.query.post_name      || '',
    // city:             req.query.city           || '',
    // neighborhood:     req.query.neighborhood   || '',
    post_name:        quitarAcentos(req.query.post_name)       || '',
    city:             quitarAcentos(req.query.city)            || '',
    neighborhood:     quitarAcentos(req.query.neighborhood)    || '',
    prop_type:        req.query.prop_type       || '',
    priceMin:  Number(req.query.priceMin)       || 0,
    priceMax:  Number(req.query.priceMax)       || null,
    areaMin:   Number(req.query.areaMin)        || 0,
    areaMax:   Number(req.query.areaMax)        || null,
    stratum:   Number(req.query.stratum)        || null,
    rooms:     Number(req.query.rooms)          || null,
    bathrooms: Number(req.query.bathrooms)      || null,
    years:     Number(req.query.years)          || null,
    pool:             req.query.pool            || null,
    backyard:         req.query.backyard        || null,
    gym:              req.query.gym             || null,
    bbq:              req.query.bbq             || null,
    parking_lot:      req.query.parking_lot     || null,
    elevator:         req.query.elevator        || null,
    security:         req.query.security        || null,
    garden:           req.query.garden          || null,
    // para el admin: id es de quien inicio sesion
    id:               req.query.id              || null,
    active:           req.query.active          || null,
    status:           req.query.status          || null,
  };

  if (block.id && isRegEx(block.id)) {
    // si me envian un id tengo que verificar si es un usuario o un admin el que me pide la info
    const user = await User.findByPk(block.id, { attributes: ['id', 'type'] });

    if (user && user.type === 'User') {
      console.log('Sos usuario registrado, comun');
      block.status = 'Available';
      block.active = true;
    } else {
      console.log('Sos usuario registrado, admin o SuperAdmin -> ', user.type);
    }
  } else {
    // si no me envian un id, es un visitante y solamente le envio lo disponible
    console.log('No hay id, sos usuario no registrado');
    block.status = 'Available';
    block.active = true;
  }

  const queryPost = {
    limit,
    offset,
    where: buidlWhere(block),
    order: [['premium', 'DESC']],
    attributes: {
      exclude: ['created', 'updated'],
    },
    include: [{
      model: Image,
      attributes: ['id', 'photo'],
    }, {
      model: User,
      attributes: {
        exclude: ['password', 'created', 'updated'],
      },
    }],
  };

  if (atributo && orden) {
    queryPost.order.push([atributo, orden]);
  }
  console.log('queryPost: ', queryPost);
  const { count, rows } = await Post.findAndCountAll(queryPost);
  const lastPage = Math.ceil(count / limit) || 1;
  if (page > lastPage) return res.status(404).send({ message: 'Invalid Request', lastPage });

  return res.status(200).json(
    {
      count,
      posts: rows,
      currentPage: getCurrentPage(offset, limit),
    },
  );
}

async function cargarBD() {
  const { count } = await Post.findAndCountAll();
  return count === 0;
}

module.exports = {
  getPosts,
  cargarBD,
};
