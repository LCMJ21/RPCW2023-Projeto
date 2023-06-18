const Level = require("../utils/enums").Level;
var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  passportLocalMongoose = require("passport-local-mongoose");

var User = new Schema({
  email: String,
  name: String,
  username: { type: String, unique: true },
  password: String,
  afiliation: String,
  dateCreated: String,
  level: { type: String, enum: Object.values(Level) },
  lastAccess: String,
  favorites: [String],
});

User.plugin(passportLocalMongoose);

const myDB = mongoose.connection.useDb("AuthenticationJusticeDB");

module.exports = myDB.model("user", User);
