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

              // Initialize collapse button
            $(".button-collapse").sideNav();
            // Initialize collapsible (uncomment the line below if you use the dropdown variation)
            //$('.collapsible').collapsible();

            $('.button-collapse').sideNav({
                menuWidth: 300, // Default is 240
                edge: 'right', // Choose the horizontal origin
                closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                draggable: true // Choose whether you can drag to open on touch screens
              }
            );

            
            }

        }

    })
