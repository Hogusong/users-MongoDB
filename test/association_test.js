const assert = require('assert');

const User  = require('../models/user');
const Comment = require('../models/comment');
const BlogPost = require('../models/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment, secondBlog;
  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
    secondBlog = new BlogPost({ title: 'What about React', content: 'Yep also it is' });
    comment = new Comment({ content: 'Congrats on great post' });

    comment.author = joe;
    blogPost.comments.push(comment);
    joe.blogPosts.push(blogPost);
    joe.blogPosts.push(secondBlog);

    Promise.all([joe.save(), blogPost.save(), secondBlog.save(), comment.save()])
      .then(() => done());
  });

  it('Save a relation between a user and a blogPost', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(user.blogPosts[0].content === 'Yep it really is');
        done();
      })
  });

  it('Show a full relation graph', done => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'author',
            model: 'user'
          }
        }
      })
      .then(user => {
        console.log(user.blogPosts[0]);
        console.log(user.blogPosts[1]);
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(user.blogPosts[0].content === 'Yep it really is');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
        assert(user.blogPosts[0].comments[0].author.name === 'Joe');
        done();
      })
  });

  it('Remove a relation between a user and a blogpost', done => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'author',
            model: 'user'
          }
        }
      })
      .then(user => {
        const blog_id = user.blogPosts[1]._id;
        const comment_id = user.blogPosts[0].comments[0]._id;
        const blog = user.blogPosts[0];

        // delete a comment with _id from CommentSchema
        Comment.findByIdAndRemove(comment_id)
          .then(() =>  Comment.find({}))
          .then(comments => assert(comments.length === 0))

        // delete a comment from blogPost's comments 
        blog.comments.splice(0, 1);
        // console.log(blog);
        blog.save()
          .then(() => BlogPost.find({}))
          .then(blogposts => assert(blogposts[0].comments.length === 0))

        // delete a blogPost from user's blogPosts
        user.blogPosts.splice(1,1)
        user.save()
          .then(() => User.findOne({ name: 'Joe' }))
          .then(user => assert(user.blogPosts.length === 1))

        // delete a blogPost from BlogPostSchema with _id
        BlogPost.findByIdAndRemove(blog_id)
          .then(() => BlogPost.find({}))
          .then(blogposts => assert(blogposts.length === 1))
      done()
      })
  })
});