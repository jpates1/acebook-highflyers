// Import the app, request, mongodb_helper, Post, User, JWT, and secret
const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require('../../models/post');
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// Initialize token as a global variable
let token;

// Begin the test suite
describe("/posts", () => {

  // Before all tests, create a new user and sign a JWT token for them
  beforeAll( async () => {
    const user = new User({email: "test@test.com", password: "12345678"});
    await user.save();

    // Set the token variable with the user_id, iat, and exp properties
    token = JWT.sign({
      user_id: user.id,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - (5 * 60),
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
  });

  // Before each test, delete all posts from the Post collection
  beforeEach( async () => {
    await Post.deleteMany({});
  })

  // After all tests, delete all users and posts from their respective collections
  afterAll( async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  })

  // Begin the tests for the POST method when the token is present
  describe("POST, when token is present", () => {

    // Test that a valid request returns a 201 status code
    test("responds with a 201", async () => {
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });
      expect(response.status).toEqual(201);
    });
  
    // Test that a valid request creates a new post in the Post collection
    test("creates a new post", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });
      let posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].message).toEqual("hello world");
    });
  
    // Test that a valid request returns a new token
    test("returns a new token", async () => {
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token })

      // Decode the response body token and the original token to compare their iat properties
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });  
  });
});

// Begin the tests for the POST method when the token is missing
describe("POST, when token is missing", () => {

  // Test that an invalid request returns a 401 status code
  test("responds with a 401", async () => {
    let response = await request(app)
      .post("/posts")
      .send({ message: "hello again world" });
    expect(response.status).toEqual(401);
  });

  // Test that an invalid request does not create a new post in the Post collection
  test("a post is not created", async () => {
    await request(app)
      .post("/posts")
      .send({ message: "hello again world" });
    let posts = await Post.find();
    expect(posts.length).toEqual(0);
  });

  // Test that an invalid request does not return a token
  test("a token is not returned", async () => {
    let response = await request(app)
      .post("/posts")
      .send({ message: "hello again world" });
    expect(response.body.token).toEqual(undefined);
  });
});

// Begin the tests for the GET method when the token is present
describe("GET, when token is present", () => {

  // Test that a valid request returns every post in the Post collection
  test("returns every post in the collection", async () => {
    // Create and save two new posts to the Post collection
    let post1 = new Post({message: "howdy!"});
    let post2 = new Post({message: "hola!"});
    await post1.save();
    await post2.save();

    // Make a request to get all posts with the valid token
    let response = await request(app)
      .get("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({token: token});

    // Extract the messages from the response body posts array
    let messages = response.body.posts.map((post) => ( post.message ));

    // Test that the returned messages match the created messages
    expect(messages).toEqual(["howdy!", "hola!"]);
  });

  // Test that a valid request returns a 200 status code
  test("the response code is 200", async () => {
    // Create and save two new posts to the Post collection
    let post1 = new Post({message: "howdy!"});
    let post2 = new Post({message: "hola!"});
    await post1.save();
    await post2.save();

    // Make a request to get all posts with the valid token
    let response = await request(app)
      .get("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({token: token});

    // Test that the returned status code is 200
    expect(response.status).toEqual(200);
  });
});

// Begin the tests for the GET method when a new token is returned
test("returns a new token", async () => {
  // Create and save two new posts to the Post collection
  let post1 = new Post({message: "howdy!"});
  let post2 = new Post({message: "hola!"});
  await post1.save();
  await post2.save();

  // Make a request to get all posts with the valid token
  let response = await request(app)
    .get("/posts")
    .set("Authorization", `Bearer ${token}`)
    .send({token: token});

  // Decode the response body token and the original token to compare their iat properties
  let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
  let originalPayload = JWT.decode(token, process.env.JWT_SECRET);

  // Test that the returned token has a later iat value than the original token
  expect(newPayload.iat > originalPayload.iat).toEqual(true);
});

// Begin the tests for the GET method when the token is missing
describe("GET, when token is missing", () => {

  // Test that an invalid request returns no posts
  test("returns no posts", async () => {
    // Create and save two new posts to the Post collection
    let post1 = new Post({message: "howdy!"});
    let post2 = new Post({message: "hola!"});
    await post1.save();
    await post2.save();

    // Make a request to get all posts without a valid token
    let response = await request(app)
      .get("/posts");

    // Test that the returned posts array is undefined
    expect(response.body.posts).toEqual(undefined);
  });

  // Test that an invalid request returns a 401 status code
  test("the response code is 401", async () => {
    // Create and save two new posts to the Post collection
    let post1 = new Post({message: "howdy!"});
    let post2 = new Post({message: "hola!"});
    await post1.save();
    await post2.save();

    // Make a request to get all posts without a valid token
    let response = await request(app)
      .get("/posts");

    // Test that the returned status code is 401
    expect(response.status).toEqual(401);
  });

  // Test that an invalid request does not return a token
  test("does not return a new token", async () => {
    // Create and save two new posts to the Post collection
    let post1 = new Post({message: "howdy!"});
    let post2 = new Post({message: "hola!"});
    await post1.save();
    await post2.save();

    // Make a request to get all posts without a valid token
    let response = await request(app)
      .get("/posts");

    // Test that the returned token is undefined
    expect(response.body.token).toEqual(undefined);
  });
});
