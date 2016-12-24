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

angular.module('snowrider').controller('jumboCtrl', function ($scope) {
  $scope.test = 'working';
});
//# sourceMappingURL=bundle.js.map
