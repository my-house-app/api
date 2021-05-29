/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
const { v4: uuidv4 } = require('uuid');
const posts = require('./posts');
const plans = require('./plans');

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const dates = [];
let date;
let status;
// eslint-disable-next-line no-plusplus
for (let i = 0; i < posts.length; i++) {
  date = randomDate(new Date(2021, 3, 1), new Date());
  posts[i].premium ? (date < new Date(
    new Date().setDate(new Date().getDate() - 90),
  ) ? status = 'expired'
    : status = 'active'
  )
    : (date < new Date(
      new Date().setDate(new Date().getDate() - 30),
    ) ? status = 'expired'
      : status = 'active'
    );
  dates.push({ date, status });
}

const orders = posts.map(({ id, userId }, index) => ({
  id: index,
  postId: id,
  userId,
  date: dates[index].date,
  status: dates[index].status,
  servicePlanId: posts[index].premium ? plans[1].id : plans[0].id,
}));

module.exports = orders;
