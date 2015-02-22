define(function(require, exports, module) {

    'use strict';

    var image = {};

    var uploadInProgress = function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
    }

    var uploadSuccess = function(data, status, headers, config) {
        image.id = data.id;
        image.path = data.path;
        image.name = data.name;
        $('#file__upload').removeClass('btn-primary').addClass('btn-success').attr("disabled", "disabled");
        $('.file__upload__wrapper').prepend('<img id="uploadedImage" src="'+image.path+'" alt="'+image.name+'">');
    }

    function AddArticleService($upload, $http, $rootScope) {
        return {
            upload : function(files) {
                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        $upload.upload({
                            url: 'api/image',
                            file: file
                        }).progress(uploadInProgress).success(uploadSuccess);
                    }
                }
            },
            insertArticle: function(article) {
                article.imageid = image.id;
                $http.defaults.headers.common['Auth-Token'] = $rootScope.user.token;
                return $http.post('/api/post',article).success(function(res, status, headers){
                    console.log(res);
                }).error(function(err){
                    console.log(err);
                });
            }
        }
    }

    AddArticleService.$inject = ['$upload', '$http', '$rootScope'];

    module.exports = AddArticleService;
});