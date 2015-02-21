define(function(require, exports, module) {

    'use strict';

    function AddArticleController($scope, user, $state, AuthService, article, categories, AddArticleService) {
        $scope.categories = categories;
        debugger;
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
                article.title = $scope.title;
                article.categorie = $scope.categorySelected;
                article.text = $scope.text;
                AddArticleService.insertArticle(article);
                //$state.go('categories.home');
            }
        }else{
            console.log('User not logged');
            //$state.go('categories.home');
        }
    }

    AddArticleController.$inject = ['$scope', 'user', '$state', 'AuthService', 'article', 'categories', 'AddArticleService', '$upload'];

    module.exports = AddArticleController;
});