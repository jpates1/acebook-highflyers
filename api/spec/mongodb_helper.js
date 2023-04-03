// Importing the Mongoose library into the codebase
var mongoose = require("mongoose");

// beforeAll function that takes a callback function as an argument
beforeAll(function (done) {
  
  // Connecting to the MongoDB instance using the MongoDB connection string and 
  // setting options to use new URL parser and unified topology
  mongoose.connect("mongodb://0.0.0.0/acebook_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Getting a reference to the connection object
  var db = mongoose.connection;

  // Event listener for the error event of the connection object
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  // Event listener for the open event of the connection object
  db.on("open", function () {

    // Calling the done function, which signals to Jest that the beforeAll function has completed
    done();
  });
});

// afterAll function that takes a callback function as an argument
afterAll(function (done) {

  // Closing the connection to the MongoDB instance
  mongoose.connection.close(true, function () {

    // Calling the done function, which signals to Jest that the afterAll function has completed
    done();
  });
});
