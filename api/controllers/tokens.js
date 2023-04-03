const User = require("../models/user");
const TokenGenerator = require("../models/token_generator")

// Define a SessionsController object
const SessionsController = {
  // Define a method called "Create" on the SessionsController object
  Create: (req, res) => {
    // Get the email and password from the request body
    const email = req.body.email;
    const password = req.body.password;

    // Find the user with the given email using the User model
    User.findOne({ email: email }).then(async (user) => {
      // If the user isn't found, return a 401 unauthorized error
      if (!user) {
        console.log("auth error: user not found")
        res.status(401).json({ message: "auth error" });
      // If the password doesn't match, return a 401 unauthorized error
      } else if (user.password !== password) {
        console.log("auth error: passwords do not match")
        res.status(401).json({ message: "auth error" });
      // Otherwise, generate a JSON Web Token using the TokenGenerator model and the user's id, and return it with a 201 status code
      } else {
        const token = await TokenGenerator.jsonwebtoken(user.id)
        res.status(201).json({ token: token, message: "OK" });
      }
    });
  }
};

module.exports = SessionsController;
