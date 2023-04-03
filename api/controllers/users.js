const User = require("../models/user");

// Define a UsersController object
const UsersController = {
  // Define a method called "Create" on the UsersController object
  Create: (req, res) => {
    // Create a new User using the User model and the request body
    const user = new User(req.body);
    // Save the new User to the database
    user.save((err) => {
      // If there's an error, return a 400 Bad Request error with a message
      if (err) {
        res.status(400).json({message: 'Bad request'})
      // Otherwise, return a 201 Created status code with a message
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },
};

module.exports = UsersController;
