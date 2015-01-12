'use strict';

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var routes = require('./routes');

var post = require('./controllers/post');
var category = require('./controllers/category');
var user = require('./controllers/user');

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.listen(8080);

app.get('/', routes.index);
app.get('/partials/:page', routes.partials);

/************ API ******************/
app.post('/api/login', user.login); // try login and password connection 

/* posts */
app.get('/api/posts', post.posts); // Get all posts
app.get('/api/post/:id', post.post); // Get post from id
app.post('/api/post', post.addPost); // Add post 
app.put('/api/post/:id', post.editPost); // Edit post with id and news params
app.delete('/api/post/:id', post.deletePost); // delete post with id

/* categories */
app.get('/api/categories', category.categories); // Get all categories
app.get('/api/category/:id', category.category); // Get selected categorie
app.post('/api/category', category.addCategory);
app.delete('/api/category/:id', category.deleteCategory);
// app.put('/api/category/:id', api.editCategory);


/* Users */
app.get('/api/users', user.users); // Get all users
app.get('/api/user/:login', user.user); // Get user with specific id
/*********** API END ****************/