angular.module('snowrider')
  .service('mainService', function ($http) {

    // google places Map api key
    const api = 'AIzaSyCY0pUHVH0TCKwnYDFZpl2xkqGkexLRjVg';


    // with geoplugin api
      this.city = geoplugin_city();
      this.state = geoplugin_region();
      this.lat = geoplugin_latitude();
      this.long = geoplugin_longitude();
  })
