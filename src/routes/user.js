const router = require('express').Router();
const {
  getUserById, updateUser, deleteUser, addUser, findOrCreateGoogleUser, getGoogleUserById,
} = require('../controllers/user.js');
const middlewareError = require('../middleware/middlewareError.js');

//   .post(middlewareError(addUser))
router.route('/').post(middlewareError(addUser));
router.route('/google')
  .post(middlewareError(findOrCreateGoogleUser));
router.route('/google/:id')
  .get(middlewareError(getGoogleUserById));
router.route('/:id')
  .get(middlewareError(getUserById))
  .put(middlewareError(updateUser))
  .delete(middlewareError(deleteUser));

module.exports = router;
