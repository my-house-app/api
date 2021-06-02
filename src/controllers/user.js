/* eslint-disable guard-for-in */
/* eslint-disable indent */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable key-spacing */
/* eslint-disable no-multi-spaces */
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { User, Post, VisitDate } = require('../db.js');
const { isRegEx } = require('../utils.js');

async function getUserById(req, res) {
  const { id } = req.params;

  if (!isRegEx(id)) {
    return res.send({ message: 'El Id pasado no es válido' });
  }

  const user = await User.findByPk(id, {
    include: [
      {
        model: Post,
        include: [{ model:VisitDate }],
      },
      {
        model: VisitDate,
      },
      // {
      //   model: Comment,
      // },
    ],
  });

  return res.send({ user });
}

async function addUser(req, res) {
  const createUser = {
    id: uuidv4(),
    email: req.body.email,
    name: req.body.name,
    password: req.body.externalId || bcrypt.hashSync(req.body.password, 1),
    phone: req.body.phone && Number(req.body.phone),
    photo: req.body.photo,
    city: req.body.city,
    street_number: req.body.street_number,
    zip_code: req.body.zip_code,
    type: req.body.type,
    status: req.body.status,
    externalId: req.body.externalId,
  };
  try {
    const user = await User.create(createUser);
    return res.send({ message: 'Se creo exitosamente un nuevo Usuario!', user });
  } catch (error) {
    return res.send(error.errors[0].message);
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  const user = await User.findByPk(id);
  // 'Available', 'Expired', 'Not-available', 'Sold'
  user.status = 'Not-available';
  await user.save();

  return res.send({ message: 'Deleted user ', user });
}

async function updateUser(req, res) {
  const { id } = req.params;
  const upDateUser = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password ? bcrypt.hashSync(req.body.password, 1) : null,
    phone: req.body.phone,
    photo: req.body.photo,
    city: req.body.city,
    street_number: req.body.street_number,
    zip_code: req.body.zip_code,
    type: req.body.type,
    status: req.body.status,
  };

  const user = await User.findByPk(id);

  for (const key in user.dataValues) {
    if (upDateUser[key]) {
      user[key] = upDateUser[key];
    }
  }

  await user.save();
  return res.send({ message: `Se actualizó el usuario ${user.name}` });
}

async function getGoogleUserById(req, res) {
  const { id } = req.params;
  const user = await User.findOne({
    where: { externalId: id },
  });
  return res.send({ user });
}

async function findOrCreateGoogleUser(req, res) {
  const [user, created] = await User.findOrCreate({
    where: { externalId: req.body.externalId },
    defaults: {
      id: uuidv4(),
      email: req.body.email,
      name: req.body.name,
      password: req.body.externalId,
      type: 'User',
    },
    include: {
      all: true, nested: true,
    },
  });

  return res.send({ user });
}

module.exports = {
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  findOrCreateGoogleUser,
  getGoogleUserById,
};
