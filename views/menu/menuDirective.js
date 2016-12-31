angular.module('snowrider')
    .directive('menuDirective', function() {

        return {
            restrict: 'EA',

            templateUrl: './views/menu/menu.html',

            scope: {
                // lesson: '=',
                // datAlert: '&'
            },

            controller: function($scope) {

            },

            link: function(scope, elem, attrs) { //elem attribute was different, so it was not applying


            }

        }

    })
