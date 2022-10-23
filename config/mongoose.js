const { connect } = require("mongoose");

connect("mongodb://localhost:27017/example-tasks")
  .then(() => console.log("Db is connected"))
  .catch(error => console.error(error));
