'use strict';

var mysql = require('mysql');
var jf = require('jsonfile')
var util = require('util')

/**
 * database configuration file path
 * @type {string}
 */
var dbFilePath = "src/config/db.json";
/**
 * dbParams
 * @type {{host, port, user, password, database}}
 */
var dbParams = {};
/**
 * mysql pool
 */
var pool;

/**
 * Read database configuration from file and launch getMysqlConnection
 * @param dbFilePath
 * @param callback
 */
var InitMysqlConnexion =function(dbFilePath, callback){
    jf.readFile(dbFilePath, function(err, obj) {
        if(err){
            console.log(err);
        }
        dbParams = obj;
        getMysqlConnection(dbParams, callback);
    });
}

/**
 * Get Mysql Connection from json params
 * @param params
 * @param callback
 */
var getMysqlConnection = function(params, callback){

    pool = mysql.createPool(params);

    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
}

exports.getConnection = function(callback) {
    InitMysqlConnexion(dbFilePath, callback);
};
