/* eslint-disable no-use-before-define */
/* eslint-disable no-return-await */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Post, User, Image } = require('../db.js');
const { getURLLocation, isRegEx, buildFindByArray } = require('../utils');
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
  const {
    department,
    city,
    street_number,
  } = req.body;

  const coordinates = {
    longitude: '',
    latitude: '',
  };

  if (department && city && street_number) {
    const url = getURLLocation(department, city, street_number);
    // console.log('url: ', url);
    axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${url}`)
      .then((r) => {
        coordinates.latitude = r.data.items[0].position.lng;
        coordinates.longitude = r.data.items[0].position.lat;
      })
      .catch((e) => console.error("Couldn't fetch data", e));
  }

  const upDatePost = {
    post_name: req.body.post_name,
    premium: req.body.premium,
    status: req.body.status,
    prop_type: req.body.prop_type,
    department: req.body.department,
    city: req.body.city,
    street_number: req.body.street_number,
    longitude: coordinates.longitude,
    latitude: coordinates.latitude,
    description: req.body.description,
    stratum: Number(req.body.stratum),
    neighborhood: req.body.neighborhood,
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
    department,
    city,
    street_number,
    idUser, // es obligatorio
    images, // es ['https://image1','https://image2',...]
  } = req.body;

  if (!isRegEx(idUser)) return res.status(400).send({ message: 'Invalid user Id. ' });
  const user = await User.findByPk(idUser, { include: { model: Post } });

  if (!user) {
    return res.status(400).send({ message: 'Post can not create due to user id is undefined or invalid. ' });
  }

  const coordinates = {
    longitude: null,
    latitude: null,
  };

  if (department && city && street_number) {
    const url = getURLLocation(department, city, street_number);
    // console.log('url: ', url);
    axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${url}`)
      .then((r) => {
        coordinates.latitude = r.data.items[0].position.lng;
        coordinates.longitude = r.data.items[0].position.lat;
      })
      .catch((e) => console.error("Couldn't fetch data", e));
  }

  const attributesPost = {
    id: uuidv4(),
    post_name: req.body.post_name,
    premium: req.body.premium,
    status: req.body.status,
    prop_type: req.body.prop_type,
    department: req.body.department,
    city: req.body.city,
    street_number: req.body.street_number,
    longitude: coordinates.longitude,
    latitude: coordinates.latitude,
    description: req.body.description,
    stratum: Number(req.body.stratum),
    neighborhood: req.body.neighborhood,
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

  // if (images) {
  //   for (let i = 0; i < images.length; i++) {
  //     // creo la imagen
  //     // relaciono la imagen con el post
  //     const image = await Image.create({ photo: images[i] });
  //     post.setImages(image);
  //   }
  // }
  const arrayPost = await findPostById(user.posts.map((publicacion) => publicacion.id));
  arrayPost.push(post);
  user.setPosts(arrayPost);

  return res.send({ message: 'Created post. ', post });
}

// http://localhost:3001/post/c56e930c-5fae-4aee-82f7-f8673e3176f8
async function deletePost(req, res) {
  const { id } = req.params;
  const post = await Post.findByPk(id, { include: { model: Image } });
  // 'Available', 'Expired', 'Not-available'
  post.status = 'Not-available';
  await post.save();

  return res.send({ message: 'Deleted post. ', post });
}

async function findPostById(idPosts) {
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
