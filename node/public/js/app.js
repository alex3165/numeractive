var numApp = angular.module('numeractive', ['ui.router', 'ngAnimate', 'infinite-scroll', 'mgcrea.ngStrap', 'ngSanitize', 'ngCookies']);
var loading = true;

numApp.config(['$urlRouterProvider', '$stateProvider', '$provide',
    function($urlRouterProvider, $stateProvider, $provide) {
        $urlRouterProvider.otherwise('/');

        $provide.constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        });

        $stateProvider
            .state('categories', {
                abstract: true,
                templateUrl: 'partials/categories',
                resolve: {
                    categories: ['$stateParams', '$http',
                        function($stateParams, $http) {
                            return $http.get('/api/categories').then(function(res) {
                                return res.data;
                            });
                        }
                    ]
                },
                controller: function($scope, categories) {
                    $scope.categories = categories;
                }
            })
            .state('categories.home', {
                url: '/',
                templateUrl: 'partials/articles',
                resolve: {
                    posts: ['$http',
                        function($http) {
                            return $http.get('/api/posts').then(function(res) {
                                return res.data;
                            });
                        }
                    ]
                },
                controller: 'home'
            })
            .state('categories.list', {
                url: '/cat/:categoryId',
                templateUrl: 'partials/articles',
                controller: 'home',
                resolve: {
                    posts: ['$stateParams', '$http',
                        function($stateParams, $http) {
                            return $http.get('/api/category/' + $stateParams.categoryId)
                                .then(function(res) {
                                    return res.data;
                                });
                        }
                    ]
                }
            })
            .state('categories.article', {
                url: '/article/:articleId',
                templateUrl: 'partials/article',
                controller: 'article',
                resolve: {
                    post: ['$stateParams', '$http',
                        function($stateParams, $http) {
                            return $http.get('/api/post/' + $stateParams.articleId)
                                .then(function(res) {
                                    return res.data;
                                });
                        }
                    ]
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login',
                controller: 'loginController'
            })
            .state('newArticle', {
                url: '/add',
                templateUrl: 'partials/newArticle',
                controller: 'newArticle'
            });
    }
]);

// numApp.controller('categoriesMenu', ['$scope', '$http',
//     function($scope, $http) {

//     }
// ]);

numApp.controller('home', ['$scope', 'posts', 'user', '$cookieStore', 'AuthService', '$state',
    function($scope, posts, user, $cookieStore, AuthService, $state) {
        $scope.user = user;
        $scope.posts = posts;
    }
]);

numApp.controller('article', ['$scope', 'post', 'user',
    function($scope, post, user) {
        $scope.user = user;
        $scope.post = post;
        $scope.save = function() {
            alert('yolo');
        };
    }
]);

numApp.controller('newArticle', ['$scope', 'user', '$state',
    function($scope, user, $state) {
        // if (user.islogged) {
        //     //TODO
        // }else{
        //     $state.go('categories.home');
        // }
    }
]);

numApp.controller('loginController', ['$scope', '$http', '$rootScope', 'AUTH_EVENTS', 'AuthService', '$state', '$alert', 'user',
    function($scope, $http, $rootScope, AUTH_EVENTS, AuthService, $state, $alert, user) {
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
                $state.go('categories.home');
            }, function() {
                //Moche, a faire en plus joli
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

numApp.controller('adminController', ['$scope', 'user', '$cookieStore', 'AuthService', '$state',
    function($scope, user, $cookieStore, AuthService, $state) {
        if ($cookieStore.get("user") != 'undefined') {
            user = $cookieStore.get("user");
        }
        $scope.user = user;
        $scope.disconnect = function (){
            AuthService.destroy();
            $state.go('categories.home');
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
