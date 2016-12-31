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
        if(!geo) {
          geo = location
        }
        return $http({
          method: 'GET',
          url: searchText + geo + key,
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

      const geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
      const components1 = '&components=administrative_area_level_3:';
      const components2 = '|postal_code:';

      this.geoCode = function (zipCity) {
          //console.log(zipcodeBaseUrl + zip + zipcodeComponents + zip + '&sensor=true' + zipcodeKey);
          return $http({
            method: 'GET',
            url: geoUrl + zipCity + key
          }).then(function (results){

              // if(results.data.status === "ZERO_RESULTS") {
              //   return false;
              // }

              console.log(results);
              let geoData = {};

              geoData.lat = results.data.results[0].geometry.location.lat;
              geoData.lon = results.data.results[0].geometry.location.lng;
              // geoData.zip = zipCity;
              // const address = results.data.results[0].formatted_address;
              // geoData.address = address.slice(0, address.indexOf(zip)).trim();
              // geoData.city = address.slice(0, address.indexOf(zip)).trim();//parse the data down to just the city and state
              return geoData;
          })
}

// '"https://maps.googleapis.com/maps/api/geocode/json?address=Dallas&components=administrative_area:Dallas|postal_code:Dallas&key=AIzaSyCY0pUHVH0TCKwnYDFZpl2xkqGkexLRjVg"'

  })
