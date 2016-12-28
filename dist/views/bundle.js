'use strict';

angular.module('snowrider', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: "./views/jumbo/jumbo.html",
    controller: 'jumboCtrl'
  }).state('guide', {
    url: '/guide',

    // templateUrl: "./views/guides/guides.html",
    // controller: 'guidesCtrl',

    views: {
      '': {
        templateUrl: "./views/guides/guides.html",
        controller: 'guidesCtrl'
      },

      "featured@guide": {
        templateUrl: './views/guides/resort.html'
      }
    }

  });
  // .state('guide.resort', {
  //     // parent: 'guide',
  //     // url: '/ide',
  //     abstract: true,
  //     templateUrl: './views/gear/resort.html'
  //
  //     // controller: 'guidesCtrl'
  // })
});
"use strict";
'use strict';

angular.module('snowrider').controller('guidesCtrl', function ($scope, $sce) {

  $scope.val = false;
});
'use strict';

angular.module('snowrider').controller('jumboCtrl', function ($scope, $sce) {
  $scope.vid = $sce.trustAsResourceUrl('../img/jumbo.mp4');
});
//# sourceMappingURL=bundle.js.map
