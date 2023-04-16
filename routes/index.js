var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var logged_in = true;
  if (logged_in) {
    res.render('homepage', { title: 'Justice home' });
  }
  else {
    res.redirect('/users/login');
  }
});

module.exports = router;
