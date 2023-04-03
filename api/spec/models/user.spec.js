const mongoose = require("mongoose");

// Importing mongodb_helper to configure the database connection
require("../mongodb_helper");

// Importing the User model
const User = require("../../models/user");

// Describing the User model and its functionalities
describe("User model", () => {

  // Setting up the database by dropping any existing "users" collection
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  // Testing if the User model has an email attribute
  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  // Testing if the User model has a password attribute
  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  // Testing if the User model can list all users
  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  // Testing if the User model can save a new user to the database
  it("can save a user", (done) => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        // Checking if the first user in the list has the expected email and password attributes
        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          password: "password",
        });
        done();
      });
    });
  });
});
