/* eslint-disable guard-for-in */
/* eslint-disable indent */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable key-spacing */
/* eslint-disable no-multi-spaces */
const { v4: uuidv4 } = require('uuid');
const { User } = require('../db.js');
const { isRegEx } = require('../utils.js');
const bcrypt = require('bcrypt');
// ABM

// Example
// http://localhost:3001/user/011f5c9c-b6a3-4c68-9288-62b189281a0d
async function getUserById(req, res) {
  const { id } = req.params;

  if (!isRegEx(id)) {
    return res.send({ message: 'El Id pasado no es válido' });
  }

  const user = await User.findByPk(id, {
    include: { all: true, nested: true },
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
    externalId: req.body.externalId
  };
  try {
  const user = await User.create(createUser);
  res.send({ message: 'Se creo exitosamente un nuevo Usuario!', user });
  } catch (error) {
    res.send(error.errors[0].message)
  }
}

// http://localhost:3001/user/011f5c9c-b6a3-4c68-9288-62B189281A0D
async function deleteUser(req, res) {
  const { id } = req.params;
  const user = await User.findByPk(id);
  // 'Available', 'Expired', 'Not-available'
  user.status = 'Not-available';
  await user.save();

  return res.send({ message: 'Deleted user ', user });
}

// http://localhost:3001/user/011f5c9c-b6a3-4c68-9288-62b189281a0d
// Mas un body con los atributos a actualizar
async function updateUser(req, res) {
  
  const { id } = req.params;
  const upDateUser = {
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 1),
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
      console.log(`Se actualizo el atributo: ${key} de ${user[key]} a -> ${upDateUser[key]}`);
      user[key] = upDateUser[key];
    }
  }
  
  await user.save();
  res.send({ message: `Se actualizó el usuario ${user.name}` });

}

module.exports = {
  getUserById,
  addUser,
  deleteUser,
  updateUser,
};
