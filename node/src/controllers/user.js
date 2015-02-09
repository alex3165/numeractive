'use strict';

var db = require('../services/db');
// var jwt = require('jwt-simple');
var sha1 = require('sha1');
var authService = require('../services/auth');

// var secret = '_G73l45n8X54xXx';

exports.login = function(req, res) {

    var user = {
        login: req.body.login,
        password: sha1(req.body.password)
    };

    db.getConnection(function(err, db) {
        if (!err) {
            db.query('SELECT * FROM users WHERE login = ?', user.login, function(err, rows) {
                if (!err) {
                    if (rows.length == 0) {
                        console.log("401");
                        res.send(401);
                    } else if (user.password == rows[0].mdp) {
                        res.send(200, {
                            token: authService.createToken(rows[0].login),
                            userid: rows[0].id
                        });
                    }
                } else {
                    console.log('error: ' + err);
                    res.send(500);
                }
                db.release();
            });
        } else {
            console.log('error: ' + err);
            res.send(500);
        }
    });
};

exports.users = function(req, res) {
    db.getConnection(function(err, db) {
        if (!err) {
            db.query('SELECT * FROM users', function(err, rows) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({
                        posts: rows
                    });
                }
                db.release();
            });
        } else {
            res.send(err);
        }
    });
};

exports.user = function(req, res) {
    var login = req.param('login');
    db.getConnection(function(err, db) {
        if (!err) {
            db.query('SELECT * FROM users WHERE login=?', login, function(err, rows) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({
                        posts: rows
                    });
                }
                db.release();
            });
        } else {
            res.send(err);
        }
    });
};