angular.module('snowrider')
    .service('mainService', function($http, $q) {

        // google places Map api key
        const key = '&key=AIzaSyCY0pUHVH0TCKwnYDFZpl2xkqGkexLRjVg';

        var resorts;
        var mainService = this;
        // with geoplugin api
        this.city = geoplugin_city();
        this.state = geoplugin_region();
        this.lat = geoplugin_latitude();
        this.long = geoplugin_longitude();

        // search request
        let searchKeyword = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
        // -33.8670522,151.1957362&type=restaurant&keyword=&key=YOUR_API_KEY

        let searchText = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=ski+snowboard+resorts&rankBy=distance'
        var location = '&location=' + this.lat + ',' + this.long;
        let radius = '&radius=20000';

        this.getPhoto = function (i) {
          return $http({
            method: 'GET',
            url:
             'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU' + key,
             responseType: 'arraybuffer'
            // 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + reference + key
          })
          .then(function (response) {

            var convertImg = _arrayBufferToBase64(response.data);
            console.log(convertImg);
            return convertImg;


          })
        }

        function _arrayBufferToBase64(buffer) {
          var binary = '';
          var bytes = new Uint8Array(buffer);
          var len = bytes.byteLength;
          for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          return window.btoa(binary);
        }


        this.getResorts = function(geo) { // when to convert the user iputed city name or zipcode
          var deferred = $q.defer()

            if (geo) {
                location = '&location=' + geo.lat + ',' + geo.lng; //had to reset the location parameter correctly
                console.log(location);
            }
             $http({


                method: 'GET',
                url: searchText + location + key,
                //  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise' + key


                // headers: {reference

                //   'Access-Control-Allow-Origin: * ',
                //   'Access-Control-Allow-Headers: AUTHORIZATION',
                //   'Access-Control-Allow-Methods: GET'
                // }
            }).then(function(response ) {
                console.log(response);
                resorts = response.data.results;


                  // for (var i = 0; i < resorts.length; i++) {
                  //   // var ref = response[i].photos[0].photo_reference
                  //   console.log(resorts)
                  //
                  //   $http({
                  //     method: 'GET',
                  //     url:
                  //      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU' + key
                  //     // 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + reference + key
                  //   }).then(function (i, response) {
                  //     resorts[i].photos = response;
                  //   }.bind(null, i))
                  //
                  //
                  // }
                  for (var i = 0; i < resorts.length; i++) {
                    mainService.getPhoto().then(function (i, response) {
                      resorts[i].photos = response.data;
                      console.log(resorts);
                    }.bind(null, i));
                  }




                deferred.resolve(resorts);

            })
            // .then(function (response) {
            //
            //
            // })


          return deferred.promise
        }



        // this.getPhotos();


        this.pass = function() {
            return resorts;
        }

        const geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
        const components1 = '&components=administrative_area_level_3:';
        const components2 = '|postal_code:';

        this.geoCode = function(zipCity) {
            //console.log(zipcodeBaseUrl + zip + zipcodeComponents + zip + '&sensor=true' + zipcodeKey);
            return $http({
                method: 'GET',
                url: geoUrl + zipCity + key
            }).then(function(results) {

                // if(results.data.status === "ZERO_RESULTS") {
                //   return false;
                // }

                console.log(results);
                let geoData = {};

                geoData.lat = results.data.results[0].geometry.location.lat;
                geoData.lng = results.data.results[0].geometry.location.lng;
                // geoData.zip = zipCity;
                // const address = results.data.results[0].formatted_address;
                // geoData.address = address.slice(0, address.indexOf(zip)).trim();
                // geoData.city = address.slice(0, address.indexOf(zip)).trim();//parse the data down to just the city and state
                return geoData;
            })
        }

        // '"https://maps.googleapis.com/maps/api/geocode/json?address=Dallas&components=administrative_area:Dallas|postal_code:Dallas&key=AIzaSyCY0pUHVH0TCKwnYDFZpl2xkqGkexLRjVg"'

    })
