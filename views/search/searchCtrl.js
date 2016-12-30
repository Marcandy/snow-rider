angular.module('snowrider')
  .controller('searchCtrl', function ($scope, mainService) {

    $scope.test = mainService.test;
  })
