var express = require('express');
var router = express.Router();
var mongoc = require('mongodb').MongoClient;


/* GET board, require authentication. */
router.get('/', function(req, res, next){
    //check authentication, or redirect to login page
    if(req.user)
    {
        next();
    } else {
        res.redirect('/login');
    }

},function(req, res, next) {
    //connect to database
    mongoc.connect('mongodb://127.0.0.1:27017/KETIdb', function(err, db){
        if(err) {
            throw err;
        }
        var cursor = db.collection('boards').find();
        //for each element, insert to row
        cursor.toArray(function(err, docs){
            //load data from database
            //send database data with users.ejs
            res.render('boards', { rows : docs } );
        });
        db.close();

    });

});

/* post on board ==> append to database and redirect to home*/
router.post('/', function(req, res, next){
    //load data from req
    var row = {
        username: req.body['username'],
        email: req.body['email'],
        title: req.body['title'],
        content: req.body['content']
    };
    //console.log(JSON.stringify(row));
    //connect to database
    mongoc.connect('mongodb://127.0.0.1:27017/KETIdb', function(err, db){
        if(err) {
            throw err;
        }
        db.collection('boards').insertOne(row);
        db.close();
    });

    //append on database
    console.log("Successfuly inserted");

    //redirect to '/', sending message
    res.redirect('/');
});

module.exports = router;
