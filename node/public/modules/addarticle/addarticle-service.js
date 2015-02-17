define(function(require, exports, module) {

    'use strict';

    var uploadInProgress = function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
    }

    var uploadSuccess = function(data, status, headers, config) {
        $('#file__upload').removeClass('btn-primary').addClass('btn-success').attr("disabled", "disabled");
        console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
    }

    function AddArticleService($upload) {

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
            }
        }
    }

    AddArticleService.$inject = ['$upload'];

    module.exports = AddArticleService;
});