define(function(require, exports, module) {

    'use strict';

    function LoginController($scope, $http, $rootScope, AUTH_EVENTS, AuthService, $state, $alert, user) {
        if (typeof AuthService.getCookie() != "undefined") {
            user = AuthService.getCookie();
        }
        if (user.islogged) {
            $state.go('categories.home');
        }
        $scope.credentials = {
            login: '',
            mdp: ''
        };
        $scope.login = function(credentials) {
            AuthService.login(credentials).then(function() {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $state.go('categories.home', null, { reload: true });
            }, function() {
                $alert({
                    content: 'Mauvais login ou mot de passe.',
                    container: '#alerts-container',
                    type: 'danger',
                    duration: 1,
                    show: true
                });
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };
    }

    LoginController.$inject = ['$scope', '$http', '$rootScope', 'AUTH_EVENTS', 'AuthService', '$state', '$alert', 'user'];

    module.exports = LoginController;
});