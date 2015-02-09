define(function(require, exports, module) {

    'use strict';

    function AuthService($http, user, $cookieStore) {
        return {
            login: function (credentials) {
                var request = $http.post('/api/login', credentials)
                .success(function (res, status, headers) {
                    console.log('request status : '+status);
                    if (res.token != 'undefined'){
                        user.token = res.token;
                        user.login = credentials.login;
                        user.userid = res.userid;
                        user.islogged = true;
                        $cookieStore.put("user", user);
                    }
                }).error(function(data, status, headers, config) {
                    console.log(data);
                });

                return request;
            },
            destroy: function(){
                user.token = '';
                user.login = '';
                user.userid = '';
                user.islogged = false;
                $cookieStore.put("user", user);
                return;
            },
            getCookie: function(){
                return $cookieStore.get("user");
            }
        };
    }

    AuthService.$inject = ['$http', 'user', '$cookieStore'];

    module.exports = AuthService;
});