var express = require('express');
var router = express.Router();
var navParam = require('./../src/headerParam');

/* admin page */

router.get('/', function(req, res, next) {
  //check user's authentication
  res.render('join', navParam('/'));
});

router.get('/contact', function(req, res, next) {
  res.render('contact', navParam('/contact'));
});

router.get('/developer', function(req, res, next){
  res.redirect('http://openholo.org:8080/redmine');
});

router.get('/commission', function(req, res, next){
  res.render('commission', navParam('/commission'));
});

module.exports = router;
