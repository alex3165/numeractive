define(function(require, exports, module) {

    'use strict';

    function CategoryService($http, AuthService) {
		return {
			removeCategory: function(categoryId) {
				return $http.delete('/api/category/'+categoryId);
			},
			addCategory: function(categoryName) {
				console.log('new categorie added'+categoryName);

				var Auth = AuthService.getCookie();

				var category = {
					type: categoryName,
					color: '#fff',
					token: Auth.token
				}
				return $http.post('api/category', category)
				.success(function(res, status, headers){
					console.log('Category successfuly added, request status : '+status);
				})
				.error(function(){
					
				});
			}
		}
    }

    CategoryService.$inject = ['$http', 'AuthService'];

    module.exports = CategoryService;
});