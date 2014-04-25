var sliderApp = angular.module('app', ['ngAnimate']);

sliderApp.directive('slider', function($timeout) {

  return {
    restrict: 'AE',
    replace: true,
    scope: {
      images: '='
    },
    link: function(scope, elem, attrs) {},
    templateUrl: 'index.html'
  };

});

sliderApp.controller('SliderController', function($scope) {
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

  $scope.currentIndex = 0;
  $scope.next = function() {
    $scope.currentIndex < $scope.images.length - 1 ? $scope.currentIndex++ : $scope.currentIndex = 0;
    console.log($scope.currentIndex);
  };
  $scope.prev = function() {
    $scope.currentIndex > 0 ? $scope.currentIndex-- : $scope.currentIndex = $scope.images.length - 1;
    console.log($scope.currentIndex);
  };

  $scope.$watch('currentIndex', function() {
    $scope.images.forEach(function(image) {
      image.visible = false; // make every image invisible
    });
   
    $scope.images[$scope.currentIndex].visible = true; // make the current image visible
  });

});

