var express = require('express');
var router = express.Router();

function get_all_acoidoes(){
  return [
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
  ]
}

function getUser(){
  return example_user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    afiliation: "University of Toronto",
    role: "Student",
    access: "Admin",
    register_date: "2021-01-01",
    last_login: "2021-01-01",
    favorites: [1,3]
  }
}

router.get('/', function(req, res, next) {
  var logged_in = true;
  if (logged_in) {
    res.render('homepage', { title: 'Justice home' , acordoes: get_all_acoidoes(), user: getUser()});
  }
  else {
    res.redirect('/users/login');
  }
});

module.exports = router;
