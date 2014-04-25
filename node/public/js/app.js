var numApp = angular.module('numeractive', ['ui.router']);
var loading = true;

numApp.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) { //
        $urlRouterProvider.otherwise('/');

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
            });
            // .state('admin', {
            //     url: '/admin',
            //     templateUrl: 'partials/admin',
            //     controller: 'admin'
            //     }
            // });
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

numApp.controller('home', ['$scope', 'posts',
    function($scope, posts) {
        $scope.posts = posts;
    }
]);

numApp.controller('admin', ['$scope', '$http',
    function($scope, $http) {
 $scope.user = {};
 //data-ng-submit="login()"
     //input(data-ng-model="user.password")

    $scope.login = function() {
        
    };
    }
]);

 // numApp.service('categoriesService', ['utilsService','$http',
 //    function(utilsService,$http){
 //         $http.get('/api/categories').then(function(res) {
 //             return res.data;
 //         });
 // }]);
