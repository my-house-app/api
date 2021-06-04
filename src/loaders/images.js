const { v4: uuidv4 } = require('uuid');
const rawData = require('./rawData');
const posts = require('./posts');

const postsId = posts.map((p) => p.id);
const images = rawData.map(({ imageLink }) => ({
  id: uuidv4(),
  photo: [imageLink, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80', 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1158&q=80'],
  postId: postsId.pop(),
}));

module.exports = images;
