define(function(require, exports, module) {

    'use strict';

    function CategoryController($scope, user, CategoryService, $state) {
		$scope.user = user;
		$scope.removeCategory = function(categoryId) {
		    CategoryService.removeCategory(categoryId).success(function(res, status, headers){
		        if (res.status === "impossible") alert(res.description);
		        $state.go($state.$current, null, { reload: true });
		    }).error(function(err) {
		        console.log(err);
		    });
		}
    }

    CategoryController.$inject = ['$scope', 'user', 'CategoryService', '$state'];

    module.exports = CategoryController;
});