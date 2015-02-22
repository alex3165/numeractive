define(function(require, exports, module) {

    'use strict';

    function CategoryController($scope, CategoryService, $state) {

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

    CategoryController.$inject = ['$scope', 'CategoryService', '$state'];

    module.exports = CategoryController;
});