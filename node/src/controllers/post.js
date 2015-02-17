'use strict';

var db = require('../services/db');
var log = require('../services/loginfo');

var getPostQuery = {sql: 'SELECT post.id, post.title, post.text, post.creation, cat.type, cat.color, image.name, image.path ' +
                    'FROM posts AS post INNER JOIN categories AS cat INNER JOIN images AS image', nestTables: true };

function serializePost(row) {
    return {
        id: row.post.id,
        title: row.post.title,
        text: row.post.text.substr(0, 300) + ' ...',
        category: { name: row.cat.type, color: row.cat.color },
        image: { name: row.image.name, path: row.image.path },
        creationDate: row.post.creation
    }
}

function unserializePost(data) {
    return {
        title: data.title,
        text: data.text,
        id_cat: data.categorie,
        id_user: data.userid,
        id_image: data.imageid
    };
}

exports.posts = function(req, res) {
    var posts = [];
    db.getConnection(function(err, db) {
        if (!err) {
            db.query(getPostQuery, function(err, rows) {
                if (err) {
                    res.send(500, err);
                } else {
                    rows.forEach(function(row, i) {
                        posts.push(serializePost(row));
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
    var id = req.param('id');
    db.getConnection(function(err, db) {
        if (!err) {
            getPostQuery.sql += ' WHERE post.id = ?';
            db.query(getPostQuery, id, function(err, rows) {
                if (err) {
                    res.send(500, err);
                } else {
                    res.send(serializePost(rows[0]));
                }
                db.release();
            });
        } else {
            res.send(500, err);
        }
    });
};

exports.addPost = function(req, res) {

    var newpost = unserializePost(req.body);
    var user_token = req.body.token;

    db.getConnection(function(err, db) {
        if (!err && user_token) {
            try {
                var decoded = jwt.decode(user_token, app.get('jwtTokenSecret'));
                log.debug(decoded);
            } catch (err) {
                log.error(err);
                res.send(500);
            }
            db.query('INSERT INTO posts SET ?', newpost, function(err, rows) {
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

exports.editPost = function(req, res) {

    var id = req.params.id;
    var newpost = unserializePost(req.body);

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
                } else {
                    res.send({
                        status: "success"
                    });
                }
                db.release();
            });
        } else {
            res.send(500, err);
        }
    });
};