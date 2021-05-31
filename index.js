/* eslint-disable no-console */
//       .                    |~~             .
//                   .     ___|___      .
//                        ((((())))
//           .           (((((()))))         .
//                     |-------------|
//               +    I_I_I_I_I_I_I_I_I    +
//              (()   |---------------|   (()
//             |---|  ||-| |-| |-| |-||  |---|
//   _________|-----|_|---------------|_|-----|_________
//   I_I_I_I_I_I_I_I|I_I_I_I_I_I_I_I_I_I|I_I_I_I_I_I_I_|
//   |-------|------|-------------------|------|-------|
//   ||-| |-||  |-| ||-| |-| |-| |-| |-|| |-|  ||-| |-||
// ((|-------|------|-------------------|------|-------|))
// ()|  |_|  |  |_| |::::: ------- :::::| |_|  |  |_|  |()
// ))|  |_|  |  |_| | |_| |_.-"-._| |_| | |_|  |  |_|  |((
// ()|-------|------| |_| | | | | | |_| |------|-------|()
// @@@@@@@@@@@@@@@@@|-----|_|_|_|_|-----|@@@@@@@@@@@@@@@@@
//                 @@@@/=============\@@@@
//                        /       \
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {
  User, Post, VisitDate, Image, ServicePlans, Order,
} = require('./src/db.js');
const users = require('./src/loaders/users');
const posts = require('./src/loaders/posts');
const visitDates = require('./src/loaders/visitDates');
const images = require('./src/loaders/images');
const plans = require('./src/loaders/plans');
const orders = require('./src/loaders/orders');
const { cargarBD } = require('./src/controllers/posts');

const PORT = process.env.PORT || 3001;
// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  if (await cargarBD()) {
    console.log('Cargando ...');
    User.bulkCreate(users);
    Post.bulkCreate(posts);
    setTimeout(() => {
      VisitDate.bulkCreate(visitDates);
      Image.bulkCreate(images);
      ServicePlans.bulkCreate(plans);
      Order.bulkCreate(orders);
    }, 3000);
  } else {
    console.log('La BD ya estaba cargada');
  }
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
