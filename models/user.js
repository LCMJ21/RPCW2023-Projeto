var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  passportLocalMongoose = require("passport-local-mongoose");

var User = new Schema({
  username: String,
  password: String,
  name: String,
  level: String,
  active: Boolean,
  dateCreated: String,
});

User.plugin(passportLocalMongoose);

const myDB = mongoose.connection.useDb("AuthenticationJusticeDB");

module.exports = myDB.model("user", User);
