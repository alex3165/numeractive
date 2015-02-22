'use strict';


var db = require('../services/db');
var log = require('../services/loginfo');
var AuthService = require('../services/auth');

/*
*
*  CATEGORIES
* 
*/

/**
*
* Return all categories
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
                            id: category.id,
                            type: category.type
                        });
                    });
                    res.send(200, categories);
                }
                db.release();
            });
        } else {
            res.send(err);
        }
    });
};

/**
*
* Return category from id
*
*/
exports.category = function(req, res) {
    var id_cat = req.param('id');
    var posts = [];

    db.getConnection(function(err, db) {
        if (!err) {
            db.query('SELECT * FROM posts WHERE id = ?', id_cat, function(err, rows) {
                if (err) {
                    res.send(500, err);
                } else {
                    rows.forEach(function(post, i) {
                        posts.push({
                            id: post.id,
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

/**
*
* Add a category to the database
*
*/
exports.addCategory = function(req, res) {

    var newCategory = {
        type: req.body.type,
        color: req.body.color
    };

    db.getConnection(function(err, db) {
        if (!err) {
            db.query('INSERT INTO categories SET ?', newCategory, function(err, rows) {
                if (err) {
                    log.error(err);
                    res.send(500);
                } else {
                    res.send(200);
                }
                db.release();
            });
        } else {
            log.error(err);
            res.send(500);
        }
    });
};

/**
*
* Delete category from the database
*
*/
exports.deleteCategory = function(req, res) {
    var id = parseInt(req.params.id);

    db.getConnection(function(err, db){
        if (!err) {
            db.query('DELETE categories FROM categories WHERE id=?', id, function(err, rows){
                if (!err) {
                    res.send({
                        status: 'success',
                        description: 'Category deleted'
                    });
                }else {
                    if (err.code === "ER_ROW_IS_REFERENCED_") {
                        res.send(200, {
                            status: 'impossible',
                            description: 'Impossible de supprimer la catégorie car elle contient des articles'
                        });
                    }else {
                        res.send(404, {
                            status: 'error 1',
                            description: err
                        });
                    }
                }
                db.release();
            });
        }else{
            res.send(404, {
                status: 'error 2',
                description: err
            });
        }
    });
};

/**
*
* Edit category from the database
*
*/
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