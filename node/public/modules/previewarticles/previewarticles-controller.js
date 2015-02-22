define(function(require, exports, module) {

    'use strict';

    function PreviewArticlesController($scope, posts, $state, $sce, $rootScope) {
        for(var post in posts){
            posts[post].creationDate = posts[post].creationDate.substr(0, 10);
        }
        $scope.posts = posts;
    }

    PreviewArticlesController.$inject = ['$scope', 'posts', '$state', '$sce', '$rootScope'];

    module.exports = PreviewArticlesController;
});