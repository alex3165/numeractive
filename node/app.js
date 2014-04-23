var http = require('http');
var express = require('express');
var mysql = require('mysql');
var app = express();
var routes = require('./routes');
var api = require('./routes/api');

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'numeractive',
    password : '89906311',
    database : 'numeractive'
});


app.listen(8080);

app.get('/', routes.index);
app.get('/partials/:page', routes.partials);

app.get('/db',function(req, res) {
    //connection.query('USE numeractive');
    connection.connect();
    connection.query('SELECT * FROM posts', function(err, rows){
        if (err) {
            res.send(err);
        }else{
            res.send({posts : rows});
        }
    });
    connection.end();

});

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


