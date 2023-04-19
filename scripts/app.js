//Main App Module + Dependencias
var app = angular
  .module("MainApp", [
    "ngRoute",
    "ngAnimate",
    "ngTouch",
    "ui.bootstrap",
    "ngSanitize",
    "ngResource",
    "toastr"
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/Inicio", {
        templateUrl: "views/articulos.html",
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
      .when("/Juegos/PPTLS/Jugar", {
        templateUrl: "views/Juegos/PPTLS/jugar.html",
        controller: "pptslController",
        controllerAs: "pptsl",
      })
      .when("/Juegos/Suma", {
        templateUrl: "views/Juegos/Suma/suma.html",
        controller: "sumaController",
        controllerAs: "sumaMM",
      })
      .when("/Juegos/Suma/Probar", {
        templateUrl: "views/Juegos/Suma/probar.html",
        controller: "sumaController",
        controllerAs: "sumaMM",
      })
      .when("/Northwind/Clientes", {
        templateUrl: "views/Northwind/Clientes/index.html",
        controller: "clientesController",
        controllerAs: "clientesN",
      })
      .when("/Northwind/Clientes/:id", {
        templateUrl: "views/Northwind/Clientes/editar.html",
        controller: "editarClienteController",
        controllerAs: "clientesN"
      })
      .when("/Northwind/Productos", {
        templateUrl: "views/Northwind/Productos/index.html",
        controller: "productosController",
        controllerAs: "productosN",
      })
      .when("/Northwind/Productos/:id", {
        templateUrl: "views/Northwind/Productos/editar.html",
        controller: "editarProductosController",
        controllerAs: "productosN",
      })
      .when("/Northwind/Ordenes", {
        templateUrl: "views/Northwind/Ordenes/index.html",
        controller: "ordenesController",
        controllerAs: "ordenesN",
      })
      .otherwise({
        redirectTo: "/IniciarSesion",
      });
  });
