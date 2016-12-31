angular.module('snowrider')
  .controller('searchCtrl', function ($scope, mainService,mapService) {

    $scope.getResorts = function (zipOcity) {// whne ng-clicked to initiate
      mainService.getResorts().then(function (results) {
       $scope.resorts = results;
     })
    }

    $scope.showMap = function () {
      mapService.initMap();
    }

    

  })
