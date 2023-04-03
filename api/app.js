// Importing necessary libraries and modules
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("jsonwebtoken");

// Importing router modules for each resource
const postsRouter = require("./routes/posts");
const tokensRouter = require("./routes/tokens");
const usersRouter = require("./routes/users");

// Initializing an Express application
const app = express();

// Adding middleware to parse incoming JSON requests
app.use(express.json());

// Adding middleware for logging HTTP requests
app.use(logger("dev"));

// Adding middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware function to check for valid tokens
const tokenChecker = (req, res, next) => {

  let token;

  // Extracting the JWT from the Authorization header
  const authHeader = req.get("Authorization");

  if (authHeader) {
    token = authHeader.slice(7); // Slicing off the "Bearer " prefix to obtain the token
  }

  // Verifying the JWT against the provided secret and checking for errors
  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      // If there's an error, responding with a 401 Unauthorized status code and an error message
      res.status(401).json({message: "auth error"});
    } else {
      // If the JWT is valid, storing the user ID from the payload in the request object and invoking the next middleware
      req.user_id = payload.user_id;
      next();
    }
  });
};

// Route setup for each resource, along with the tokenChecker middleware
app.use("/posts", tokenChecker, postsRouter);
app.use("/tokens", tokensRouter);
app.use("/users", usersRouter);

// Middleware for handling 404 Not Found errors
app.use((req, res, next) => {
  next(createError(404));
});

// Error handling middleware
app.use((err, req, res) => {

  // Setting locals to the error message and error object
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Responding with an error message and status code
  res.status(err.status || 500).json({message: 'server error'});
});

module.exports = app;
