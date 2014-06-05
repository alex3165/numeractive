var numApp = angular.module('numeractive', ['ui.router', 'ngAnimate', 'infinite-scroll']);
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
            .state('home', {
                url: '/',
                templateUrl: 'partials/home',
                controller: 'home',
                resolve: {
                    posts: ['$http',
                        function($http) {
                            return $http.get('/api/posts').then(function(res) {

                                return res.data;
                            });
                        }
                    ]
                }
            })
            .state('category', {
                url: '/cat/:categoryId',
                templateUrl: 'partials/home',
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
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login',
                controller: 'loginController'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'partials/admin',
                controller: 'admin',
                resolve: {
                    posts: ['$http',
                        function($http) {
                            return $http.get('/api/posts').then(function(res) {
                                return res.data;
                            });
                        }
                    ]
                }
            });
    }
]);

numApp.controller('categoriesMenu', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/api/categories').then(function(res) {
            $scope.loading = false;
            $scope.categories = res.data;
        });
    }
]);

numApp.controller('home', ['$scope', 'posts', 'user',
    function($scope, posts, user) {
        $scope.user = user;
        $scope.posts = posts;
        $scope.modal = {
            "title": "Title",
            "content": "Hello Modal<br />This is a multiline message!"
        };
    }
]);

numApp.controller('admin', ['$scope', 'posts',
    function($scope, posts) {
        if (true) {
            $scope.posts = posts;
        }
    }
]);

numApp.controller('loginController', ['$scope', '$http', '$rootScope', 'AUTH_EVENTS', 'AuthService','$state',
    function($scope, $http, $rootScope, AUTH_EVENTS, AuthService,$state) {
        $scope.credentials = {
            login: '',
            mdp: ''
        };

        //$state.transitionTo(page);
        $scope.login = function(credentials) {
            AuthService.login(credentials).then(function () {
              $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
              //$urlRouterProvider.$.when('/login','/');
              $state.go('home');
            }, function () {
              $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
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
