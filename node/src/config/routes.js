

var partials = require('../controllers/partials');
var index = require('../controllers/index');
var post = require('../controllers/post');
var category = require('../controllers/category');
var user = require('../controllers/user');

module.exports = function (app) {
    app.get('/', index.index);
    app.get('/partials/:page', partials.partials);

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
    app.put('/api/category/:id', category.editCategory);


    /* Users */
    app.get('/api/users', user.users); // Get all users
    app.get('/api/user/:login', user.user); // Get user with specific id
    /*********** API END ****************/
};

