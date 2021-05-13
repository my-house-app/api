const { Post, Image } = require('../db.js');
const axios = require('axios');
const { getURLLocation } = require('../utils');
/* cambié Post por proeperty porque Posts esta vacia hay que definir bien como es el flow
  porque creo que tenemos un problema de que mmostrar @rennyGalindez
*/
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

// http://localhost:3001/post/121c47c4-27bd-4a83-beaa-d23303bd1000
async function updatePost(req, res) {
  const { id } = req.params;
  const {
    department,
    city,
    street_number,
  } = req.body;
  
  const coordinates = {
    longitude: '',
    latitude: ''
  }

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

  const updatePost = {
    post_name: req.body.post_name,
    premium: req.body.premium,
    status: req.body.status,
    prop_type:  req.body.prop_type,
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
    security: req.body.security
  };
 
  const post = await Post.findByPk(id, { include: { model: Image } });

  for (const key in post.dataValues) {
    if (updatePost[key]) {
      console.log(`Se actualizo el atributo: ${key} de ${post[key]} a -> ${updatePost[key]}`);
      post[key]=updatePost[key];
    }
  }

  await post.save();
  return res.send({ message: 'Updated post. ', post });
}

async function deletePost(req, res) {
  const { id } = req.params;
  const post = await Post.findByPk(id, { include: { model: Image } });
  // 'Available', 'Expired', 'Not-available'
  post['status'] =  'Not-available';
  await post.save();

  return res.send({ message: 'Deleted post. ', post });
}

module.exports = {
  getPostById,
  updatePost,
  deletePost,
};
