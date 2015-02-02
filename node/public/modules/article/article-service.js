define(function(require, exports, module) {

    'use strict';

    function ArticleService($http, user) {
        return {
            addArticle: function(article){
                return $http.post('/api/post',article).success(function(res, status, headers){
                    console.log(res);
                }).error(function(err){
                    console.log(err);
                });
            },
            removeArticle: function(articleId) {
                return $http.delete('/api/post/'+articleId);
            }
        };
    }

    ArticleService.$inject = ['$http', 'user'];

    module.exports = ArticleService;
});