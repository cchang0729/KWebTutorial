var express = require('express');
var router = express.Router();



/* admin page */
router.get('/', function(req, res, next) {
  //check user's authentication
  //if user is not log-on

  //if user is not authenticated -> redirect to index.html with alert message

  //if user is authenticated -> show inform of database
//   var rows = [{username: 'changyoung', email:'email@naver.com', title:'hello World', content:'Hello World!!!'}]; //Test code whether it's visible
  res.render('index', {title : "Express"});
});

module.exports = router;
