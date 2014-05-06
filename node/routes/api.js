var db = require('./db');


/* Login for API */

exports.login = function(req, res){
    var user = {
        login : req.query.login,
        mdp : req.query.mdp
    };
    db.getConnection(function(err,db){
        if (!err) {
            db.query('SELECT * FROM users WHERE login=?',user.login ,function(err,rows){
                if (!err) {
                    console.log(rows);
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
};


/*  POST PART OF APPI  */

exports.posts = function(req, res) {
    var posts = [];
    db.getConnection(function(err,db){
        if (!err) {
            db.query('SELECT * FROM posts JOIN categories ON posts.id_cat = categories.id_cat',function(err,rows){
                if (err) {
                    res.send(err);
                }else{
                    rows.forEach(function(post, i) {
                        posts.push({
                            id: i,
                            title: post.title,
                            text: post.text.substr(0, 300) + ' ...',
                            category: post.type,
                            colorcat: post.color,
                            img: post.img,
                            creationDate: post.creation
                        });
                    });
                    //console.log(posts);
                    res.send(posts);
                }
                db.end();
            });
        }
    });
};

exports.post = function(req, res) {
    var id = req.param('id');
    var posts = [];
    db.getConnection(function(err,db){
        if (!err) {
            db.query('SELECT * FROM posts WHERE id=?',id ,function(err,rows){
                if (err) {
                    res.send(err);
                }else{
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
                db.release();
            });
        }else{
            res.send(err);
        }
    });
};

exports.addPost = function(req, res) {
    
    var newpost = {
        title : req.body.title,
        text : req.body.text,
        img : req.body.img,
        id_cat : req.body.categorie,
        id_user : req.body.userid
    };

    db.getConnection(function(err,db){
        if (!err) {
            db.query('INSERT INTO posts SET ?',newpost ,function(err,rows){
                if (err) {
                    res.send(err);
                }else{
                    res.send({status: "success"});
                }
                db.release();
            });
        }else{
            res.send(err);
        }
    });
};

// exports.editPost = function(req, res) {
//     var id = req.params.id;
//     if (id >= 0 && id < data.posts.length) {
//         data.posts[id] = req.body;
//         res.send({
//             status: "ok"
//         });
//     } else
//         res.send(404, {
//             status: "error"
//         });
// };

// exports.deletePost = function(req, res) {
//     var id = req.params.id;
//     if (id >= 0 && id < data.posts.length) {
//         data.posts.splice(id, 1);
//         res.send({
//             status: "ok"
//         });
//     } else
//         res.send(404, {
//             status: "error"
//         });
// };



/*  CATEGORY PART OF APPI  */

exports.categories = function(req, res) {
    var categories = [];
    db.getConnection(function(err,db){
        if (!err) {
            db.query('SELECT * FROM categories' ,function(err,rows){
                if (err) {
                    res.send(err);
                }else{
                    rows.forEach(function(category, i) {
                        categories.push({
                            id: category.id_cat,
                            type: category.type
                        });
                    });
                    console.log(categories);
                    res.send(categories);
                }
                db.release();
            });
        }else{
            res.send(err);
        }
    });
};

exports.category = function(req, res) {
    var id_cat = req.param('id');
    var posts = [];
    console.log(id_cat);
    db.getConnection(function(err,db){
        if (!err) {
            db.query('SELECT * FROM posts WHERE id_cat = ?',id_cat ,function(err,rows){
                if (err) {
                    res.send(500, err);
                }else{
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
                db.end();
            });
        }else{
            res.send(500, err);
        }
    });
};

// exports.addCategory = function(req, res) {
//     datacat.categories.push(req.body);
//     res.send({
//         status: "ok"
//     });
// };

// exports.editCategory = function(req, res) {
//     var id = req.params.id;
//     if (id >= 0 && id < datacat.categories.length) {
//         datacat.categories[id] = req.body;
//         res.send({
//             status: "ok"
//         });
//     } else
//         res.send(404, {
//             status: "error"
//         });
// };

// exports.deleteCategory = function(req, res) {
//     var id = req.params.id;
//     if (id >= 0 && id < datacat.categories.length) {
//         datacat.categories.splice(id, 1);
//         res.send({
//             status: "ok"
//         });
//     } else
//         res.send(404, {
//             status: "error"
//         });
// };


exports.users = function(req, res) {
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
};

exports.user = function (req, res){
    var login = req.param('login');
    db.getConnection(function(err,db){
        if (!err) {
            db.query('SELECT * FROM users WHERE login=?',login ,function(err,rows){
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
};
