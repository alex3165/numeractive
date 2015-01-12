var numApp = angular.module('numeractive', ['ui.router', 'ngAnimate', 'infinite-scroll', 'mgcrea.ngStrap', 'ngSanitize', 'ngCookies']);
var loading = true;

numApp.config(['$urlRouterProvider', '$stateProvider', '$provide',
    function($urlRouterProvider, $stateProvider, $provide) {
        'use strict';
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
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'partials/contact',
                controller: 'contact'
            });
    }
]);