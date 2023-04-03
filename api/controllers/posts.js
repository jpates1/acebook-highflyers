const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

// Define a PostsController object
const PostsController = {
  // Define a method called "Index" on the PostsController object
  Index: (req, res) => {
    // Find all posts using the Post model
    Post.find(async (err, posts) => {
      // If there's an error, throw it
      if (err) {
        throw err;
      }
      // Generate a JSON Web Token using the TokenGenerator model and the user_id from the request
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      // Send a JSON response with a status code of 200 and an object containing the posts and the token
      res.status(200).json({ posts: posts, token: token });
    });
  },
  // Define a method called "Create" on the PostsController object
  Create: (req, res) => {
    // Create a new Post using the Post model and the request body
    const post = new Post(req.body);
    // Save the new Post to the database
    post.save(async (err) => {
      // If there's an error, throw it
      if (err) {
        throw err;
      }
      // Generate a JSON Web Token using the TokenGenerator model and the user_id from the request
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      // Send a JSON response with a status code of 201 and an object containing a message and the token
      res.status(201).json({ message: 'OK', token: token });
    });
  },
};

module.exports = PostsController;
