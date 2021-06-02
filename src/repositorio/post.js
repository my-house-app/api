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
    pool: body.pool || false,
    backyard: body.backyard || false,
    gym: body.gym || false,
    bbq: body.bbq || false,
    parking_lot: body.parking_lot || false,
    garden: body.garden || false,
    elevator: body.elevator || false,
    security: body.security || false,
    date: body.date,
  };
  return attributesPost;
}

module.exports = {
  buildObjectPost,
};
