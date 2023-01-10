app.controller("iniciarCtrl", function ($scope, $location) {
  var vm = this;

  vm.usuario = { usuario: "Jhonatan", contrasena: "1234" };

  vm.input = { usuario: "", contrasena: "" };

  vm.error = ""

  vm.validarDatos = function (data) {
    console.log(data);

    if (
      vm.usuario.usuario === data.usuario &&
      vm.usuario.contrasena === data.contrasena
    ) {
      $scope.$parent.$parent.main.logueado = true;
      $scope.$parent.$parent.main.usuario = vm.usuario.usuario;
      $location.path("/")

    } else {
        vm.error = "Los datos son incorrectos..."
    }
  };

  vm.cerrarAlerta = function () {
    vm.error = "";
  }
});
