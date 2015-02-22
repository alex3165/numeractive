'use strict';

var partials = require('../controllers/partials');
var index = require('../controllers/index');
var post = require('../controllers/post');
var category = require('../controllers/category');
var images = require('../controllers/images');
var user = require('../controllers/user');

var checkCredentialsMiddleware = require('../middleware/check-credentials');

module.exports = function (app) {
    app.get('/', index.index);
    app.get('/partials/:page', partials.partials);

    app.post('/api/login', user.login); // try login and password connection

    /* posts */
    app.get('/api/posts', post.posts); // Get all posts
    app.get('/api/post/:id', post.post); // Get post from id
    app.post('/api/post', checkCredentialsMiddleware.checkAuth, post.addPost); // Add post
    app.put('/api/post/:id', checkCredentialsMiddleware.checkAuth, post.editPost); // Edit post with id and news params
    app.delete('/api/post/:id', checkCredentialsMiddleware.checkAuth, post.deletePost); // delete post with id

    /* categories */
    app.get('/api/categories', category.categories); // Get all categories
    app.get('/api/category/:id', category.category); // Get selected categorie
    app.post('/api/category', checkCredentialsMiddleware.checkAuth, category.addCategory);
    app.delete('/api/category/:id', checkCredentialsMiddleware.checkAuth, category.deleteCategory);
    app.put('/api/category/:id', checkCredentialsMiddleware.checkAuth, category.editCategory);

    /* images */
    app.get('/api/images', images.images); // Get all images
    app.get('/api/image/:id', images.image); // Get selected image
    app.post('/api/image', checkCredentialsMiddleware.checkAuth, images.uploadImage);
    app.delete('/api/image/:id', checkCredentialsMiddleware.checkAuth, images.deleteImage);

    /* Users */
    app.get('/api/users', user.users); // Get all users
    app.get('/api/user/:login', user.user); // Get user with specific id
};

