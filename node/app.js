var http = require('http');
var express = require('express');
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

//app.get('/admin', routes.admin);

/************ API ******************/
app.get('/api/login', api.login); // try login and password connection 

/* posts */
app.get('/api/posts', api.posts); // Get all posts
app.get('/api/post/:id', api.post); // Get post from id
app.post('/api/post', api.addPost); // Add post 
// app.put('/api/post/:id', api.editPost);
// app.delete('/api/post/:id', api.deletePost);

/* categories */
app.get('/api/categories', api.categories); // Get all categories
app.get('/api/category/:id', api.category); // Get selected categorie
// app.post('/api/category', api.addCategory);
// app.put('/api/category/:id', api.editCategory);
// app.delete('/api/category/:id', api.deleteCategory);


/* Users */
app.get('/api/users', api.users); // Get all users
app.get('/api/user/:login', api.user); // Get user with specific id
/*********** API END ****************/




