var express = require('express');
var router = express.Router();
var mongoc = require('mongodb').MongoClient;

/* GET board, require authentication. */
router.get('/', function(req, res, next){
    //check authentication, or redirect to login page
    next();
},function(req, res, next) {
    var rows = [];
    //connect to database
    mongoc.connect('mongodb://127.0.0.1:27017/KETIdb', function(err, db){
        if(err) {
            throw err;
        }
        db.collection('boards').find().toArray(function(err, item){
             rows.push(item);
        });
        db.close();
    });

    //load data from database
    console.log(rows);
    rows = [{username:'changyoung', email:'cchang@snu.ac.kr',title:'hello world', content:'bye world'}];
    //send database data with boards.ejs
    res.render('boards', {rows:rows} );
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
    console.log(JSON.stringify(row));
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
