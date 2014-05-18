var numApp = angular.module('numeractive', ['ui.router', 'ngAnimate', 'infinite-scroll']);
var loading = true;

numApp.config(['$urlRouterProvider', '$stateProvider',
    function($urlRouterProvider, $stateProvider) {
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
            }).state('admin', {
                url: '/admin',
                templateUrl: 'partials/admin',
                controller: 'admin',
                resolve: {
                    posts: ['$stateParams', '$http',
                        function($stateParams, $http) {
                            
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

numApp.controller('home', ['$scope', 'posts',
    function($scope, posts) {
        $scope.posts = posts;
    }
]);

numApp.controller('loginController', ['$scope', '$http',
    function($scope, $http) {
        $scope.connecting = false;
        $scope.login = function() {
            $scope.connecting = true;
            $http.get('/api/login?login=' + $scope.user + '&mdp=' + $scope.password).error(function(data, status) {
                $scope.connecting = false;
                if (status == 'success') {
                    console.log('on accède à l\'admin');
                }
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

numApp.directive('slider', function($timeout) {

    return {
        restrict: 'AE',
        replace: true,
        scope: {
            images: '='
        },
        link: function(scope, elem, attrs) {
            scope.currentIndex = 0;

            scope.next = function() {
                scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
            };
            scope.prev = function() {
                scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
            };
            scope.$watch('currentIndex', function() {
                scope.images.forEach(function(image) {
                    image.visible = false;
                });

                scope.images[scope.currentIndex].visible = true;
            });
            var timer;

            var sliderFunc = function() {
                timer = $timeout(function() {
                    scope.next();
                    timer = $timeout(sliderFunc, 5000);
                }, 5000);
            };

            sliderFunc();

            scope.$on('$destroy', function() {
                $timeout.cancel(timer);
            });
        },
        templateUrl: '/templates/slider.html'

    };

});
