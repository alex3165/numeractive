'use strict';

var db = require('../services/db');
var log = require('../services/loginfo');
var formidable = require('formidable');
var moment = require('moment');
var Promise = require('promise');
var fs = require('fs')

var imageQuery = 'SELECT * FROM images';

function serialize(row) {
    return {
    	id: row.id,
		name: row.name,
		path: row.path
    }
}

exports.images = function(req, res) {
    var images = [];
    db.getConnection(function(err, db) {
        if (!err) {
            db.query(imageQuery, function(err, rows) {
                if (err) {
                    res.send(500, err);
                } else {
                    rows.forEach(function(row, i) {
                        images.push(serialize(row));
                    });
                    res.send(images);
                }
                db.release();
            });
        }else {
            res.send(500, err);
        }
    });
};

exports.image = function(req, res) {
    var id = req.param('id');
    db.getConnection(function(err, db) {
        if (!err) {
            var query = extend({}, imageQuery);
            query += ' WHERE id = ?';
            db.query(query, id, function(err, rows) {
                if (err) {
                    res.send(500, err);
                } else if (rows.length == 0) {
                	res.send(404);
                }
                else {
                    res.send(serialize(rows[0]));
                }
                db.release();
            });
        } else {
            res.send(500, err);
        }
    });
};

exports.uploadImage = function(req, res) {
	var imageInfos = [];
    var form = new formidable.IncomingForm();
    form.uploadDir = "public/images/upload/";
    form.keepExtensions = true;
    form.multiples = false;

	form.on('fileBegin', function(name, file) {
		file.path = form.uploadDir + moment() + '_' + file.name;
	});

    form.parse(req, function(err, fields, files) {
    	if (err) {
	        log.info(err);
	        res.send(400);
	        return;
    	}
	    db.getConnection(function(err, db) {
	        if (err) {
                log.error(err);
                res.send(500);
                return;
            }
            var name = Object.keys(files)[0];
            var image = { name: name, path: files[name].path.replace(/^public\//, '')};
            db.query('INSERT INTO images SET ?', image, function(err, row) {
                if (err) {
                    db.release();
                    res.send(500);
                    return;
                }
                image.id = row.insertId;
                db.release();
                res.send(200, image);
            });
	    });
    });
};

exports.deleteImage = function(req, res) {
    var id = req.param('id');
    db.getConnection(function(err, db) {
        if (!err) {
            var query = extend({}, imageQuery);
            query += ' WHERE id = ?';
            db.query(query, id, function(err, rows) {
                if (err) {
                    res.send(500, err);
                    db.release();
                } else if (rows.length == 0) {
                	res.send(404);
                	db.release();
                }
                else {
                    fs.unlink(rows[0].path, function() {
				        db.query('DELETE FROM images WHERE id = ?', id, function(err, rows) {
		                    res.send({
		                        status: "success"
		                    });
				            db.release();
					    });
                    });
                }
            });
        } else {
            res.send(500, err);
        }
    });
};