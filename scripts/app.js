var mainApp = angular.module('MainApp', ['ngRoute', 'ngAnimate' ]).config(function ($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: "/"
    });
});