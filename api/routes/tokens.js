const express = require("express");
// Create a new router using the express.Router method
const router = express.Router();

// Import the TokensController from "../controllers/tokens"
const TokensController = require("../controllers/tokens");

// Define a POST route on the router that calls the TokensController's "Create" method
router.post("/", TokensController.Create);

module.exports = router;
