define(function(require, exports, module) {

    'use strict';

    function ArticleService($http, user) {
        return {
            removeArticle: function(articleId) {

                $http.defaults.headers.common['Auth-Token'] = user.token;

                return $http.delete('/api/post/'+articleId);
            }
        };
    }

    ArticleService.$inject = ['$http', 'user'];

    module.exports = ArticleService;
});