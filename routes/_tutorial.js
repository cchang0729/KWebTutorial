var express = require('express');
var router = express.Router();
var mariasql = require('mariasql');



/* admin page */
router.get('/', function(req, res, next) {
    //check user's authentication
    //if user is not log-on

    //if user is not authenticated -> redirect to index.html with alert message

    //if user is authenticated -> show inform of database
    res.render('login');
});

module.exports = router;
