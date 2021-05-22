const { Router } = require('express');
const postsRouter = require('./posts.js');
const users = require('./users');
const user = require('./user');
const postRouter = require('./post');
const postMercadopago = require('./mercadopago');

const router = Router();

router.use('/user', user);
router.use('/users', users);
router.use('/post', postRouter);
router.use('/posts', postsRouter);
router.use('/mercadopago', postMercadopago);

module.exports = router;
