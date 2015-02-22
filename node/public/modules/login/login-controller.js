define(function(require, exports, module) {

    'use strict';

    function LoginController($scope, $http, $rootScope, AuthService, $state, $alert) {
        if ($rootScope.user.islogged) {
            $state.go('categories.home');
        }
        $scope.credentials = {
            login: '',
            password: ''
        };
        $scope.login = function(credentials) {
            AuthService.login(credentials).then(function() {
                $state.go('categories.home', null, { reload: true });
            }, function() {
                $alert({
                    content: 'Mauvais login ou mot de passe.',
                    container: '#alerts-container',
                    type: 'danger',
                    duration: 1,
                    show: true
                });
            });
        };
    }

    LoginController.$inject = ['$scope', '$http', '$rootScope', 'AuthService', '$state', '$alert'];

    module.exports = LoginController;
});