'use strict';

var db = require('../routes/db');

exports.posts = function(req, res) {
    var posts = [];
    db.getConnection(function(err, db) {
        if (!err) {
            db.query('SELECT * FROM posts JOIN categories ON posts.id_cat = categories.id_cat', function(err, rows) {
                if (err) {
                    res.send(err);
                } else {
                    rows.forEach(function(post, i) {
                        posts.push({
                            id: post.id,
                            title: post.title,
                            text: post.text.substr(0, 300) + ' ...',
                            category: post.type,
                            colorcat: post.color,
                            img: post.img,
                            creationDate: post.creation
                        });
                    });
                    res.send(posts);
                }
                db.release();
            });
        }else {
            res.send(err);
        }
    });
};

exports.post = function(req, res) {
    var id = req.param('id');
    db.getConnection(function(err, db) {
        if (!err) {
            db.query('SELECT * FROM posts WHERE id=?', id, function(err, rows) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({
                        id: rows[0].id,
                        title: rows[0].title,
                        text: rows[0].text,
                        category: rows[0].type,
                        img: rows[0].img,
                        creationDate: rows[0].creation
                    });
                }
                db.release();
            });
        } else {
            res.send(err);
        }
    });
};

exports.addPost = function(req, res) {

    var newpost = {
        title: req.body.title,
        text: req.body.text,
        img: req.body.img,
        id_cat: req.body.categorie,
        id_user: req.body.userid
    };
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
            db.query('INSERT INTO posts SET ?', newpost, function(err, rows) {
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

exports.editPost = function(req, res) {

    var id = req.params.id;

    var newpost = {
        title: req.body.title,
        text: req.body.text,
        img: req.body.img,
        id_cat: req.body.categorie,
        id_user: req.body.userid
    };

    db.getConnection(function(err, db) {
        if (!err) {
            db.query('UPDATE posts set ? WHERE id=?', [newpost, id], function(err, rows) {
                console.log(rows);
                if (err) {
                    res.send(404, {
                        status: "Error"
                    });
                } else {
                    res.send({
                        status: "Success",
                        description: "Post updated"
                    });
                }
                db.release();
            });
        } else {
            res.send(404, err);
        }
    });
};

exports.deletePost = function(req, res) {
    var id = req.param('id');
    db.getConnection(function(err, db) {
        if (!err) {
            db.query('DELETE posts FROM posts WHERE id=?', id, function(err, rows) {
                if (err) {
                    res.send(404, {
                        status: "error"
                    });
                } else {
                    res.send({
                        status: "success"
                    });
                }
                db.release();
            });
        } else {
            res.send(err);
        }
    });
};