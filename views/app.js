angular.module('snowrider', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home',{
            url:'/',
            templateUrl: "./views/jumbo/jumbo.html",
            controller: 'jumboCtrl'
        })
})
