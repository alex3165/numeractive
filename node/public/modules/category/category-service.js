define(function(require, exports, module) {

    'use strict';

    function CategoryService($http) {
		return {
			removeCategory: function(categoryId) {
				return $http.delete('/api/category/'+categoryId);
			}
		}
    }

    CategoryService.$inject = ['$http'];

    module.exports = CategoryService;
});