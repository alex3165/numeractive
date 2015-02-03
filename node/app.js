'use strict';

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var routes  = require('./src/config/routes');


var app = express();
routes(app);

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/src/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.listen(8080);
