define(function(require, exports, module) {

    'use strict';

    function AdminController($scope, AuthService, $state) {
        $scope.disconnect = function(){
            AuthService.destroy();
            $state.go($state.$current, null, { reload: true });
        };
    }

    AdminController.$inject = ['$scope', 'AuthService', '$state'];

    module.exports = AdminController;

});