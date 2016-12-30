angular.module('snowrider')
  .controller('searchCtrl', function ($scope, mainService) {

    $scope.city = mainService.city;
  })
