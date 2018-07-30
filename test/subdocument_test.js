const assert = require('assert');
const User  = require('../models/user');

describe('Reading users out of the database', () => {
  it('Can create a subdocument and add another', done => {
    const me = new User({ name: 'Young',  gender: 'Male', 
                          posts: [{ title: 'Post title'}] });
    me.save()
      .then(() => User.findOne({ name: 'Young' }))
      .then(user => {
        user.posts.push({ title: 'Another title'});
        return user.save();
      })
      .then(() => User.findOne({ name: 'Young' })
        .then(user => {
          console.log(user);
          assert(user.posts[0].title === 'Post title');
          assert(user.posts[1].title === 'Another title');
          done();
        })
      )
  });

  it('Remove a subdocement from a user', done => {
    const me = new User({ name: 'Young', gender: 'Male' })
    me.save()
      .then(() => User.findOne({ name: 'Young' }))
      .then(user => {
        user.posts.push({ title: 'First Post' });
        user.posts.push({ title: 'Second Post' });
        user.posts.push({ title: 'Another Post' });
        user.posts.push({ title: 'Last Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Young' }))
      .then(user => {
        let post;
        for (let p of user.posts) {
          if ( p.title === 'Another Post') {
            post = p;
            break;
          }
        }
        if (post) {
          post.remove();
          user.save()
            .then(() => User.findOne({ name: 'Young' })
            .then(newuser => { 
              console.log('After remove a post:', newuser);
              assert(newuser.postsCount === 3);
              done()
            }))
        }
      })
  });
});