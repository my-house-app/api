/* eslint-disable key-spacing */
/* eslint-disable no-return-await */
/* eslint-disable no-restricted-syntax */
const { VisitDate } = require('../db.js');
/**
 * Actualiza un booking
 * @param {* id es el id del booking a actualizar} id
 * @param {* upDateBooking es un objeto con title, date y status como propiedades } upDateBooking
 * @returns Retorna un booking
 */
async function updateBookingRepo(id, upDateBooking) {
  const booking = await VisitDate.findByPk(id);
  if (!booking) return booking;

  for (const key in booking.dataValues) {
    if (upDateBooking[key]) {
      // console.log(`Se actualizo el atributo: ${key} de ${booking[key]}
      // a -> ${upDateBooking[key]}`);
      booking[key] = upDateBooking[key];
    }
  }
  return await booking.save();
}

// Construyo un objeto con la estructura que necesito para mostrar una reserva
function buidlBookingObject(booking) {
  const bookingSended = {
    id: booking.id,
    date: booking.date,
    status: booking.status,
    post:{
      postId: booking.postId,
      title: booking.title,
      status: booking.post.status,
      city: booking.post.city,
      photo: booking.post.photo,
    },
    owner: {
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
  return bookingSended;
}
module.exports = {
  updateBookingRepo,
  buidlBookingObject,
};
