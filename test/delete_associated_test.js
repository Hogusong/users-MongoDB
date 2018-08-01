const mongoose = require('mongoose');
const assert = require('assert');
const User  = require('../models/user');
const BlogPost = require('../models/blogPost');
const Comment = require('../models/comment');

describe('Delete all associated records', () => {
  let joe, young, blogPost, comment;
  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    young = new User({ name: 'Young' });

    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
    comment = new Comment({ content: 'I really like JS', author: joe })
    blogPost.comments.push(comment);
    joe.blogPosts.push(blogPost);
    blogPost.save();
    comment.save();

    blogPost = new BlogPost({ title: 'What about React', content: 'Yep also it is' });
    comment = new Comment({ content: 'I like React too', author: joe })
    blogPost.comments.push(comment);
    comment.save();
    comment = new Comment({ content: 'I have to learn Redux also', author: joe })
    blogPost.comments.push(comment);
    comment.save();
    joe.blogPosts.push(blogPost);
    blogPost.save();
    joe.save();

    blogPost = new BlogPost({ title: 'MongoDB is so powerful',  content: 'Completely well'});
    comment = new Comment({ content: 'I agree that it is so powerful', author: young })
    blogPost.comments.push(comment);
    young.blogPosts.push(blogPost);
    blogPost.save();
    comment.save();
    young.save().then(() => done());
  });  

  it('users clean up blogposts and comments on remove', done => {
    const blogPosts = joe.blogPosts
    blogPosts.forEach(post => {
      post.comments.forEach(comment => comment.remove())
      post.remove()
    })
    joe.remove()
      .then(() => BlogPost.find({}))
      .then(blogPosts => {
        assert(blogPosts.length === 1);
        Comment.find({})
          .then(comments => {
            assert(comments.length === 1);
            done();
          })
      })
  });
});