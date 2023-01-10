app.controller("iniciarCtrl", function ($scope, $location) {
  var vm = this;

  vm.usuario = { usuario: "Jhonatan", contrasena: "1234" };

  vm.input = { usuario: "", contrasena: "" };

  vm.validarDatos = function (data) {
    console.log(data);

    if (
      vm.usuario.usuario === data.usuario &&
      vm.usuario.contrasena === data.contrasena
    ) {
      console.log("Iguales");
      $scope.$parent.$parent.main.logueado = true;
      $location.path("/")

    } else {
      console.log("Diferentes");
    }
  };
});
