//Main App Module + Dependencias
var app = angular
  .module("MainApp", [
    "ngRoute",
    "ngAnimate",
    "ngTouch",
    "ui.bootstrap",
    "ngSanitize",
    "toastr",
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/Inicio", {
        templateUrl: "views/Principal/articulos.html",
        controller: "articulosController",
        controllerAs: "ar",
      })
      .when("/IniciarSesion", {
        templateUrl: "views/login.html",
        controller: "sesionController"
      })
      .when("/Juegos/PPTLS", {
        templateUrl: "views/Juegos/PPTLS/pptls.html",
        controller: "pptslController",
        controllerAs: "pptsl",
      })
      .when("/Juegos/Suma", {
        templateUrl: "views/Juegos/Suma/suma.html",
        controller: "sumaController",
        controllerAs: "sumaMM",
      })
      .when("/Juegos/PPTLS/Jugar", {
        templateUrl: "views/Juegos/PPTLS/jugar.html",
        controller: "pptslController",
        controllerAs: "pptsl",
      })
      .otherwise({
        redirectTo: "/IniciarSesion",
      });
  });
