/**
 * Created by changyoung on 17. 11. 1.
 */
var express = require('express');
var appAdmin = require('express-admin');

var adminConfig = {
    dpath: './express-admin-config/',
    config: require('./express-admin-config/config.json'),
    settings: require('./express-admin-config/settings.json'),
    custom: require('./express-admin-config/custom.json'),
    users: require('./express-admin-config/users.json')
};

module.exports = function(app) {
    return new Promise(function(res, rej){
    appAdmin.init(adminConfig, function (err, admin) {
        if (err) return rej(err);
        // mount express-admin before any other middlewares
        app.use('/admin', admin);
        return res(app);
    });
});};
