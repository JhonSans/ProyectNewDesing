//Main App Module + Dependencia Route/Animate/Touch/BootstrapUI
var app = angular.module("MainApp", [
  "ngRoute",
  "ngAnimate",
  "ngTouch",
  "ui.bootstrap",
  "ngSanitize"
]);

app.controller("mainCtrl", function($scope) {
  var vm = this;

  vm.logueado = false;

  $scope.setLogueado = function(val)
  {
    vm.logueado = val;

  }

});