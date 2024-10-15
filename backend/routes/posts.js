const express = require('express');
const multer = require('multer');
const storage = require('../config/firebase');
const postsRoutes = express.Router();
const {
  allPostsController,
  postPostController,
  getOnePostController,
  deletePostController,
  editPostController,
} = require('../controller/postsController');

const upload = multer({
  storage,
});

// GET all posts
postsRoutes.get('/posts', allPostsController);

// GET a post
postsRoutes.get('/posts/:articleId', getOnePostController);

// POST new Post
postsRoutes.post('/posts', postPostController);

// EDIT Post
postsRoutes.put('/:id', upload.single('image'), editPostController);

// DELETE Post
postsRoutes.delete('/:id', deletePostController);

module.exports = postsRoutes;
