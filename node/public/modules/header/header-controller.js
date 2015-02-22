define(function(require, exports, module) {

    'use strict';

    function SliderController($scope) {

        $scope.images = [{
            src: 'bg1.jpg',
            title: 'Pic 1'
        }, {
            src: 'bg2.jpg',
            title: 'Pic 2'
        }, {
            src: 'bg3.jpg',
            title: 'Pic 3'
        }, {
            src: 'bg4.jpg',
            title: 'Pic 4'
        }, {
            src: 'bg5.jpg',
            title: 'Pic 5'
        }];
    }

    SliderController.$inject = ['$scope'];

    module.exports = SliderController;
});