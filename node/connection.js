var mysql = require('mysql');

exports.connection = mysql.createConnection({
    host : 'localhost',
    port : '8889',
    user : 'root',
    password : 'root',
    database : 'numeractive'
});