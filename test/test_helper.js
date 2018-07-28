const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect('mongodb://localhost/user_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', err => console.warn('warning', err));
});

beforeEach(done => {
  const { users, comments, blogposts } = mongoose.connection.collections ;
  if(users) users.drop(() => done());
  if(comments) comments.drop(() => done());
  if(blogposts) blogposts.drop(() => done());
});
