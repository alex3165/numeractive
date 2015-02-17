'use strict';

var db = require('../services/db');
var log = require('../services/loginfo');
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
                        log.info('Someone tried to login with bad credentials... This incident will be reported (or not ?)');
                        res.send(401);
                    } else if (user.password == rows[0].mdp) {
                        res.send(200, {
                            token: authService.createToken(rows[0].login),
                            userid: rows[0].id
                        });
                    }
                } else {
                    log.error(err);
                    res.send(500);
                }
                db.release();
            });
        } else {
            log.error(err);
            res.send(500);
        }
    });
};

exports.users = function(req, res) {
    db.getConnection(function(err, db) {
        if (!err) {
            db.query('SELECT id, creation, name, login FROM users', function(err, rows) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({
                        users: rows
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
            db.query('SELECT id, creation, name, login FROM users WHERE login=?', login, function(err, rows) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({
                        user: rows
                    });
                }
                db.release();
            });
        } else {
            res.send(err);
        }
    });
};