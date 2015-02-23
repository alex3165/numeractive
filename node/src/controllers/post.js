'use strict';

var db = require('../services/db');
var log = require('../services/loginfo');
var AuthService = require('../services/auth');
var moment = require('moment');
var extend = require('util')._extend;

var postQuery = {
    sql: 'SELECT post.id, post.title, post.text, post.creation, cat.type, cat.color, image.name, image.path ' + 'FROM posts AS post INNER JOIN categories AS cat ON post.id_cat = cat.id INNER JOIN images AS image ON post.id_image = image.id ',
    nestTables: true
};

function serialize(row) {
    return {
        id: row.post.id,
        title: row.post.title,
        text: row.post.text.substr(0, 300) + ' ...',
        category: {
            name: row.cat.type,
            color: row.cat.color
        },
        image: {
            name: row.image.name,
            path: row.image.path
        },
        // user: {
        //     id: row.id_user,
        //     name: row.name
        // },
        creationDate: row.post.creation
    }
}

function unserialize(data) {
    return {
        title: data.title,
        text: data.text,
        id_cat: data.categorie,
        id_user: data.userid,
        id_image: data.imageid,
        creation: moment().format()
    };
}

exports.posts = function(req, res) {
    var posts = [];

    db.getConnection(function(err, db) {
        if (!err) {
            db.query(postQuery, function(err, rows) {
                if (err) {
                    res.send(500, err);
                } else {
                    rows.forEach(function(row, i) {
                        posts.push(serialize(row));
                    });
                    res.send(posts);
                }
                db.release();
            });
        }else {
            res.send(500, err);
        }
    });
};

exports.post = function(req, res) {
    var postId = req.param('id');

    db.getConnection(function(err, db) {
        if (!err) {
            var query = extend({}, postQuery);
            query.sql += ' WHERE post.id = ?';
            console.log(query);
            db.query(query, postId, function(err, rows) {
                if (err) {
                    res.send(500, err);
                } else if (rows.length == 0) {
                    res.send(404);
                } else {
                    db.query('UPDATE posts SET views=views+1 WHERE id=?', postId);
                    res.send(serialize(rows[0]));
                }
                db.release();
            });
        } else {
            res.send(500, err);
        }
    });
};

exports.addPost = function(req, res) {
    var newpost = unserialize(req.body);

    db.getConnection(function(err, db) {
        if (!err) {
            db.query('INSERT INTO posts SET ?', newpost, function(err, rows) {
                if (err) {
                    log.error(err);
                    res.send(500, {
                        status: 'Bad request'
                    });
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

exports.editPost = function(req, res) {
    var id = req.params.id;
    var newpost = unserialize(req.body);

    db.getConnection(function(err, db) {
        if (!err) {
            db.query('UPDATE posts SET ? WHERE id = ?', [newpost, id], function(err, rows) {
                log.debug(rows);
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
            db.query('DELETE FROM posts WHERE id = ?', id, function(err, rows) {
                if (err) {
                    res.send(404, {
                        status: "error"
                    });
                }else {
                    res.send({
                        status: "success"
                    });
                }
                db.release();
            });
        }else {
            res.send(500, err);
        }
    });
};