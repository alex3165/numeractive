exports.index = function(req, res) {
    res.render('layout');
};

exports.partials = function(req, res) {
    res.render(req.params.page);
};

exports.admin = function(req,res){
	res.render('login');
};