'use strict';

var PORT = 8080

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var routes  = require('./src/config/routes');
var log = require('./src/services/loginfo');

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

app.listen(PORT);

/**
*
*
*	App start logs
*
*/

log.info('Application start on ' + PORT);