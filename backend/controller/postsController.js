const Post = require("../model/postModel");
const appError = require("../utils/appError");

// GET all posts
const allPostsController = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Latest posts first
    res.status(200).json(posts); // Return the posts as a JSON response
  } catch (error) {
    next(new appError("Failed to retrieve posts", 500)); // Handle error properly
  }
};

//GET a Post
const getOnePostController = async (req, res, next) => {
  try {
    // console.log("Get a post response");
  } catch (error) {}
};

//POST a Post
const postPostController = async (req, res, next) => {
  const { title, content, tag } = req.body;

  try {
    const createdPost = await Post.create({
      title,
      content,
      tag,
      // image: req.file.path,
    });
    console.log("Post created", createdPost);
    res.status(201).json({ message: "Post created", post: createdPost });
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(400).json({ error: error.message });
  }
};

//EDIT a POST
const editPostController = async (req, res, next) => {
  try {
  } catch (error) {}
};

//DELETE a Post
const deletePostController = async (req, res, next) => {
  try {
  } catch (error) {}
};

module.exports = {
  allPostsController,
  postPostController,
  getOnePostController,
  editPostController,
  deletePostController,
};
