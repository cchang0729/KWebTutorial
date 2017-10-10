/**
 * Created by changyoung on 17. 9. 19.
 */

var express = require('express');
var router = express.Router();

/* GET user */
router.get('/', function(req, res, next){
    res.render('users');
});

/* POST user */
router.post('/', function(req, res, next){
    //connect to database

    //load data from req
    var rows = {
        username: req.body['username'],
        email: req.body['email'],
        title: req.body['title'],
        content: req.body['content']
    };

    //append on database

    //redirect to '/', sending message
});


module.exports = router;
