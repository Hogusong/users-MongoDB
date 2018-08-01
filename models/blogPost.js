const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: {
    type: String,
    validate: {
      validator: (title) => title.length > 3,
      message: "Title must be longer than 3 characters."
    },
    required: [true, "BlogPostSchema expexted title prop."]
  },
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
});

// middleware to remove comments before remove a blogPost
// BlogPostSchema.pre('remove', function() {
//   const Comment = mongoose.model('comment');
//   Comment.remove({ _id: { $in: this.comments } })
//     .then(() => next());
// });

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;
