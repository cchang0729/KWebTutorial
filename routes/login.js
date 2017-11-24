/**
 * Created by changyoung on 17. 9. 15.
 */

var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');
var MariaClient = require('mariasql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        var client = new MariaClient(dbconfig);
        var prep = client.prepare('SELECT * FROM users WHERE username = :username');
        client.query(prep({username: username}), function(err, user){
            console.log(user);
            if(err) {
                return done(err);
            } else if (user.info.numRows === '0') {
                return done(null, false);
            } else {
                if(user[0].password !== password) {
                    return done(null, false);
                }
                return done(null, user[0]);
            }
        });
        client.close();
    }
));

/* get home page. */
router.get('/', function(req, res, next) {
    //show login page
    if(req.user)    //if already in, logout
    {
        req.session.destroy();
        res.clearCookie('_id');
        res.clearCookie('username');
        res.clearCookie('password');
        res.redirect('/');
    }
    else {
        res.render('login');
    }
});

router.post('/', passport.authenticate('local', {successRedirect : '/', failureRedirect: '/login', failureFlash: true}));
module.exports = router;
