const { Router } = require('express');
const postsRouter = require('./posts.js');
const users = require('./users');
const user = require('./user');
const postRouter = require('./post');
const postMercadopago = require('./mercadopago');
const booking = require('./visitDate.js');
const bookings = require('./visitDates.js');
const mailer = require('./mailer');
const updater = require('./updater');
const views = require('./views');

const router = Router();

router.use('/updater', updater);
router.use('/user', user);
router.use('/users', users);
router.use('/post', postRouter);
router.use('/posts', postsRouter);
router.use('/booking', booking);
router.use('/bookings', bookings);
router.use('/mercadopago', postMercadopago);
router.use('/mailer', mailer);
router.use('/views', views);
module.exports = router;
