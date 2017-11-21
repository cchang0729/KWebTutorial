var express = require('express');
var router = express.Router();
var mariasql = require('mariasql');



/* admin page */
router.get('/', function(req, res, next) {
    //check user's authentication
    //if user is not log-on

    //if user is not authenticated -> redirect to index.html with alert message

    //if user is authenticated -> show inform of database
    var client = new mariasql({
        host : '127.0.0.1',
        user : 'keti',
        password : 'keti'
        });
    client.query("show databases", function(err, rows){
        if(err)
            throw err;

        res.render('boards', {rows : rows});
    });
});

module.exports = router;
