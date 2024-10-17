const Post = require('../model/postModel');
const User = require('../model/userModel');
const appError = require('../utils/appError');

// GET all posts
const allPostsController = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('user'); // Latest posts first
    res.status(200).json(posts); // Return the posts as a JSON response
  } catch (error) {
    next(new appError('Failed to retrieve posts', 500)); // Handle error properly
  }
};

//GET a Post
const getOnePostController = async (req, res) => {
  const { articleId } = req.params; // Get the articleId from the request params

  try {
    const post = await Post.findById(articleId); // Find the post by ID
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post); // Send the post data as the response
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching the post', error: error.message });
  }
};

//POST a Post
const postPostController = async (req, res, next) => {
  const { title, content, tag, image } = req.body;

  try {
    // Assuming the logged-in user's ID is stored in the session (req.session.userAuth)
    const user = req.session.userAuth;

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'You must be logged in to create a post',
      });
    }

    // Create a new post with the logged-in user ID
    const newPost = await Post.create({
      title,
      content,
      tag,
      image,
      user, // Assign the user ID to the post
    });

    res.status(201).json({
      status: 'success',
      data: newPost,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
};

//EDIT a POST
const editPostController = async (req, res, next) => {
  const { title, content, tag, image } = req.body;

  try {
    // Find the post to edit
    const postToEdit = await Post.findById(req.params.id);

    // If the post does not exist
    if (!postToEdit) {
      return next(appError('Post not found', 404));
    }

    // Check if the postToEdit was created by the logged-in user
    // Assuming you store user ID in req.session.userAuth
    if (postToEdit.user.toString() !== req.session.userAuth.toString()) {
      return next(appError('You are not authorized to edit this post', 403));
    }

    // Prepare the updated post data
    const updateData = { title, content, tag, image };

    // Update the post and return the updated version
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true, // Return the updated post
        runValidators: true, // Ensure validation is run on the updated data
      }
    );

    // Send the updated post as the response
    res.status(200).json({
      message: 'Post updated successfully',
      post: updatedPost,
    });
  } catch (error) {
    return next(
      appError('An error occurred while editing the post, try again', 500)
    );
  }
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
