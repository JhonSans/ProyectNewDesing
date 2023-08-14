var mainApp = angular.module('MainApp', ['ngRoute', 'ngAnimate', 'slick', 'swipe', 'swipe.counter' ]).config(function ($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: "/"
    });
});