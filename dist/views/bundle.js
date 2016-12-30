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
    }).state('search', {
        url: '/search',
        templateUrl: './views/search/search.html',
        controller: 'searchCtrl'
    });
});
'use strict';

angular.module('snowrider').service('mainService', function ($http) {

  // google places Map api key
  var key = '&key=AIzaSyCY0pUHVH0TCKwnYDFZpl2xkqGkexLRjVg';

  // with geoplugin api
  this.city = geoplugin_city();
  this.state = geoplugin_region();
  this.lat = geoplugin_latitude();
  this.long = geoplugin_longitude();

  // search request
  var searchKeyword = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
  // -33.8670522,151.1957362&type=restaurant&keyword=&key=YOUR_API_KEY

  var searchText = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=skiing+or+snowboarding';
  var location = '&location=' + this.lat + ',' + this.long;
  var radius = '&radius=30000';

  this.getResorts = function (geo) {
    // when to convert the user iputed city name or zipcode
    return $http({
      method: 'GET',
      url: searchText + location + radius + key
    }).then(function (response) {
      return response.results;
    });
  };
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

        link: function link(scope, elem, attrs) {
            //elem attribute was different, so it was not applying

            $('a[href*="#"]:not([href="#"])').click(function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });

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

angular.module('snowrider').controller('guidesCtrl', function ($scope, $sce) {

  $scope.val = false;
});
'use strict';

angular.module('snowrider').controller('jumboCtrl', function ($scope, $sce) {
  $scope.vid = $sce.trustAsResourceUrl('../img/jumbo.mp4');
});
'use strict';

angular.module('snowrider').controller('searchCtrl', function ($scope, mainService) {

  $scope.resorts = mainService.getResorts().then(function (results) {
    $scope.data = results;
  });
});
//# sourceMappingURL=bundle.js.map
