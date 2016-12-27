'use strict';

angular.module('snowrider', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: "./views/jumbo/jumbo.html",
        controller: 'jumboCtrl'
    });
});
"use strict";
'use strict';

angular.module('snowrider').controller('jumboCtrl', function ($scope, $sce) {
  // $scope.vid = $sce.trustAsResourceUrl('../img/jumbo.mp4');
});
//# sourceMappingURL=bundle.js.map
