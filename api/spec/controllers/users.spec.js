// Import necessary dependencies
const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user')

// Begin the tests for the /users route
describe("/users", () => {

  // Delete all users before each test is run
  beforeEach( async () => {
    await User.deleteMany({});
  });

  // Test that a new user is created with email and password provided
  describe("POST, when email and password are provided", () => {
    // Test that the response status is 201
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "poppy@email.com", password: "1234"})
      expect(response.statusCode).toBe(201)
    })

    // Test that a new user is created with the specified email
    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({email: "scarlett@email.com", password: "1234"})
      let users = await User.find()
      let newUser = users[users.length - 1]
      expect(newUser.email).toEqual("scarlett@email.com")
    })
  })

  // Test that a new user is not created when password is missing
  describe("POST, when password is missing", () => {
    // Test that the response status is 400
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "skye@email.com"})
      expect(response.statusCode).toBe(400)
    });

    // Test that no new user is created
    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({email: "skye@email.com"})
        let users = await User.find()
        expect(users.length).toEqual(0)
    });
  })
  
  // Test that a new user is not created when email is missing
  describe("POST, when email is missing", () => {
    // Test that the response status is 400
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({password: "1234"})
      expect(response.statusCode).toBe(400)
    });

    // Test that no new user is created
    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({password: "1234"})
      let users = await User.find()
      expect(users.length).toEqual(0)
    });
  })
})
