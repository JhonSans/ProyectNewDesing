//Main App Module + Dependencias
var app = angular
  .module("MainApp", [
    "ngAnimate",
    "ngResource",
    "ngRoute",
    "ngSanitize",
    "ngTouch",
    "toastr",
    "ui.bootstrap"
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/Inicio", {
        templateUrl: "views/articulos.html",
        controller: "articulosController",
        controllerAs: "ar"
      })
      .when("/IniciarSesion", {
        templateUrl: "views/login.html",
        controller: "sesionController"
      })
      .when("/Juegos/PPTLS", {
        templateUrl: "views/Juegos/PPTLS/pptls.html",
        controller: "pptslController",
        controllerAs: "pptsl"
      })
      .when("/Juegos/PPTLS/Jugar", {
        templateUrl: "views/Juegos/PPTLS/jugar.html",
        controller: "pptslController",
        controllerAs: "pptsl"
      })
      .when("/Juegos/Suma", {
        templateUrl: "views/Juegos/Suma/suma.html",
        controller: "sumaController",
        controllerAs: "sumaMM"
      })
      .when("/Juegos/Suma/Probar", {
        templateUrl: "views/Juegos/Suma/probar.html",
        controller: "sumaController",
        controllerAs: "sumaMM"
      })
      .when("/Northwind/Clientes", {
        templateUrl: "views/Northwind/index.html",
        controller: "clienteController",
        controllerAs: "clientesN"
      })
      .when("/Northwind/Clientes/:id", {
        templateUrl: "views/Northwind/detalle.html",
        controller: "detalleClienteController",
        controllerAs: "clientesN"
      })
      .when("/Northwind/Clientes/:tipo/:id", {
        templateUrl: "views/Northwind/detalle.html",
        controller: "editarClienteController",
        controllerAs: "clientesN"
      })
      .when("/Northwind/Proveedores", {
        templateUrl: "views/Northwind/Proveedores/index.html",
        controller: "proveedoresController",
        controllerAs: "proveedoresN"
      })
      .when("/Northwind/Productos", {
        templateUrl: "views/Northwind/index.html",
        controller: "productosController",
        controllerAs: "productosN"
      })
      .when("/Northwind/Productos/:id", {
        templateUrl: "views/Northwind/detalle.html",
        controller: "editarProductosController",
        controllerAs: "productosN"
      })
      .when("/Northwind/Ordenes", {
        templateUrl: "views/Northwind/index.html",
        controller: "ordenesController",
        controllerAs: "ordenesN"
      })
      .when("/Northwind/Ordenes/:id", {
        templateUrl: "views/Northwind/detalle.html",
        controller: "editarOrdenesController",
        controllerAs: "ordenesN",
        resolve: { modalOrderId: function () { return null }, $uibModalInstance: function () { return null } }
      })
      .otherwise({
        redirectTo: "/IniciarSesion",
      });
  });
