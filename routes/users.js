/**
 * Created by changyoung on 17. 9. 19.
 */

var express = require('express');
var router = express.Router();
var Client = require('mariasql');
var path = require('path');

/* GET user */
router.get('/', function(req, res, next){
    var data = {};
    var c = new Client({
        host : 'localhost',
        db : 'openholo',
        user : 'keti',
        password : 'keti'
    });

    c.query("select * from users", function(err, rows){
        console.log(rows);
        data = rows;
        res.render('users', {rows:data});
    });


    c.end();
});

/* POST user */
router.post('/', function(req, res, next){
    //connect to database
    var c = new Client({
        host : 'localhost',
        db : 'openholo',
        user : 'keti',
        password : 'keti'
    });

    //load data from req
    var rows = {
        name: req.body['name'],
        email: req.body['email'],
        affiliation: req.body['affiliation'],
        message: req.body['message']
    };

    //append on database
    c.query("INSERT INTO users VALUES('" + rows.name + "', '" + rows.email + "', '" + rows.affiliation + "', '" + rows.message + "')", function(err, row){
        if(err)
            throw err;
    });

    //redirect to '/', sending message
    c.end();
    res.send('Success');
});

/* download information as csv file */
router.get('/download', function(req, res, next){
    var filename = path.resolve('data/users.csv');
    res.download(filename);
});

module.exports = router;
