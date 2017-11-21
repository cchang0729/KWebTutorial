var express = require('express');
var router = express.Router();
var Client = require('mariasql');


/* GET board, require authentication. */
router.get('/:id', function(req, res, next) {
    //connect to database

    var id = req.params.id;
    var c = new Client({
        host : 'localhost',
        db : 'openholo',
        user : 'keti',
        password : 'keti'
    });

    c.query("select * from boards where id="+id, function(err, rows){
        console.log(rows[0].name);
        res.render('board', {rows:rows[0]});
    });
    c.end();
});
//
// /* post on board ==> append to database and redirect to home*/
// router.post('/', function(req, res, next){
//     //load data from req
//     var row = {
//         username: req.body['username'],
//         email: req.body['email'],
//         title: req.body['title'],
//         content: req.body['content']
//     };
//     //console.log(JSON.stringify(row));
//     //connect to database
//     mongoc.connect('mongodb://127.0.0.1:27017/KETIdb', function(err, db){
//         if(err) {
//             throw err;
//         }
//         db.collection('boards').insertOne(row);
//         db.close();
//     });
//
//     //append on database
//     console.log("Successfuly inserted");
//
//     //redirect to '/', sending message
//     res.redirect('/');
// });
//
// router.delete('/:id', function(req, res, next){
//     //check authentication, or redirect to login page
//     if(req.user)
//     {
//         next();
//     } else {
//         res.redirect('/login');
//     }
// });

module.exports = router;
