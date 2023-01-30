//Main App Module + Dependencia Route/Animate/Touch/BootstrapUI
var app = angular.module("MainApp", [
  "ngRoute",
  "ngAnimate",
  "ngTouch",
  "ui.bootstrap",
  "ngSanitize",
]);

//Controlador carrusel
app.controller("mainCarrusel", function () {
  var vm = this;

  //Intervalo transicion
  vm.miIntervalo = 5000;
  //Activo inicial
  vm.active = 0;
  //Lista de imagenes
  vm.listaSlides = [
    { id: 0, img: "/img/main-1.jpg", info: "HTML + CSS" },
    { id: 1, img: "/img/main-2.png", info: "Bootstrap 3" },
    { id: 2, img: "/img/main-3.jpg", info: "AngularJS" },
  ];
});

app.controller("mainCtrl", function ($scope) {
  var vm = this;

  vm.fecha = new Date();

  // Variable sesion
  vm.logueado = false;

  // Variable error
  vm.error = true;

  // Variable usuario
  vm.usuario = "";

  // Funcion validar información
  $scope.setLogueado = function (val) {
    vm.logueado = val;
  };

  // Funcion cerrar alerta
  vm.cerrarAlerta = function () {
    vm.error = false;
  };
});
