var express = require('express');
var router = express.Router();
var Client = require('mariasql');
var dbconfig = require('../config/dbconfig');

//show all
router.get('/', function(req, res, next) {
    var client = new Client(dbconfig);
    client.query("select * from boards", function(err, rows){
        console.log(rows);
        if(err)
            throw err;
        res.render('boards', {rows : rows});
    });
});

router.get('/new', function(req, res, next) {
    res.render('board_new');
});

/* GET board, require authentication. */
router.get('/:id', function(req, res, next) {
    //connect to database
    var id = req.params.id;
    var c = new Client(dbconfig);

    c.query("select * from boards where id="+id, function(err, rows){
        res.render('board', {rows:rows[0]});
    });
    c.end();
});

/* GET board, require authentication. */
router.get('/:id/:method', function(req, res, next) {
    //connect to database
    var id = req.params.id;
    var is_delete = req.params.method === "delete";
    if(is_delete){
        var c = new Client(dbconfig);
        //delete operation in database!1
        c.query("DELETE FROM `openholo`.`boards` WHERE `id`=" + id.toString(), function(err, rows){
            if(err)
                throw err;
            res.redirect('/boards');
        });
    }
    c.end();
});

/* post on board ==> append to database and redirect to home*/
router.post('/', function(req, res, next){
    //load data from req
    var date = new Date();
    var row = {
        username: req.body['name'],
        title: req.body['title'],
        contents: req.body['contents'],
        date: date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate().toString()
    };
    var dbQuery = "INSERT INTO  openholo.boards (`name`, `title`, `contents`, `date`) VALUES ('"+row.username+"','"+ row.title + "','" + row.contents + "','"+ row.date + "');";    //console.log(JSON.stringify(row));
    console.log(dbQuery);
    //connect to database
    var client = new Client(dbconfig);
    client.query( dbQuery, function(err, rows){
        if(err)
            throw err;
        res.redirect('/boards');
    });
    client.end();
});


module.exports = router;
