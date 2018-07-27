const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = new Schema({
  title: {
    type: String,
    validate: {
      validator: (title) => title.length > 3,
      message: 'Title must be longer than 3 characters'
    },
  },
  createdAt: { type: Date, default: new Date() }
});
