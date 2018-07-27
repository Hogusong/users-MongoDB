const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'UserSchema expected name prop.']
  },
  gender: String,
  commentsCount: Number,
  posts: [PostSchema],
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

// define virtual field on Schema
UserSchema.virtual('countPosts').get(function() {
  return this.posts.length;
})

// middleware to remove user's blogPosts before remove a user
UserSchema.pre('remove', function() {
  const BlogPost = mongoose.model('blogPost');
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

const User = mongoose.model('user', UserSchema)

module.exports = User;
