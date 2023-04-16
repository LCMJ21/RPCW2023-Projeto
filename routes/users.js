var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('user/login', { title: 'Justice login' });
});

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('user/register', { title: 'Justice register' });
});

/* GET users listing. */
router.get('/user', function(req, res, next) {
  example_user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    afiliation: "University of Toronto",
    role: "Student",
    access: "Admin",
    register_date: "2021-01-01",
    last_login: "2021-01-01",
    favorites: [
      {
        id: 1,
        name: "Example 1",
        description: "Example description 1",
        url: "https://example.com/1",
      },
      {
        id: 2,
        name: "Example 2",
        description: "Example description 2",
        url: "https://example.com/2",
      },
    ],
  };
  res.render('user/user', { title: 'Justice user', user: example_user});
});

module.exports = router;
