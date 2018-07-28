const assert = require('assert');
const User = require('../models/user');

describe('Virtual types', () => {
  it('postsCount returned as number of posts', done => {
    const song = new User({ name: 'Young',  gender: 'Male',  commentsCount: 1,  posts: [{ title: 'Post Title' }] })
    song.save()
      .then(() => User.findOne({ name: 'Young' }))
      .then((user) => {
        assert(song.postsCount === 1);
        done();
      })
  })
});
