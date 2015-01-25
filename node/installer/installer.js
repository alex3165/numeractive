var mysql = require('mysql');
var prompt = require('prompt');
var jf = require('jsonfile');
var fs = require('fs');

var NumeractiveInstaller = {};

module['exports'] = NumeractiveInstaller;

/**
 * @property databaseConfig
 * @type {{}}
 */
var databaseConfig = {};

/**
 * mysql connexion
 * @property connexion
 * @type {Connection}
 */
var connection;

/**
 * Path to mysql dump
 * @type {string}
 */
var sqlFile = '../db/numeractive.sql';

/**
 * Path to store mysql config file
 * @type {string}
 */
var configFile = 'config/db.json';


/**
 * Run full configuration
 */
NumeractiveInstaller.run = function(){
    this.promptConfiguration(function () {
            NumeractiveInstaller.writeDbFile();
            NumeractiveInstaller.mysqlInstall();
        }
    );
}

/**
 * Ask user for mysql connexion parameters and populate them in database config.
 * @param next callback
 */
NumeractiveInstaller.promptConfiguration = function (next) {

    console.log("Welcome to Numeractive installer!")
    console.log();
    console.log("Let's configure the database")
    console.log();
    console.log("Blank value will be replaced by default:")
    console.log("host:      localhost")
    console.log("port:      3306")
    console.log("user:      root")
    console.log("password:")
    console.log("database:  numeractive")
    console.log();

    prompt.message = "Database configuration";
    prompt.get(['host', 'port', 'user', 'password', 'database'], function (err, result) {
        if (err) {
            return console.log(err);
        }
        prompt.start();
        //populating user answer to databaseConfig
        databaseConfig = {
            host: result.host,
            port: result.port,
            user: result.user,
            password: result.password,
            database: result.database
        };

        //default configuration if blank.
        if (databaseConfig.host.length === 0) {
            databaseConfig.host = "localhost";
        }

        if (databaseConfig.port.length === 0) {
            databaseConfig.port = "3306";
        }

        if (databaseConfig.user.length === 0) {
            databaseConfig.user = "root";
        }


        if (databaseConfig.password.length === 0) {
            databaseConfig.password = "";
        }


        if (databaseConfig.database.length === 0) {
            databaseConfig.database = "numeractive";
        }

        //launch callback
        next();
    });
};

/**
 * Save database configuration in file
 */
NumeractiveInstaller.writeDbFile = function () {
    console.log('Writing config file...');
    jf.writeFileSync(configFile, databaseConfig);
    console.log('Config file is ready');
    console.log();

};

/**
 * Import mysqlfile to database
 */
NumeractiveInstaller.mysqlInstall = function () {
    console.log("Do you want to import database diagram and standard content? ALL previous data in database will be erased ")
    console.log();

    prompt.message = "Y/n";

    prompt.get(['answer'], function (err, result) {
        if (err) {
            return console.log(err);
        }
        if(result.answer=="n" || result.answer=="N"){
            return;
        }
        connection = mysql.createConnection({
            host: databaseConfig.host,
            port: databaseConfig.port,
            user: databaseConfig.user,
            password: databaseConfig.password
        });

        connection.connect();
        console.log('SQL on the way...');

        //Drop database
        connection.query("DROP DATABASE IF EXISTS " + databaseConfig.database, function (err, rows, fields) {
            if (err) throw err;
        });

        //Create database
        connection.query("CREATE DATABASE IF NOT EXISTS " + databaseConfig.database, function (err, rows, fields) {
            if (err) throw err;
        });

        //Select database for insertion
        connection.query("USE " + databaseConfig.database, function (err, rows, fields) {
            if (err) throw err;
        });

        //import dump
        NumeractiveInstaller.processSqlFile();

        console.log('Database is ready');
        console.log('Next steps:');
        console.log('_Install forever globally (npm install forever -g) ');
        console.log('_Launch server (forever -w app.js');
        console.log('_Try it! (localhost:8080)');
        connection.end();
    });
}

/**
 * Import dump to mysql
 */
NumeractiveInstaller.processSqlFile = function(){
    var data = fs.readFileSync(sqlFile, 'utf8').toString();
    var sqlArray = data.split(";");
    console.log("Importing diagram and stuff...")
    sqlArray.forEach(function (item) {
        if (item.replace(/(\r\n|\n|\r)/gm,"").trim().length !== 0) {
            connection.query(item, function (err) {
                if (err) {
                    console.log(err);
                }
            })
        }
    });
}