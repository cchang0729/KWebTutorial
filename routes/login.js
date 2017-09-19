/**
 * Created by changyoung on 17. 9. 15.
 */

var express = require('express');
var router = express.Router();

/* get home page. */
router.get('/', function(req, res, next) {
    //show login page
    res.render('login');
});

module.exports = router;
