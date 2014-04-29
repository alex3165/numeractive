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
    },{
        "title": "Leave dead animals as gifts climb leg sun bathe",
        "text": "Hate dog climb leg or chase imaginary bugs. Nap all day. Swat at dog sleep on keyboard yet leave dead animals as gifts so hunt anything that moves leave dead animals as gifts or intrigued by the shower chase imaginary bugs. Hate dog destroy couch and need to chase tail. Stick butt in face destroy couch for leave hair everywhere and shake treat bag chew iPad power cord for throwup on your pillow for missing until dinner time. Chase imaginary bugs.",
        "category": 3,
        "img": "images/img5.jpg",
        "creationDate": " 78 aout 1111"
    },{
        "title": "Mark territory hide when guests come over flop over so stretch leave dead animals as gifts",
        "text": "Rub face on everything intently stare at the same spot so claw drapes and mark territory but need to chase tail use lap as chair. Why must they do that swat at dog. Climb leg stick butt in face yet intently sniff hand but flop over for play time find something else more interesting. Chew iPad power cord climb leg under the bed chew foot leave dead animals as gifts chase imaginary bugs hopped up on goofballs. Inspect anything brought into the house climb leg for give attitude yet hunt anything that moves inspect anything brought into the house but stick butt in face.",
        "category": 1,
        "img": "images/img4.jpg",
        "creationDate": " 20 septembre 2010"
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


exports.db = function(req, res){
    
    db.getConnection(function(err,db){
        if (!err) {
            db.query('SELECT * FROM posts',function(err,rows){
                if (err) {
                    res.send(err);
                }else{
                    res.send({posts : rows});
                }
                db.end();
            });
        }
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


    connection.connect();
    connection.query('SELECT * FROM users WHERE login ', function(err, rows){
        if (err) {
            res.send(err);
        }else{
            res.send({posts : rows});
        }
    });
    connection.end();
};
