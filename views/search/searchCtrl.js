angular.module('snowrider')
    .controller('searchCtrl', function($scope, mainService, mapService) {

        let geoData;
        var data;
        $scope.photos = [];

        $scope.getResorts = function(zipOcity) { // whne ng-clicked to initiate
            mainService.getResorts().then(function(results) {
                    $scope.resorts = results; // so i can scope it

                    console.log(results);

                    return results

                })
                // .then(function(res) {
                //   for (var i = 0; i < res.length; i++) { // loop  though the result and try to get the photo for each place hile keeping it on scope
                //     mainService.getPhotos(res[i].photos[0].photo_reference).then(function (response) {
                //       $scope.photos.push(response)
                //       console.log($scope.photos);
                //     })
                //
                //   }
                // })


                //  return data;
        }

        $scope.showMap = function() {
            mapService.initMap();
        }

        $scope.showMap(); //initialize an empty map on load



        $scope.geoCode = function(zipCity) {

            mainService.geoCode(zipCity).then(function(response) {
                    console.log(response);
                    geoData = response;
                    return geoData
                })
                .then(function(geo) {
                    console.log(geo);
                    // var data = $scope.getResorts(geo);
                    // console.log($scope.getResorts(geo));
this.getPhoto = function (reference) {
          return $http({
            method: 'GET',
            url: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + reference + key
            //  'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU' + key,
            //  responseType: 'arraybuffer'
            //
          })
          .then(function (res) {

            return res.data;

            // var convertImg = _arrayBufferToBase64(response.data);
            // console.log(convertImg);
            // return convertImg;


          })
        }
                    // return  $scope.getResorts(geo)
                    return mainService.getResorts(geo).then(function(results) {
                        $scope.resorts = results; // so i can scope it
                        return results;
                    })
                })
                .then(function(results) {
                    console.log(results);
                    console.log(geoData);
                    mapService.initMap(geoData, results);
                })
        }


    })
