define(function(require, exports, module) {

    'use strict';

    function AdminController($scope, user, AuthService, $state) {
        if (typeof AuthService.getCookie() != "undefined") {
            user = AuthService.getCookie();
        }

        $scope.user = user;

        $scope.disconnect = function(){
            AuthService.destroy();
            $state.go($state.$current, null, { reload: true });
        };
    }

    AdminController.$inject = ['$scope', 'user', 'AuthService', '$state'];

    module.exports = AdminController;

});