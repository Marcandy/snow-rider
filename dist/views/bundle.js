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

  var resorts;

  // with geoplugin api
  this.city = geoplugin_city();
  this.state = geoplugin_region();
  this.lat = geoplugin_latitude();
  this.long = geoplugin_longitude();

  // search request
  var searchKeyword = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
  // -33.8670522,151.1957362&type=restaurant&keyword=&key=YOUR_API_KEY

  var searchText = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=ski+snowboard+resorts&rankBy=distance';
  var location = '&location=' + this.lat + ',' + this.long;
  var radius = '&radius=20000';

  this.getResorts = function (geo) {
    // when to convert the user iputed city name or zipcode
    if (!geo) {
      geo = location;
    }
    return $http({
      method: 'GET',
      url: searchText + geo + key
    }).then(function (response) {
      console.log(response);
      resorts = response.data.results;
      console.log(resorts);
      // response.addHeader("Access-Control-Allow-Origin", "*");
      return response.data.results;
    });
  };

  this.pass = function () {
    return resorts;
  };

  var geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  var components1 = '&components=administrative_area_level_3:';
  var components2 = '|postal_code:';

  this.geoCode = function (zipCity) {
    //console.log(zipcodeBaseUrl + zip + zipcodeComponents + zip + '&sensor=true' + zipcodeKey);
    return $http({
      method: 'GET',
      url: geoUrl + zipCity + key
    }).then(function (results) {

      // if(results.data.status === "ZERO_RESULTS") {
      //   return false;
      // }

      console.log(results);
      var geoData = {};

      geoData.lat = results.data.results[0].geometry.location.lat;
      geoData.lon = results.data.results[0].geometry.location.lng;
      // geoData.zip = zipCity;
      // const address = results.data.results[0].formatted_address;
      // geoData.address = address.slice(0, address.indexOf(zip)).trim();
      // geoData.city = address.slice(0, address.indexOf(zip)).trim();//parse the data down to just the city and state
      return geoData;
    });
  };

  // '"https://maps.googleapis.com/maps/api/geocode/json?address=Dallas&components=administrative_area:Dallas|postal_code:Dallas&key=AIzaSyCY0pUHVH0TCKwnYDFZpl2xkqGkexLRjVg"'
});
'use strict';

angular.module('snowrider').service('mapService', function ($http, mainService) {

  var map = void 0;
  var service = void 0;
  var infowindow = void 0;
  var currentL = void 0;
  this.initMap = function (geo) {
    //location
    if (geo) {
      currentL = geo;
    } else {
      currentL == { lat: Number(mainService.lat), lng: Number(mainService.long) };
    }

    //creating the new map with the geocode of the currentL
    map = new google.maps.Map(document.getElementById('map'), {
      center: currentL,
      zoom: 10
    });

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.textSearch({
      location: currentL,
      radius: 30000,
      query: ['ski, snowboard resorts'],
      rankBy: google.maps.places.RankBy.DISTANCE
    }, callback);
  };

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // console.log(results)
      // for (var i = 0; i < results.length; i++) {
      //   createMarker(results[i]); // creating a makrer for each of the result in the map
      // }
      var data = mainService.pass(); //
      if (data) {
        //made a condition to not initia map right away
        for (var i = 0; i < data.length; i++) {
          createMarker(data[i]); // creating a makrer for each of the result in the map
        }
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(place.name + '<br>' + place.formatted_address);
      // infowindow.setContent(place.formatted_address);

      infowindow.open(map, this);
    });
  }
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

angular.module('snowrider').controller('jumboCtrl', function ($scope, $sce) {
  $scope.vid = $sce.trustAsResourceUrl('../img/jumbo.mp4');
});
'use strict';

angular.module('snowrider').controller('searchCtrl', function ($scope, mainService, mapService) {

  $scope.getResorts = function (zipOcity) {
    // whne ng-clicked to initiate
    mainService.getResorts().then(function (results) {
      $scope.resorts = results;
    });
  };

  $scope.showMap = function () {
    mapService.initMap();
  };

  var geoData = void 0;
  $scope.geoCode = function (zipCity) {

    mainService.geoCode(zipCity).then(function (response) {
      console.log(response);
      geoData = response;
      return geoData;
    }).then(function (geo) {
      console.log(geo);
      $scope.getResorts(geo);
    });
  };
});
'use strict';

angular.module('snowrider').controller('guidesCtrl', function ($scope, $sce) {

  $scope.val = false;
});
//# sourceMappingURL=bundle.js.map
