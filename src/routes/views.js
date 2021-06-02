const router = require('express').Router();
const { updateView } = require('../controllers/post.js');
const middlewareError = require('../middleware/middlewareError.js');

router.route('/:id')// id de la publicacion
  .put(middlewareError(updateView));

module.exports = router;
