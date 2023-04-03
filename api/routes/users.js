const express = require("express");
// Create a new router using the express.Router method
const router = express.Router();

// Import the UsersController from "../controllers/users"
const UsersController = require("../controllers/users");

// Define a POST route on the router that calls the UsersController's "Create" method
router.post("/", UsersController.Create);

module.exports = router;
