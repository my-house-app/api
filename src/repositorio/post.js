function buildObjectPost(body) {
  const attributesPost = {
    active: body.active || true,
    post_name: body.post_name,
    premium: body.premium,
    status: body.status,
    prop_type: body.prop_type,
    department: body.department,
    city: body.city,
    street_number: body.street_number,
    longitude: Number(body.longitude),
    latitude: Number(body.latitude),
    neighborhood: body.neighborhood,
    allowAddress: body.allowAddress,
    description: body.description,
    stratum: Number(body.stratum),
    price: Number(body.price),
    m2: Number(body.m2),
    rooms: Number(body.rooms),
    bathrooms: Number(body.bathrooms),
    years: Number(body.years),
    pool: body.pool,
    backyard: body.backyard,
    gym: body.gym,
    bbq: body.bbq,
    parking_lot: body.parking_lot,
    garden: body.garden,
    elevator: body.elevator,
    security: body.security,
  };
  return attributesPost;
}

module.exports = {
  buildObjectPost,
};
