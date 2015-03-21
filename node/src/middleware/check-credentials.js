var AuthService = require('../services/auth');
var log = require('../services/loginfo');

module.exports = {
	checkAuth: function(req, res, next) {
		var user_token = req.get('Auth-Token');

		AuthService.isAuthenticated(user_token).then(function(){
			next();
		}, function(err){
			log.info('User try to log with wrong credentials');
			res.send(500, {
				status: 'error',
				description: err
			});
		});
	}
};