define(function(require, exports, module) {

    'use strict';

    function CategoryService($http) {
		return {
			removeCategory: function(categoryId) {
				return $http.delete('/api/category/'+categoryId);
			},
			addCategory: function(category) {
				return $http.post('api/category', category)
				.success(function(res, status, headers){
					console.log('Category successfuly added, request status : '+status);
				})
				.error(function(){
					
				});
			}
		}
    }

    CategoryService.$inject = ['$http'];

    module.exports = CategoryService;
});