// Import necessary dependencies
var mongoose = require("mongoose");
require("../mongodb_helper");
var Post = require("../../models/post");

// Begin the tests for the Post model
describe("Post model", () => {
  // Clear the posts collection before each test
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  // Test that the Post model has a message property
  it("has a message", () => {
    var post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  // Test that all posts can be listed
  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  // Test that a new post can be saved to the database
  it("can save a post", (done) => {
    var post = new Post({ message: "some message" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        // Check that the saved post matches the expected message
        expect(posts[0]).toMatchObject({ message: "some message" });
        done();
      });
    });
  });
});
