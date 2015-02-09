define(function(require, exports, module) {

    'use strict';

    function CategoryController($scope, user, CategoryService, $state, AuthService) {
    	if (typeof AuthService.getCookie() != "undefined") {
            user = AuthService.getCookie();
        }
		$scope.user = user;
		$scope.removeCategory = function(categoryId) {
		    CategoryService.removeCategory(categoryId).success(function(res, status, headers){
		        if (res.status === "impossible") alert(res.description);
		        $state.go($state.$current, null, { reload: true });
		    }).error(function(err) {
		        console.log(err);
		    });
		}

		$scope.addCategory = function(newcat) {
			CategoryService.addCategory(newcat);
		}
    }

    CategoryController.$inject = ['$scope', 'user', 'CategoryService', '$state', 'AuthService'];

    module.exports = CategoryController;
});