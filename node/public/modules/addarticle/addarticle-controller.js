define(function(require, exports, module) {

    'use strict';

    function AddArticleController($scope, user, $state, AuthService, article, ArticleService, categories, AddArticleService) {
        $scope.categories = categories;
        if (typeof AuthService.getCookie() != "undefined") {
            user = AuthService.getCookie();
        }

        $scope.$watch('files', function () {
            $scope.upload($scope.files);
        });

        $scope.upload = AddArticleService.upload;

        if (user.islogged) {
            $scope.submit = function(){
                article.userid = user.userid;
                article.userlogin = user.login;
                article.token = user.token;
                article.title = $scope.title;
                article.img = "images/img1.jpg";
                article.categorie = $scope;
                article.text = $scope.text;
                ArticleService.addArticle(article);
                $state.go('categories.home');
            }
        }else{
            $state.go('categories.home');
        }
    }

    AddArticleController.$inject = ['$scope', 'user', '$state', 'AuthService', 'article', 'ArticleService', 'categories', 'AddArticleService', '$upload'];

    module.exports = AddArticleController;
});