var mainApp = angular.module('MainApp', ['ngRoute', 'ngAnimate', 'slick' ]).config(function ($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: "/"
    });
});