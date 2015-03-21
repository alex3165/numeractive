define(function(require, exports, module) {
    
    'use strict';

    var SideMenuState = {
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


    function NumeractiveRouter($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    sidemenu: SideMenuState,
                    main: {
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
                    footer: {
                        templateUrl: 'partials/footer'
                    }
                },

            })
            .state('list', {
                url: '/cat/:categoryId',
                views : {
                    sidemenu: SideMenuState,
                    main: {
                        controller: 'HomeCtrl',
                        templateUrl: 'partials/articles',
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
                    },
                    footer: {
                        templateUrl: 'partials/footer'
                    }
                },

            })
            .state('article', {
                url: '/article/:articleId',
                views: {
                    sidemenu: SideMenuState,
                    main: {
                        controller: 'ArticleCtrl',
                        templateUrl: 'partials/article',
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
                    },
                    footer: {
                        templateUrl: 'partials/footer'
                    }
                }
            })
            .state('login', {
                url: '/login',
                views : {
                    main: {
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
                        templateUrl: 'partials/newArticle',
                        resolve: {
                            categories: [ '$http', function($http){
                                return $http.get('/api/categories').then(function(res) {
                                        return res.data;
                                });
                            }]
                        }
                    }
                }
            })
            .state('contact', {
                url: '/contact',
                views : {
                    main: {
                        templateUrl: 'partials/contact',
                        controller: 'ContactCtrl'
                    }
                }
            });
    }

    NumeractiveRouter.$inject = ['$urlRouterProvider', '$stateProvider'];

    module.exports = NumeractiveRouter;
});