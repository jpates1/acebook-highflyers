// Import necessary dependencies
const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');

// Begin the tests for the /tokens route
describe("/tokens", () => {

  // Create a new user before running the tests
  beforeAll( () => {
    const user = new User({ email: "test@test.com", password: "12345678" })
    user.save()
  });

  // Delete all users after the tests have run
  afterAll( async () => {
    await User.deleteMany({})
  })

  // Test that a valid request returns a new token
  test("a token is returned when creds are valid", async () => {
    // Make a request to create a new token with valid user credentials
    let response = await request(app)
      .post("/tokens")
      .send({email: "test@test.com", password: "12345678"})

    // Test that the response status is 201 and a token is returned
    expect(response.status).toEqual(201)
    expect(response.body.token).not.toEqual(undefined)
    expect(response.body.message).toEqual("OK")
  })

  // Test that an invalid request does not return a token
  test("a token is not returned when creds are invalid", async () => {
    // Make a request to create a new token with invalid user credentials
    let response = await request(app)
      .post("/tokens")
      .send({email: "test@test.com", password: "1234"})

    // Test that the response status is 401 and no token is returned
    expect(response.status).toEqual(401)
    expect(response.body.token).toEqual(undefined)
    expect(response.body.message).toEqual("auth error")
  })
})
