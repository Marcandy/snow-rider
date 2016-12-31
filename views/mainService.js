angular.module('snowrider')
  .service('mainService', function ($http) {

    // google places Map api key
    const key = '&key=AIzaSyCY0pUHVH0TCKwnYDFZpl2xkqGkexLRjVg';

    var resorts;

    // with geoplugin api
      this.city = geoplugin_city();
      this.state = geoplugin_region();
      this.lat = geoplugin_latitude();
      this.long = geoplugin_longitude();

    // search request
      let searchKeyword = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
      // -33.8670522,151.1957362&type=restaurant&keyword=&key=YOUR_API_KEY

      let searchText = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=ski+snowboard+resorts&rankBy=distance'
      let location = '&location=' + this.lat + ',' + this.long;
      let radius = '&radius=20000';

      this.getResorts = function(geo) { // when to convert the user iputed city name or zipcode
        return $http({
          method: 'GET',
          url: searchText + location + key,
          //  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise' + key


          // headers: {
          //   'Access-Control-Allow-Origin: * ',
          //   'Access-Control-Allow-Headers: AUTHORIZATION',
          //   'Access-Control-Allow-Methods: GET'
          // }
        }).then(function (response) {
          console.log(response);
          resorts = response.data.results;
          console.log(resorts);
          // response.addHeader("Access-Control-Allow-Origin", "*");
          return response.data.results;
        })
      }

      this.pass = function () {
        return resorts;
      }



  })
