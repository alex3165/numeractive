requirejs.config({
    paths: {
          /**
          *
          * Dependencies
          *
          */

          'angular': 'bower_components/angular/angular.min',
          'agular-animate': 'bower_components/angular-animate/angular-animate.min',
          'angular-sanatize': 'bower_components/angular-sanitize/angular-sanitize.min',
          'angular-cookie': 'bower_components/angular-cookies/angular-cookies.min',
          'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router.min',
          'angular-strap': 'bower_components/angular-strap/dist/angular-strap.min',
          'infinite-scroll': 'bower_components/ngInfiniteScroll/build/ng-infinite-scroll',
          'ckeditor': 'bower_components/ckeditor/ckeditor',

          /**
          *
          * Framework
          *
          */

          'router': 'router',

          /**
          *
          * Controllers
          *
          */
          'head-controller': 'modules/head/head-controller',
          'contact-controller': 'modules/contact/contact-controller',
          'category-controller': 'modules/category/category-controller',
          'article-controller': 'modules/article/article-controller',
          'admin-controller': 'modules/admin/admin-controller',

          /**
          *
          * Services
          *
          */

    }
});

requirejs(['backbone', 'marionette'], function (Backbone, Marionette) {
    
});


'use strict';

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
                controller: 'newArticle',
                resolve: {
                    categories: ['$http', function($http){
                        return $http.get('/api/categories').then(function(res) {
                                return res.data;
                        });
                    }]
                }
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'partials/contact',
                controller: 'contact'
            });
    }
]);