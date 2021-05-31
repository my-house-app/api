/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
const posts = require('./posts');

const orders = posts.map(({ id, userId }, index) => ({
  id: index + 1,
  postId: id,
  userId,
}));

module.exports = orders;
