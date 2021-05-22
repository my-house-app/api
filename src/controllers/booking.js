/* eslint-disable key-spacing */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-console */
const { v4: uuidv4 } = require('uuid');
const { VisitDate, Post, User } = require('../db.js');

async function getBooking(req, res) {
  const { id } = req.params;
  const booking = await VisitDate.findByPk(id, { include: { all: true, nested: true } });
  if (!booking) return res.status(404).send({ message: 'Id booking doesnt exist' });
  const bookingSended = {
    id: booking.id,
    date: booking.date,
    status: booking.status,
    post:{
      postId: booking.postId,
      title: booking.title,
      status: booking.status,
      city: booking.post.city,
    },
    owner:{
      userId: booking.post.userId,
      name:  booking.post.user.name,
      email: booking.post.user.email,
      phone: booking.post.user.phone,
      photo: booking.post.user.photo,
    },
    interested: {
      userId: booking.user.id,
      name:  booking.user.name,
      email: booking.user.email,
      phone: booking.user.phone,
      photo: booking.user.photo,
    },

  };
  return res.send({ bookingSended });
}

async function addBooking(req, res) {
  //   const reserva = {
  //     id: 1,
  //     id_owner: 'asdasdas3215',
  //     id_interesado: 'as3d21a65sd4a2ds1',
  //     title:'fulano',
  // }
  const {
    idPost, idInterested, title,
  } = req.body;
  console.log('idPost: ', idPost);
  console.log('id_interesado: ', idInterested);
  console.log('title: ', title);
  if (!idInterested || !idPost) return res.status(400).send({ message: 'Missing data id post o user interested' });
  const user = await User.findByPk(idInterested);
  const post = await Post.findByPk(idPost);
  if (!user || !post) return res.status(404).send({ message: 'Post or user doesnt exist' });
  const createBooking = {
    id: uuidv4(),
    title,
    date: new Date(),
    status: 'Pending',
  };

  const booking = await VisitDate.create(createBooking);
  console.log('booking id: ', booking);
  booking.setPost(post);
  booking.setUser(user);
  return res.send({ message: 'A new booking was successfully created!', booking });
}

async function updateBooking(req, res) {
  const { id } = req.params;
  const { date, status, title } = req.body;
  const upDateBooking = {
    title,
    date,
    status,
  };
  const booking = await VisitDate.findByPk(id);
  if (!booking) return res.status(404).send({ message: 'Id booking doesnt exist' });

  for (const key in booking.dataValues) {
    if (upDateBooking[key]) {
      console.log(`Se actualizo el atributo: ${key} de ${booking[key]} a -> ${upDateBooking[key]}`);
      booking[key] = upDateBooking[key];
    }
  }
  await booking.save();

  return res.send({ message: 'The booking was updated!', booking });
}

async function deleteBooking(req, res) {
  const { id } = req.params;
  const booking = await VisitDate.findByPk(id);
  if (!booking) return res.status(404).send({ message: 'Id booking doesnt exist' });
  await booking.destroy();
  return res.send({ message: 'Se elimino exitosamente el booking!', booking });
}
module.exports = {
  addBooking,
  deleteBooking,
  updateBooking,
  getBooking,
};
