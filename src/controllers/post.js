/* eslint-disable no-use-before-define */
/* eslint-disable no-return-await */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
const { v4: uuidv4 } = require('uuid');
const {
  Post, User, Image,
} = require('../db.js');
const { isRegEx, buildFindByArray } = require('../utils');
const { updateBookingRepo } = require('../repositorio/booking');
/* cambié Post por proeperty porque Posts esta vacia hay que definir bien como es el flow
  porque creo que tenemos un problema de que mmostrar @rennyGalindez
*/
// http://localhost:3001/post/c56e930c-5fae-4aee-82f7-F8673E3176F8
async function getPostById(req, res) {
  const { id } = req.params;
  const regex = new RegExp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  );

  if (regex.test(id)) {
    const post = await Post.findByPk(id, {
      include: { all: true, nested: true },
    });
    res.json(post);
  } else {
    res.send({ message: 'El Id pasado no es válido' });
  }
}

// http://localhost:3001/post/c56e930c-5fae-4aee-82f7-f8673e3176f8
async function updatePost(req, res) {
  const { id } = req.params;

  const upDatePost = {
    post_name: req.body.post_name,
    premium: req.body.premium,
    status: req.body.status,
    prop_type: req.body.prop_type,
    department: req.body.department,
    city: req.body.city,
    street_number: req.body.street_number,
    longitude: Number(req.body.longitude),
    latitude: Number(req.body.latitude),
    neighborhood: req.body.neighborhood,
    allowAddress: req.body.allowAddress,
    description: req.body.description,
    stratum: Number(req.body.stratum),
    price: Number(req.body.price),
    m2: Number(req.body.m2),
    rooms: Number(req.body.rooms),
    bathrooms: Number(req.body.bathrooms),
    years: Number(req.body.years),
    pool: req.body.pool,
    backyard: req.body.backyard,
    gym: req.body.gym,
    bbq: req.body.bbq,
    parking_lot: req.body.parking_lot,
    garden: req.body.garden,
    elevator: req.body.elevator,
    security: req.body.security,
  };

  const post = await Post.findByPk(id, { include: { model: Image } });

  for (const key in post.dataValues) {
    if (upDatePost[key]) {
      console.log(`Se actualizo el atributo: ${key} de ${post[key]} a -> ${upDatePost[key]}`);
      post[key] = upDatePost[key];
    }
  }

  await post.save();
  return res.send({ message: 'Updated post. ', post });
}

async function createPost(req, res) {
  const {
    idUser, // es obligatorio
    images, // es ['https://image1','https://image2',...]
  } = req.body;

  if (!isRegEx(idUser)) return res.status(400).send({ message: 'Invalid user Id. ' });
  const user = await User.findByPk(idUser, { include: { model: Post } });

  if (!user) {
    return res.status(400).send({ message: 'Post can not create due to user id is undefined or invalid. ' });
  }

  const id = req.body.id || uuidv4();

  const attributesPost = {
    id,
    active: true,
    post_name: req.body.post_name,
    premium: req.body.premium,
    status: req.body.status,
    prop_type: req.body.prop_type,
    department: req.body.department,
    city: req.body.city,
    street_number: req.body.street_number,
    longitude: Number(req.body.longitude),
    latitude: Number(req.body.latitude),
    neighborhood: req.body.neighborhood,
    allowAddress: req.body.allowAddress,
    description: req.body.description,
    stratum: Number(req.body.stratum),
    price: Number(req.body.price),
    m2: Number(req.body.m2),
    rooms: Number(req.body.rooms),
    bathrooms: Number(req.body.bathrooms),
    years: Number(req.body.years),
    pool: req.body.pool,
    backyard: req.body.backyard,
    gym: req.body.gym,
    bbq: req.body.bbq,
    parking_lot: req.body.parking_lot,
    garden: req.body.garden,
    elevator: req.body.elevator,
    security: req.body.security,
  };

  const post = await Post.create(attributesPost);

  const image = await Image.create({ id: uuidv4(), photo: images });
  post.setImages(image);

  const arrayPost = await findPostsByIds(user.posts.map((publicacion) => publicacion.id));
  arrayPost.push(post);
  user.setPosts(arrayPost);

  return res.send({ message: 'Created post. ', post });
}

// http://localhost:3001/post/c56e930c-5fae-4aee-82f7-f8673e3176f8
async function deletePost(req, res) {
  const { id } = req.params;
  const post = await Post.findByPk(id, { include: { all: true, nested: true } });

  post.status = 'Not-available';
  post.active = false;
  await post.save();

  const idBookings = post.visitDates.map((booking) => booking.id);
  const upDateBooking = {
    title: null,
    date: new Date(),
    status: 'Cancelled',
  };
  // Cambiar el estado de todas sus reservas a 'Cancelled'
  idBookings.forEach(async (idBooking) => {
    await updateBookingRepo(idBooking, upDateBooking);// retorna un booking
  });

  return res.send({ message: 'Deleted post. ', post });
}

/**
 * Busca todos los post por id que estan en un Array
 * @param {* idPosts es un array de id de publicaciones} idPosts
 * @returns Retorna un Array de objetos Post
 */
async function findPostsByIds(idPosts) {
  return await Post.findAll({
    where: {
      id: buildFindByArray(idPosts),
    },
  });
}

module.exports = {
  getPostById,
  updatePost,
  deletePost,
  createPost,
};
