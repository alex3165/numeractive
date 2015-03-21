define(function(require, exports, module) {

    'use strict';

    var moment = require('moment');
    var momentFrSupport = require('moment-fr-support');

    function ArticleController($scope, post, $sce, ArticleService, $state) {

        moment.locale('fr', momentFrSupport);

        post.creationDate = moment(post.creationDate).format('LL');
        $scope.post = post;
        
        $scope.removeAction = function() {
            ArticleService.removeArticle($scope.post.id).success(function(res, status, headers){
                console.log(res);
                $state.go('home');
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