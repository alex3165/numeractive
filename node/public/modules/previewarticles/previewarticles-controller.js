define(function(require, exports, module) {

    'use strict';

    function PreviewArticlesController($scope, posts, user, AuthService, $state, $sce) {
        // $scope.categories = categories;
        if (typeof AuthService.getCookie() != "undefined") {
            user = AuthService.getCookie();
        }

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

    PreviewArticlesController.$inject = ['$scope', 'posts', 'user', 'AuthService', '$state', '$sce'];

    module.exports = PreviewArticlesController;
});