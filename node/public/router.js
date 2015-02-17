define(function(require, exports, module) {
    
    'use strict';

    function NumeractiveRouter($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

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
                controller: 'HomeCtrl',
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
                controller: 'HomeCtrl',
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
                controller: 'ArticleCtrl',
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
                controller: 'LoginCtrl'
            })
            .state('newArticle', {
                url: '/add',
                templateUrl: 'partials/newArticle',
                controller: 'NewArticleCtrl',
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
                controller: 'ContactCtrl'
            });
    }

    NumeractiveRouter.$inject = ['$urlRouterProvider', '$stateProvider'];

    module.exports = NumeractiveRouter;
});