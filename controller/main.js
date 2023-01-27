//Main App Module + Dependencia Route/Animate/Touch/BootstrapUI
var app = angular.module("MainApp", [
  "ngRoute",
  "ngAnimate",
  "ngTouch",
  "ui.bootstrap",
  "ngSanitize",
]);

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
