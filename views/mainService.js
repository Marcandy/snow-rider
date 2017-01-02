angular.module('snowrider')
    .service('mainService', function($http, $q) {

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
        var location = '&location=' + this.lat + ',' + this.long;
        let radius = '&radius=20000';

        this.getphoto = function (i) {
          return $http({
            method: 'GET',
            url:
             'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU' + key
            // 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + reference + key
          })
          .then(function (response) {
            console.log(response);
            return response;


          })
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
            }).then(function(response) {
                console.log(response);



                resorts = response.data.results;


                return resorts

            }).then(function (response) {

              for (var i = 0; i < resorts.length; i++) {
                // var ref = response[i].photos[0].photo_reference
                console.log(resorts)

                return $http({
                  method: 'GET',
                  url:
                   'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU' + key
                  // 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + reference + key
                }).then(function (response) {
                  resorts[i].photos = response;
                })


              }
              deferred.resolve(resorts)
            })


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
