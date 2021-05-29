function buildObjectPost(req, coordinates) {
  const attributesPost = {
    active: true,
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
  return attributesPost;
}

module.exports = {
  buildObjectPost,
};
