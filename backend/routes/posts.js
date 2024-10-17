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
postsRoutes.get('/', allPostsController); // Route: GET /api/posts

// GET a single post by ID
postsRoutes.get('/:articleId', getOnePostController); // Route: GET /api/posts/:articleId

// POST new post
postsRoutes.post('/', postPostController); // Route: POST /api/posts

// EDIT post (with image upload)
postsRoutes.put('/:id', upload.single('image'), editPostController); // Route: PUT /api/posts/:id

// DELETE post
postsRoutes.delete('/:id', deletePostController); // Route: DELETE /api/posts/:id

module.exports = postsRoutes;
