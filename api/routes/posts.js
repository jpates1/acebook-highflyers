const express = require("express");
// Create a new router using the express.Router method
const router = express.Router();

// Import the PostsController from "../controllers/posts"
const PostsController = require("../controllers/posts");

// Define a GET route on the router that calls the PostsController's "Index" method
router.get("/", PostsController.Index);
// Define a POST route on the router that calls the PostsController's "Create" method
router.post("/", PostsController.Create);

module.exports = router;
