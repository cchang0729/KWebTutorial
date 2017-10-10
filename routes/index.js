var express = require('express');
var router = express.Router();



/* admin page */
router.get('/', function(req, res, next) {
  //check user's authentication
  res.render('join');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

module.exports = router;
