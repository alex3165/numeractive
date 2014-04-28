var http = require('http');
var express = require('express');
//var mysql = require('mysql');
var app = express();
var routes = require('./routes');
var api = require('./routes/api');

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

app.listen(8080);

app.get('/', routes.index);
app.get('/partials/:page', routes.partials);


var connection = require('./connection.js');

app.get('/admin', routes.admin);

/* posts */
app.get('/api/posts', api.posts);
app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);

/* categories */
app.get('/api/categories', api.categories);
app.get('/api/category/:id', api.category);
app.post('/api/category', api.addCategory);
app.put('/api/category/:id', api.editCategory);
app.delete('/api/category/:id', api.deleteCategory);

/* users */
app.get('/db',function(req, res) {
    
    connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }

      console.log('connected as id ' + connection.threadId);
    });
    connection.query('SELECT * FROM posts', function(err, rows){
        if (err) {
            res.send(err);
        }else{
            res.send({posts : rows});
        }
    });
    //connection.end();

});

app.get('/api/users', function(req, res){
    connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }

      console.log('connected as id ' + connection.threadId);
    });
    connection.query('SELECT * FROM users', function(err, rows){
        if (err) {
            res.send(err);
        }else{
            res.send({posts : rows});
        }
    });
    //connection.end();
});

app.get('/api/user/:login', function(req, res){
    var login = req.params.login;
    connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }

      console.log('connected as id ' + connection.threadId);
    });
    connection.query('SELECT * FROM users WHERE login="'+login+'"', function(err, rows){
        if (err) {
            res.send(err);
        }else{
            res.send({posts : rows});
        }
    });
    //connection.end();
});

app.post('/api/user', function(req, res){
    var user = {
        name : req.body.name,
        login : req.body.login,
        mdp : req.body.mdp
    };

    connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }

      console.log('connected as id ' + connection.threadId);
    });
    connection.query('INSERT INTO users SET ?', user, function(err, rows){
        if (err) {
            res.send(err);
        }else{
            res.send({posts : rows});
        }
    });
});

app.put('/api/user/:login', function(req, res){
    var login = req.params.login;
    var newuser = {
        name : req.body.name,
        login : req.body.login,
        mdp : req.body.mdp
    };
    connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }

      console.log('connected as id ' + connection.threadId);
    });
    connection.query('UPDATE users SET ? WHERE login="'+login+'"', newuser, function(err, rows){
        if (err) {
            res.send(err);
        }else{
            res.send({posts : rows});
        }
    });
});

app.delete('/api/category/:login', function(req, res){
    var login = req.params.login;
    connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }

      console.log('connected as id ' + connection.threadId);
    });
    connection.query('DELETE FROM users WHERE login="'+login+'"', function(err, rows){
        if (err) {
            res.send(err);
        }else{
            res.send({posts : rows});
        }
    });
});