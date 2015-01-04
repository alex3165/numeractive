'use strict';
numApp.controller('home', ['$scope', 'posts', 'user', 'AuthService', '$state', '$sce',
    function($scope, posts, user, AuthService, $state, $sce) {
        $scope.user = user;
        for(var post in posts){
            posts[post].creationDate = posts[post].creationDate.substr(0, 10);
        }
        $scope.posts = posts;
    }
]);

numApp.controller('contact', ['$scope', 'user', 'AuthService', '$state',
    function($scope, posts, user, AuthService, $state) {
        $scope.user = user;
    }
]);

numApp.controller('article', ['$scope', 'post', 'user', 'AuthService', '$sce',
    function($scope, post, user, AuthService, $sce) {
        if (typeof AuthService.getCookie() != "undefined") {
            user = AuthService.getCookie();
        }
        $scope.user = user;
        post.creationDate = post.creationDate.substr(0, 10);
        $scope.post = post;
        $scope.fullhtmlarticle = function() {
          return $sce.trustAsHtml($scope.post.text);
        }
    }
]);

numApp.controller('newArticle', ['$scope', 'user', '$state', 'AuthService', 'article', 'ArticleService',
    function($scope, user, $state, AuthService, article, ArticleService) {
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
                article.categorie = $scope.idcat;
                article.text = $scope.text;
                ArticleService.addArticle(article);
                $state.go('categories.home');
            }
        }else{
            $state.go('categories.home');
        }
    }
]);

numApp.controller('loginController', ['$scope', '$http', '$rootScope', 'AUTH_EVENTS', 'AuthService', '$state', '$alert', 'user',
    function($scope, $http, $rootScope, AUTH_EVENTS, AuthService, $state, $alert, user) {
        if (typeof AuthService.getCookie() != "undefined") {
            user = AuthService.getCookie();
        }
        if (user.islogged) {
            $state.go('categories.home');
        }
        $scope.credentials = {
            login: '',
            mdp: ''
        };
        $scope.login = function(credentials) {
            AuthService.login(credentials).then(function() {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $state.go('categories.home', null, { reload: true });
            }, function() {
                $alert({
                    content: 'Mauvais login ou mot de passe.',
                    container: '#alerts-container',
                    type: 'danger',
                    duration: 1,
                    show: true
                });
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };
    }
]);

numApp.controller('adminController', ['$scope', 'user', 'AuthService', '$state',
    function($scope, user, AuthService, $state) {
        if (typeof AuthService.getCookie() != "undefined") {
            user = AuthService.getCookie();
        }
        $scope.user = user;
        $scope.disconnect = function (){
            AuthService.destroy();
            //$scope.$route.reload();
            //$state.go('categories.home');
            $state.go($state.$current, null, { reload: true });
        };
    }
]);

/******************
      SLIDER
*******************/

numApp.controller('SliderController', function($scope) {
    $scope.images = [{
        src: 'bg1.jpg',
        title: 'Pic 1'
    }, {
        src: 'bg2.jpg',
        title: 'Pic 2'
    }, {
        src: 'bg3.jpg',
        title: 'Pic 3'
    }, {
        src: 'bg4.jpg',
        title: 'Pic 4'
    }, {
        src: 'bg5.jpg',
        title: 'Pic 5'
    }];

});