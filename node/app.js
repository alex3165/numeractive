'use strict';

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var routes  = require('./src/config/routes');
var chalk = require('chalk');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

routes(app);

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/src/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

app.listen(8080);

/**
*
*
*	App start logs
*
*/

console.log(chalk.green('Application start'));