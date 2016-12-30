angular.module('snowrider')
  .controller('searchCtrl', function ($scope, mainService) {

     mainService.getResorts().then(function (results) {
      $scope.resorts = results;
    })
    
  })
