define(function(require, exports, module) {

    'use strict';

    function ArticleController($scope, post, $sce, ArticleService, $state) {
        post.creationDate = post.creationDate.substr(0, 10);
        $scope.post = post;
        
        $scope.removeAction = function() {
            ArticleService.removeArticle($scope.post.id).success(function(res, status, headers){
                console.log(res);
                $state.go('categories.home');
            }).error(function(err){
                console.log(err);
            });;
        }

        $scope.fullhtmlarticle = function() {
          return $sce.trustAsHtml($scope.post.text);
        }
    }

    ArticleController.$inject = ['$scope', 'post', '$sce', 'ArticleService', '$state'];

    module.exports = ArticleController;
});