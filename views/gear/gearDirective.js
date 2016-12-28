angular.module('snowrider')
  .directive('gearDirective', function () {

    return {
      restrict: 'EA',

      templateUrl: './views/gear/gearDirective.html',

      scope: {
        // lesson: '=',
        // datAlert: '&'
      },

      controller: function ($scope) {

      },

      link: function (scope, elem, attrs) {//elem attribute was different, so it was not applying

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

    }

  })
