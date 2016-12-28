angular.module('snowrider', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home',{
            url:'/',
            templateUrl: "./views/jumbo/jumbo.html",
            controller: 'jumboCtrl'
        })
        .state('guide', {
            url:'/guide',

            // templateUrl: "./views/guides/guides.html",
            // controller: 'guidesCtrl',

            views: {
              '': {
                templateUrl: "./views/guides/guides.html",
                controller: 'guidesCtrl',
            },

              "featured@guide": {
                templateUrl: './views/guides/resort.html'
              }
            }

        })
        // .state('guide.resort', {
        //     // parent: 'guide',
        //     // url: '/ide',
        //     abstract: true,
        //     templateUrl: './views/gear/resort.html'
        //
        //     // controller: 'guidesCtrl'
        // })
})
