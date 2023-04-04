const JWT = require("jsonwebtoken");
// Get the JWT secret from the environment variables
const secret = process.env.JWT_SECRET;

// Define a TokenGenerator class
class TokenGenerator {
  // Define a static method called "jsonwebtoken" on the TokenGenerator class
  static jsonwebtoken(user_id) {
    // Generate a new JSON Web Token using the user_id and the JWT sign method
    return JWT.sign({
      user_id: user_id,
      iat: Math.floor(Date.now() / 1000),
      
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
  }
}

// Export the TokenGenerator class
module.exports = TokenGenerator;
