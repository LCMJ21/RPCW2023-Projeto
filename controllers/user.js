const User = require("../models/user");

module.exports.lastUpadated = (username, lastAccess) =>
  User.updateOne({ username }, { lastAccess });

module.exports.getUserInfo = (username) =>
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

module.exports.getUsers = () => User.find();

module.exports.addFavorite = (username, favorite) =>
  User.updateOne({ username }, { $push: { favorites: favorite } });

module.exports.removeFavorite = (username, favorite) =>
  User.updateOne({ username }, { $pull: { favorites: favorite } });

module.exports.changePermissions = (username, level) =>
  User.updateOne({ username }, { level });
