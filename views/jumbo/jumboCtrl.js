angular.module('snowrider')
  .controller('jumboCtrl', function ($scope, $sce) {
    $scope.vid = $sce.trustAsResourceUrl('../img/jumbo.mp4');
  })
