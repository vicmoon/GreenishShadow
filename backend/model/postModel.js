const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
      enum: ['Article', 'Game'],
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

//compile schema to form model
const Post = mongoose.model('Post', postSchema);

//export model
module.exports = Post;
