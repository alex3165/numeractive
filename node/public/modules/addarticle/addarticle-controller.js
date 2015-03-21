define(function(require, exports, module) {

    'use strict';

    function AddArticleController($scope, $rootScope, $state, AuthService, article, categories, AddArticleService) {
        $scope.categories = categories;

        $scope.$watch('files', function () {
            $scope.upload($scope.files);
        });

        $scope.upload = AddArticleService.upload;

        if ($rootScope.user.islogged) {
            $scope.submit = function(){
                article.userid = $rootScope.user.userid;
                article.userlogin = $rootScope.user.login;
                article.title = $scope.title;
                article.categorie = $('select').find(':selected').data('category-id');
                article.text = $scope.text;
                AddArticleService.insertArticle(article);
                $state.go('home');
            }
        }else{
            console.log('User not logged');
            $state.go('home');
        }
    }

    AddArticleController.$inject = ['$scope', '$rootScope', '$state', 'AuthService', 'article', 'categories', 'AddArticleService', '$upload'];

    module.exports = AddArticleController;
});