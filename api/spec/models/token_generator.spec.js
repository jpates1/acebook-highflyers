// Import necessary dependencies
const TokenGenerator = require("../../models/token_generator");
const JWT = require("jsonwebtoken")

// Begin tests for the TokenGenerator model
describe("TokenGenerator", () => {
  // Test the jsonwebtoken function
  describe("jsonwebtoken", () => {
    // Test that a valid token is returned containing user_id that is valid for 10 minutes
    test("returns a token containing user_id that is valid for 10 minutes", () => {
      // Set user_id to 1 for the test
      const user_id = 1;
      // Generate a token using the TokenGenerator jsonwebtoken function
      const token = TokenGenerator.jsonwebtoken(user_id);
      // Decode the token payload using JWT decode
      const payload = JWT.decode(token, process.env.JWT_SECRET);
      // Check that the decoded payload contains the expected user_id
      expect(payload.user_id).toEqual(user_id);
      // Check that the token is valid for 10 minutes (600 seconds)
      expect(payload.exp - payload.iat).toEqual(600);
    })
  })
})
