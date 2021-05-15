const { Router } = require('express');
const postsRouter = require('./posts.js');
const users = require('./users');
const user = require('./user');
const postRouter = require('./post');

const router = Router();

router.use('/user', user);
router.use('/users', users);
router.use('/post', postRouter);
router.use('/posts', postsRouter);

module.exports = router;
