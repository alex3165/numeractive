define(function(require, exports, module) {

    'use strict';

    function CategoryService($http, $rootScope) {
		return {
			removeCategory: function(categoryId) {
				$http.defaults.headers.common['Auth-Token'] = $rootScope.user.token;
				return $http.delete('/api/category/'+categoryId);
			},
			addCategory: function(categoryName) {
				var category = {
					type: categoryName,
					color: '#fff'
				}

                $http.defaults.headers.common['Auth-Token'] = $rootScope.user.token;

				return $http.post('api/category', category)
				.success(function(res, status, headers){
					console.log('Category successfuly added, request status : '+status);
				})
				.error(function(){
					console.log('Error when trying to add category');
				});
			}
		}
    }

    CategoryService.$inject = ['$http', '$rootScope'];

    module.exports = CategoryService;
});