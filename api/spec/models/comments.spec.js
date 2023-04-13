const mongoose = require("mongoose");
require("../mongodb_helper");

describe("Comments model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    const comment = new comment ({ message: "Nice cat!" });
    expect(comment.message).toEqual("Nice cat!");
  });
});
