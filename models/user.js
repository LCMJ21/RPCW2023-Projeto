var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  passportLocalMongoose = require("passport-local-mongoose");

var User = new Schema({
  email: String,
  username: String,
  password: String,
  afiliation: String,
  dateCreated: String,
});

User.plugin(passportLocalMongoose);

const myDB = mongoose.connection.useDb("AuthenticationJusticeDB");

module.exports = myDB.model("user", User);
