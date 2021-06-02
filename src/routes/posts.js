const router = require('express').Router();
const { getPosts } = require('../controllers/posts.js');
const middlewareError = require('../middleware/middlewareError.js');

router.route('/')
  .get(middlewareError(getPosts));

module.exports = router;
