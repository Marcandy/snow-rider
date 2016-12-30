angular.module('snowrider')
  .controller('searchCtrl', function ($scope, mainService) {

    $scope.resorts = mainService.getResorts().then(function (results) {
      $scope.data = results;
    })
  })
