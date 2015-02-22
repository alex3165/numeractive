define(function(require, exports, module) {

    'use strict';

    function AuthService($http, $cookieStore, $rootScope) {
        return {
            login: function (credentials) {
                var request = $http.post('/api/login', credentials)
                .success(function (res, status, headers) {
                    console.log('request status : '+status);
                    if (res.token != 'undefined'){
                        $rootScope.user.token = res.token;
                        $rootScope.user.login = credentials.login;
                        $rootScope.user.userid = res.userid;
                        $rootScope.user.islogged = true;
                        $cookieStore.put("user", $rootScope.user);
                    }
                }).error(function(data, status, headers, config) {
                    console.log(data);
                });

                return request;
            },
            destroy: function(){
                $rootScope.user.token = '';
                $rootScope.user.login = '';
                $rootScope.user.userid = '';
                $rootScope.user.islogged = false;
                $cookieStore.put("user", $rootScope.user);
                return;
            },
            getCookie: function(){
                return $cookieStore.get("user");
            }
        };
    }

    AuthService.$inject = ['$http', '$cookieStore', '$rootScope'];

    module.exports = AuthService;
});