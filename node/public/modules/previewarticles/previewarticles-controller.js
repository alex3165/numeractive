define(function(require, exports, module) {

    'use strict';

    function PreviewArticlesController($scope, posts, user, AuthService, $state, $sce) {
        $scope.user = user;
        for(var post in posts){
            posts[post].creationDate = posts[post].creationDate.substr(0, 10);
        }
        $scope.posts = posts;
    }

    PreviewArticlesController.$inject = ['$scope', 'posts', 'user', 'AuthService', '$state', '$sce'];

    module.exports = PreviewArticlesController;
});