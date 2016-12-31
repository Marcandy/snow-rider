angular.module('snowrider')
  .controller('searchCtrl', function ($scope, mainService, mapService) {

    $scope.getResorts = function (zipOcity) {// whne ng-clicked to initiate
      mainService.getResorts().then(function (results) {
       $scope.resorts = results;
     })
    }

    $scope.showMap = function () {
      mapService.initMap();
    }

let geoData;
    $scope.geoCode = function (zipCity) {

      mainService.geoCode(zipCity).then(function (response) {
        console.log(response);
        geoData =  response;
        return geoData
      })
      .then(function (geo) {
        console.log(geo);
        $scope.getResorts(geo);
      })
    }


  })
