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

    }).state('gear', {
        url: '/gear',
        templateUrl: './views/gear/gear.html'
    });
});
"use strict";
'use strict';

angular.module('snowrider').controller('guidesCtrl', function ($scope, $sce) {

  $scope.val = false;
});
'use strict';

angular.module('snowrider').directive('gearDirective', function () {

  return {
    restrict: 'EA',

    templateUrl: './views/gear/gearDirective.html',

    scope: {
      // lesson: '=',
      // datAlert: '&'
    },

    controller: function controller($scope) {},

    link: function link(scope, elem, attrs) {//elem attribute was different, so it was not applying

      // scope.getSchedule.then(function (response) {
      //   scope.schedule = response.data;
      //
      //   for (var i = 0; i < response.data.length; i++) {
      //
      //     if (response.data[i].lesson === scope.lesson) {
      //       scope.lessonDay = response.data[i].weekday
      //       elem.css("text-decoration", "line-through");
      //       return;
      //     }
      //   }
      // })
    }

  };
});
'use strict';

angular.module('snowrider').controller('jumboCtrl', function ($scope, $sce) {
  $scope.vid = $sce.trustAsResourceUrl('../img/jumbo.mp4');
});
//# sourceMappingURL=bundle.js.map
