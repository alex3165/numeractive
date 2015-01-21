'use strict';

var db = require('../routes/db');
var jwt = require('jwt-simple');

var secret = '_G73l45n8X54xXx';

exports.login = function(req, res) {
    var user = {
        login: req.body.login,
        mdp: req.body.mdp
    };
    db.getConnection(function(err, db) {
        if (!err) {
            db.query('SELECT * FROM users WHERE login = ?', user.login, function(err, rows) {
                if (!err) {
                    if (rows.length == 0) {
                        res.send(401);
                    } else if (user.mdp == rows[0].mdp) {
                        res.send(200, {
                            token: jwt.encode({
                                secret: user.login
                            }, secret),
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