/**
 * Created by changyoung on 17. 9. 15.
 */

var express = require('express');
var router = express.Router();
var mongoc = require('mongodb');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        mongoc.connect('mongodb://127.0.0.1:27017/KETIdb', function(err, db) {
            db.collection('users').findOne({username: username}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (user.password !== password) {
                    return done(null, false);
                }
                return done(null, user);
            });
            db.close();
        });
    }
));
/* get home page. */
router.get('/', function(req, res, next) {
    //show login page
    if(req.user)
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
