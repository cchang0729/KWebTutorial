var express = require('express');
var router = express.Router();
var Client = require('mariasql');
var dbconfig = require('../config/dbconfig');
var navParam = require('./../src/headerParam');
var passport = require('passport');
var path = require('path');
var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
    destination : function(req, file, cb){cb(null, './public/upload/');},
    filename : function(req, file, cb){cb(null, new Date().getTime().toString()+"-"+ file.originalname);}
});
var uploader = multer({storage:storage}).single('upload-files');

//show all
router.get('/', function(req, res, next) {
    var client = new Client(dbconfig);
    client.query("select * from boards", function(err, rows){
        //console.log(rows);
        if(err)
            throw err;
        var renderParam = navParam('/questions');
        renderParam.rows = rows;
        res.render('questions', renderParam);
    });
    client.end();
});

router.get('/new', function(req, res, next) {
    res.render('question-upload', navParam('/questions'));
});

/* GET board, require authentication. */
router.get('/:id([0-9]+$)', function(req, res, next) {
    //connect to database
    var id = req.params.id;
    var c = new Client(dbconfig);

    c.query("select * from boards where id="+id, function(err, rows){
        var renderParam = navParam('/questions');
        renderParam.rows = rows[0];
        res.render('question', renderParam);
    });
    c.end();
});

/* GET board, require authentication. */
router.get('/:id/delete', function(req, res, next){
    if(!req.user) res.redirect('../login');    //if not login state
    else next();                            //if login state
    }, function(req, res, next) {
    //connect to database
    var id = req.params.id;
    var c = new Client(dbconfig);
    c.query("select * FROM `openholo`.`boards` WHERE `id`=" + id.toString(), function(err, rows){
        if(rows.info.numRows > 0){      //file remove
            if(rows[0].filename!=="_"){
                var filepath = path.resolve('./public/upload/' + rows[0].filename);
                fs.stat(filepath, function(err, stats){
                    if(err) { throw err; }
                    fs.unlink(filepath, function(err){
                        if(err) throw err
                    });
                });
            }
        }
    });
    //delete operation in database!1
    c.query("DELETE FROM `openholo`.`boards` WHERE `id`=" + id.toString(), function(err, rows){
        if(err)
            throw err;
        res.redirect('../../questions');
    });
    c.end();
});

/* download file-> use ajax */
router.get('/download/:filename', function(req, res, next){
    // if(!req.user) res.redirect('../../login');    //if not login state
    // else next();                            //if login state
    next();
    if(req.params.filename === "_"){
        res.end();  //error check need
    }
}, function(req, res, next) {
    //connect to database
    res.download(path.resolve('public/upload/' + req.params.filename));
});

/* post on board ==> append to database and redirect to home*/
router.post('/', uploader, function(req, res, next){
    var filename;
    if(req.file) filename = req.file.filename;
    else filename = "_";
    //load data from req
    var date = new Date();
    var row = {
        username: req.body['name'],
        title: req.body['title'],
        contents: req.body['contents'],
        filename: filename,
        date: date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate().toString()
    };
    // console.log(dbQuery);
    //connect to database
    var client = new Client(dbconfig);
    var prep = client.prepare("INSERT INTO `openholo`.`boards` (`name`, `title`, `contents`, `filename`, `date`) " +
        "VALUES (:username, :title, :contents, :filename, :date);");

    console.log(prep(row));
    client.query( prep(row), function(err, rows){
        if(err)
            throw err;
        res.redirect('../questions');
    });
    client.end();
});


module.exports = router;
