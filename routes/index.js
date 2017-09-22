var express = require('express');
var router = express.Router();



/* admin page */
router.get('/', function(req, res, next) {
  //check user's authentication
  //if user is not log-on

  //if user is not authenticated -> redirect to index.html with alert message

  //if user is authenticated -> show inform of database
//   var rows = [{username: 'changyoung', email:'email@naver.com', title:'hello World', content:'Hello World!!!'}]; //Test code whether it's visible
  var login_text = "Log In";
  if (req.user){
    login_text = "Log Out";
  }
  res.render('index', {title : "Express", log_text:login_text});
});

module.exports = router;
