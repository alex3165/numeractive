var http = require('http');
var express = require('express');
var app = express();
var routes = require('./routes');
var api = require('./routes/api');
/* access to database file */
var db = require('./db');

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

app.listen(8080);

app.get('/', routes.index);
app.get('/partials/:page', routes.partials);

app.get('/admin', routes.admin);

/* posts */
//app.get('/api/posts', api.posts);
//app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);

/* categories */
app.get('/api/categories', api.categories);
app.get('/api/category/:id', api.category);
app.post('/api/category', api.addCategory);
app.put('/api/category/:id', api.editCategory);
app.delete('/api/category/:id', api.deleteCategory);

app.get('/api/login',function(req, res){
    var user = {
        login : req.query.login,
        mdp : req.query.mdp
    };
    db.getConnection(function(err,db){
        if (!err) {
            db.query('SELECT * FROM users WHERE login="'+user.login+'"',function(err,rows){
                if (!err) {
                    if (user.mdp == rows[0].mdp) {
                        res.send({status : 'success'});
                    }
                }else{
                    res.send(err);
                }
                db.end();
            });
        }else{
            res.send(err);
        }
    });
});

/* get posts using database */
app.get('/api/posts',function(req,res){
    db.getConnection(function(err,db){
        if (!err) {
            db.query('SELECT * FROM posts',function(err,rows){
                if (err) {
                    res.send(err);
                }else{
                    var posts = [];
                    rows.forEach(function(post, i) {
                        posts.push({
                            id: i,
                            title: post.title,
                            text: post.text.substr(0, 300) + ' ...',
                            category: post.id_cat,
                            img: post.img,
                            creationDate: post.creation
                        });
                    });
                    res.send(posts);
                }
                db.end();
            });
        }
    });
});
app.get('/api/post/:id', function(req, res){
    var id = req.param('id');
    db.getConnection(function(err,db){
        if (!err) {
            db.query('SELECT * FROM posts WHERE id="'+id+'"',function(err,rows){
                if (err) {
                    res.send(err);
                }else{
                    res.send({posts : rows});
                }
                db.release();
            });
        }else{
            res.send(err);
        }
    });

});

// app.post('/api/post', function(req, res){

// });
/* CRUD USER */

app.get('/api/users', function(req, res){
    db.getConnection(function(err,db){
        if (!err) {
            db.query('SELECT * FROM users',function(err,rows){
                if (err) {
                    res.send(err);
                }else{
                    res.send({posts : rows});
                }
                db.end();
            });
        }else{
            res.send(err);
        }
    });
});

app.get('/api/user/:login', function(req, res){
    var login = req.param('login');
    db.getConnection(function(err,db){
        if (!err) {
            db.query('SELECT * FROM users WHERE login="'+login+'"',function(err,rows){
                if (err) {
                    res.send(err);
                }else{
                    res.send({posts : rows});
                }
                db.end();
            });
        }else{
            res.send(err);
        }
    });
});

app.post('/api/user', function(req, res){
    var user = {
        name : req.body.name,
        login : req.body.login,
        mdp : req.body.mdp
    };
    db.getConnection(function(err,db){
        if (!err) {
            db.query('INSERT INTO users SET ?', user,function(err,rows){
                if (err) {
                    res.send(err);
                }else{
                    res.send({posts : rows});
                }
                db.end();
            });
        }else{
            res.send(err);
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
    db.getConnection(function(err,db){
        if (!err) {
            db.query('UPDATE users SET ? WHERE login="'+login+'"', newuser,function(err,rows){
                if (err) {
                    res.send(err);
                }else{
                    res.send({posts : rows});
                }
                db.end();
            });
        }else{
            res.send(err);
        }
    });

});

app.delete('/api/user/:login', function(req, res){
    var login = req.params.login;
    db.getConnection(function(err,db){
        if (!err) {
            db.query('DELETE FROM users WHERE login="'+login+'"',function(err,rows){
                if (err) {
                    res.send(err);
                }else{
                    res.send({posts : rows});
                }
                db.end();
            });
        }else{
            res.send(err);
        }
    });
});