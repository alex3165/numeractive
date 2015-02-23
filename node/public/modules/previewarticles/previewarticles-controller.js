define(function(require, exports, module) {

    'use strict';

    var moment = require('moment');
    var momentFrSupport = require('moment-fr-support');

    function PreviewArticlesController($scope, posts, $state, $sce, $rootScope) {
    	// debugger;
    	// var input = document.getElementById("post-search");
    	// new Awesomplete(input, {
    	// 	list: "#postsTitles"
    	// });
        console.log('articles controller');
		moment.locale('fr', momentFrSupport);
        for(var post in posts){
            posts[post].creationDate = moment(posts[post].creationDate).format('LL');
        }
        $scope.posts = posts;
    }

    PreviewArticlesController.$inject = ['$scope', 'posts', '$state', '$sce', '$rootScope'];

    module.exports = PreviewArticlesController;
});