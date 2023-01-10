//Config Routing Page
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/main.html",
    })
    .when("/game-1", {
      templateUrl: "views/game-1.html",
      controller: "miPrimerJuego"
    })
    .when("/game-2", {
      templateUrl: "views/game-2.html",
      controller: "miSegundoJuego"
    })
    .when("/cliente", {
      templateUrl: "views/cliente.html",
      controller: "clienteCtrl"
    })
    .when("/productos", {
      templateUrl: "views/productos.html",
      controller: "productosCtrl"
    })
    .when("/orden", {
      templateUrl: "views/orden.html",
      controller: "ordenCtrl"
    })
    .when("/iniciar-sesion", {
      templateUrl: "views/iniciar-sesion.html",
      controller: "iniciarCtrl"
    });
});
