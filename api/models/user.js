const mongoose = require("mongoose");

// Define a new schema for the User model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Create a new model called "User" using the UserSchema and the mongoose.model method
const User = mongoose.model("User", UserSchema);

module.exports = User;
