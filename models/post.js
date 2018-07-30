const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    validate: {
      validator: (title) => title.length > 3,
      message: 'Title must be longer than 3 characters'
    },
  },
  createdAt: { type: String, default: (new Date()).toJSON().slice(0,10) }
});

module.exports = PostSchema;