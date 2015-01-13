'use strict';


var db = require('../routes/db');
var jwt = require('jwt-simple');

/*
*
*  CATEGORIES
* 
*/

exports.categories = function(req, res) {
    var categories = [];
    db.getConnection(function(err, db) {
        if (!err) {
            db.query('SELECT * FROM categories', function(err, rows) {
                if (err) {
                    res.send(err);
                } else {
                    rows.forEach(function(category, i) {
                        categories.push({
                            id: category.id_cat,
                            type: category.type
                        });
                    });
                    res.send(categories);
                }
                db.release();
            });
        } else {
            res.send(err);
        }
    });
};

exports.category = function(req, res) {
    var id_cat = req.param('id');
    var posts = [];
    db.getConnection(function(err, db) {
        if (!err) {
            db.query('SELECT * FROM posts WHERE id_cat = ?', id_cat, function(err, rows) {
                if (err) {
                    res.send(500, err);
                } else {
                    rows.forEach(function(post, i) {
                        posts.push({
                            id: i,
                            title: post.title,
                            text: post.text.substr(0, 300) + ' ...',
                            img: post.img,
                            creationDate: post.creation
                        });
                    });
                    res.send(posts);
                }
                db.release();
            });
        } else {
            res.send(500, err);
        }
    });
};

exports.addCategory = function(req, res) {

    var newCategory = {
        type: req.body.type,
        color: req.body.color
    };
    console.log(req.body.type);

    var user_token = req.body.token;
    db.getConnection(function(err, db) {
        if (!err && user_token) {
            try {
                var decoded = jwt.decode(user_token, app.get('jwtTokenSecret'));
                console.log(decoded);
            } catch (err) {
                console.log('error: ' + err);
                res.send(500);
            }
            db.query('INSERT INTO categories SET ?', newCategory, function(err, rows) {
                if (err) {
                    console.log('error: ' + err);
                    res.send(500);
                } else {
                    res.send(200);
                }
                db.release();
            });
        } else {
            console.log('error: ' + err);
            res.send(500);
        }
    });
};

exports.deleteCategory = function(req, res) {
    var id = req.params.id;
    db.getConnection(function(err, db){
        if (!err) {
            db.query('DELETE categories FROM categories WHERE id_cat=?', id, function(err, rows){
                if (!err) {
                    res.send({
                        status: 'success',
                        description: 'Category deleted'
                    });
                }else {
                    res.send(404, {
                        status: 'error',
                        description: err
                    });
                }
                db.release();
            });
        }else{
            res.send(404, {
                status: 'error',
                description: err
            });
        }
    });
};

exports.editCategory = function(req, res) {
    var id = req.params.id;
    var newCategory = {
        type: req.body.type,
        color: req.body.color
    };
    db.getConnection(function(err, db) {
        if (!err) {
            db.query('UPDATE categories set ? WHERE id=?', [newCategory, id], function(err, rows) {
                if (err) {
                    res.send(404, {
                        status: "Error"
                    });
                } else {
                    res.send({
                        status: "Success",
                        description: "Category updated"
                    });
                }
                db.release();
            });
        } else {
            res.send(404, err);
        }
    });
};