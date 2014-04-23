var data = {
    "posts": [{
        "title": "Qui frappuccino trifecta to go milk,",
        "text": "Extraction skinny, sweet plunger pot wings turkish saucer single shot cappuccino, fair trade coffee as in, mazagran, caramelization cortado est acerbic cortado roast sit siphon. Siphon fair trade, est filter est siphon extraction instant crema, cup, shop, aged sugar to go filter variety at roast seasonal barista seasonal. Macchiato, half and half iced medium chicory single shot, whipped, galão, strong aromatic, a bar milk americano plunger pot. Carajillo half and half sweet et cappuccino est chicory, steamed aftertaste instant in spoon rich spoon galão frappuccino, organic, café au lait in shop dripper eu steamed. Blue mountain instant, as roast extraction arabica brewed cup, body iced, pumpkin spice to go id organic frappuccino caffeine percolator cup qui percolator cream.",
        "category": 3,
        "img": "images/img2.png",
        "creationDate": "24 juillet 2013"
    }, {
        "title": "Skinny, coffee aromatic, acerbic crema eu acerbic single shot",
        "text": "Aromatic, sit french press cinnamon, aftertaste java aroma and, dripper variety qui to go, at to go affogato macchiato extra carajillo saucer affogato con panna. Grounds, frappuccino cinnamon turkish espresso filter seasonal, so whipped, spoon to go that aromatic flavour. Spoon trifecta latte, flavour macchiato brewed strong so whipped spoon acerbic mocha rich. Milk, cream seasonal decaffeinated fair trade et robust to go grounds, extra galão, mocha latte cup, aged shop beans, cortado crema macchiato mocha steamed.",
        "category": 0,
        "img": "images/img1.jpg",
        "creationDate": " 38 decembre 8999"
    }]
};


var datacat = {
    "categories": [{
        "type": "programmation"
    }, {
        "type": "design"
    }, {
        "type": "creative coding"
    }, {
        "type": "vie quotidienne"
    }]
};
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'numeractive',
    password : '89906311',
    database : 'numeractive'
});
//var app = require('../app');


/*  POST PART OF APPI  */

exports.posts = function(req, res) {
    var posts = [];
    data.posts.forEach(function(post, i) {
        posts.push({
            id: i,
            title: post.title,
            text: post.text.substr(0, 300) + ' ...',
            category: post.category,
            img: post.img,
            creationDate: post.creationDate
        });
    });
    res.send(posts);
};

exports.post = function(req, res) {
    var id = req.param.id;
    if (id >= 0 && id < data.posts.length)
        res.send(data.posts[req.param.id]);
    else
        res.send(404, {
            status: "error"
        });
};

exports.addPost = function(req, res) {
    data.posts.push(req.body);
    res.send(404, {
        status: "ok"
    });
};

exports.editPost = function(req, res) {
    var id = req.params.id;
    if (id >= 0 && id < data.posts.length) {
        data.posts[id] = req.body;
        res.send({
            status: "ok"
        });
    } else
        res.send(404, {
            status: "error"
        });
};

exports.deletePost = function(req, res) {
    var id = req.params.id;
    if (id >= 0 && id < data.posts.length) {
        data.posts.splice(id, 1);
        res.send({
            status: "ok"
        });
    } else
        res.send(404, {
            status: "error"
        });
};



/*  CATEGORY PART OF APPI  */

exports.categories = function(req, res) {
    var categories = [];
    datacat.categories.forEach(function(category, i) {
        categories.push({
            id: i,
            type: category.type
        });
    });
    res.send(categories);
};

exports.category = function(req, res) {
    var id = req.params.id;
    var posts = [];
    if (id >= 0 && id < datacat.categories.length) {
        data.posts.forEach(function(post, i) {
            if (post.category == id)
                posts.push({
                    id: i,
                    title: post.title,
                    text: post.text.substr(0, 300) + ' ...',
                    category: post.category,
                    img: post.img,
                    creationDate: post.creationDate
                });
        });
        res.send(posts);
    } else
        res.send(404, {
            status: "error"
        });
};

exports.addCategory = function(req, res) {
    datacat.categories.push(req.body);
    res.send({
        status: "ok"
    });
};

exports.editCategory = function(req, res) {
    var id = req.params.id;
    if (id >= 0 && id < datacat.categories.length) {
        datacat.categories[id] = req.body;
        res.send({
            status: "ok"
        });
    } else
        res.send(404, {
            status: "error"
        });
};

exports.deleteCategory = function(req, res) {
    var id = req.params.id;
    if (id >= 0 && id < datacat.categories.length) {
        datacat.categories.splice(id, 1);
        res.send({
            status: "ok"
        });
    } else
        res.send(404, {
            status: "error"
        });
};


exports.users = function(req, res) {
    connection.connect();
    connection.query('SELECT * FROM users', function(err, rows){
        if (err) {
            res.send(err);
        }else{
            res.send({posts : rows});
        }
    });
    connection.end();
};

exports.users = function(req, res) {
    var login = req.params.login;

    
    connection.query('SELECT * FROM users WHERE login ', function(err, rows){
        if (err) {
            res.send(err);
        }else{
            res.send({posts : rows});
        }
    });
    //connection.end();
};
