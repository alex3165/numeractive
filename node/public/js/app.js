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

numApp.controller('home', ['$scope', 'posts',
    function($scope, posts) {
        $scope.posts = posts;
        // $scope.currentUser = null;
        // $scope.isAuthorized = AuthService.isAuthorized;
    }
]);

numApp.controller('admin', ['$scope', 'posts',
    function($scope, posts) {
        if (true) {
            $scope.posts = posts;
        }
    }
]);

numApp.controller('loginController', ['$scope', '$http', '$rootScope', 'AUTH_EVENTS', 'AuthService',
    function($scope, $http, $rootScope, AUTH_EVENTS, AuthService) {
        $scope.credentials = {
            login: '',
            mdp: ''
        };

        $scope.isAuthenticated = AuthService.isAuthenticated;
        //$state.transitionTo(page);
        $scope.login = function(credentials) {
            AuthService.login(credentials).then(function () {
              $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
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

/***********************
      Auth Service
************************/

numApp.factory('AuthService', function ($http, Session) {
  return {
    login: function (credentials) {
      return $http
        .post('/api/login', credentials)
        .then(function (res,status,headers) {
          Session.create(res.token, res.userid);
        }).error(function(err) {
            
        });
    },
    isAuthenticated: function () {
      return true;//!!Session.userId;
    }
  };
});

numApp.service('Session', function () {
  this.create = function (token, userId) {
    this.id = token;
    this.userId = userId;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
  };
  return this;
});
