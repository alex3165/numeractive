define(function(require, exports, module) {

    'use strict';

    var imagePath = '';

    var uploadInProgress = function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
    }

    var uploadSuccess = function(data, status, headers, config) {
        console.log(imagePath);
        imagePath = data.results[0].path;
        $('#file__upload').removeClass('btn-primary').addClass('btn-success').attr("disabled", "disabled");
        console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
    }

    function AddArticleService($upload, $http, user) {
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
                console.log('image path : '+imagePath);
                console.log('user token'+user.token);
                article.imagePath = imagePath;

                $http.defaults.headers.common['Auth-Token'] = user.token;
                return $http.post('/api/post',article).success(function(res, status, headers){
                    console.log(res);
                }).error(function(err){
                    console.log(err);
                });
            }
        }
    }

    AddArticleService.$inject = ['$upload', '$http', 'user'];

    module.exports = AddArticleService;
});