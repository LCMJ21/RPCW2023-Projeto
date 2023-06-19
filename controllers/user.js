const User = require("../models/user");

module.exports.lastUpadated = async (username, lastAccess) =>
  User.updateOne({ username }, { lastAccess });

module.exports.getUserInfo = async (username) =>
  User.findOne(
    { username },
    {
      afiliation: 1,
      dateCreated: 1,
      email: 1,
      favorites: 1,
      lastAccess: 1,
      level: 1,
      name: 1,
    }
  );
