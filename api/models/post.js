const mongoose = require("mongoose");

// Define a new schema for the Post model
const PostSchema = new mongoose.Schema({
  message: String
});

// Create a new model called "Post" using the PostSchema and the mongoose.model method
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
