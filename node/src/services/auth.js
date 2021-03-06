var jwt = require('jwt-simple');
var moment = require('moment');
var db = require('./db');
var Promise = require('promise');
var log = require('../services/loginfo');

module.exports = {
    secret: '_G73l45n8X54xXx',

    createToken: function(login) {
        var expires = moment().add(7, 'days').valueOf();

        var token = jwt.encode({
            iss: login,
            exp: expires
        }, this.secret);

        return token;
    },

    isAuthenticated: function(token) {
        var that = this;
        return new Promise(function(resolve, reject) {
            var decoded = jwt.decode(token, that.secret);
            that.hasUserPromise(decoded.iss).then(function(user) {
                resolve(user);
            }, function(err) {
                reject(err);
            });
        });
    },

    hasUserPromise: function(login) {
        return new Promise(function(resolve, reject) {
            db.getConnection(function(err, db) {
                if (!err) {
                    db.query('SELECT * FROM users WHERE login=?',login , function(err, rows) {
                        if(!err && rows.length >= 1) {
                            resolve(rows[0]);
                        }else {
                            reject(err);
                        };
                        db.release();
                    });
                }else {
		            log.error(err);
                    reject(err);
                }
            });
        });
    }
}