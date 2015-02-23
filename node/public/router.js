define(function(require, exports, module) {
    
    'use strict';

    function NumeractiveRouter($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('categories', {
                abstract: true,
                views: {
                    sidemenu: {
                        controller: function($scope, categories) {
                            $scope.categories = categories;
                        },
                        templateUrl: 'partials/categories',
                        resolve: {
                            categories: [ '$stateParams', '$http',
                                function($stateParams, $http) {
                                    return $http.get('/api/categories').then(function(res) {
                                        return res.data;
                                    });
                                }
                            ]
                        }
                    }
                }
            })
            .state('categories.home', {
                url: '/',
                views: {
                    "main@categories": {
                        controller: 'HomeCtrl',
                        templateUrl: 'partials/articles',
                        resolve: {
                            posts: [ '$http',
                                function($http) {
                                    return $http.get('/api/posts').then(function(res) {
                                        return res.data;
                                    });
                                }
                            ]
                        }
                    },
                    "footer@categories": {
                        templateUrl: 'partials/footer'
                    }
                }
            })
            .state('categories.list', {
                url: '/cat/:categoryId',
                views : {
                    main: {
                        controller: 'HomeCtrl',
                        templateUrl: 'partials/articles'
                    }
                },
                resolve: {
                    posts: [ '$stateParams', '$http',
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
                views : {
                    "main": {
                        controller: 'ArticleCtrl',
                        templateUrl: 'partials/article'
                    }
                },
                resolve: {
                    post: [ '$stateParams', '$http',
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
                views : {
                    "main": {
                        controller: 'LoginCtrl',
                        templateUrl: 'partials/login'
                    }
                }
            })
            .state('newArticle', {
                url: '/add',
                views : {
                    main: {
                        controller: 'NewArticleCtrl',
                        templateUrl: 'partials/newArticle'
                    }
                },
                resolve: {
                    categories: [ '$http', function($http){
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