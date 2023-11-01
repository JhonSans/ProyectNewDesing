var mainApp = angular.module('MainApp', ['ngRoute', 'ngAnimate' ]).config(function ($routeProvider) {
    $routeProvider
    .when("/Inicio", {
        templateUrl: "views/main.html",
        controller: "mainController"
    })
    .when("/Listado", {
        templateUrl: "views/Listado/index.html",
        controller: "listadoController",
        controllerAs: "lC"
    })
    .otherwise({
        redirectTo: "/Inicio"
    });
});