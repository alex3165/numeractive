var mysql = require('mysql');

var pool  = mysql.createPool({
    host : 'localhost',
    port : '3306',
    user : 'numeractive',
    password : 'numeractive',
    database : 'numeractive'
});

exports.getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};