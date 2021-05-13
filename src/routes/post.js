const router = require('express').Router();
const {
  getPostById, updatePost, deletePost,
} = require('../controllers/post.js');
const middlewareError = require('../middleware/middlewareError.js');

router
  .route('/:id')
  .get(middlewareError(getPostById))
  .put(middlewareError(updatePost))
  .delete(middlewareError(deletePost));

module.exports = router;
