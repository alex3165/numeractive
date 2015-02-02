define(function(require, exports, module) {

    'use strict';

    var NumeractiveApplication = require('app');

    module.exports = NumeractiveApplication.controller('contact', ['$scope', 'user', 'AuthService', '$state',
	    function($scope, posts, user, AuthService, $state) {

	        $scope.user = user;
	        
	    }
	]);
});



