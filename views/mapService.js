angular.module('snowrider')
  .service('mapService', function ($http, mainService) {

    let map;
    let service;
    let infowindow;

    this.initMap = function() {
      //location
        var currentL = {lat: Number(mainService.lat), lng: Number(mainService.long)};

        //creating the new map with the geocode of the currentL
        map = new google.maps.Map(document.getElementById('map'), {
          center: currentL,
          zoom: 15
        });

        infowindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: currentL,
          radius: 25000,
          type: ['park']
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]); // creating a makrer for each of the result in the map
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }

});
