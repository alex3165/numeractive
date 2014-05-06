var mysql = require('mysql');

var pool  = mysql.createPool({
    host : 'localhost',
    port : '8889',
    user : 'root',
    password : 'root',
    database : 'numeractive'
});

exports.getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};