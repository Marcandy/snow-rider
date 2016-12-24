angular.module('snowrider', [])
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home',{
            url:'/',
            templateUrl: "./jumbo/jumbo.html"
        })
