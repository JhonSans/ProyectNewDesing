app.controller("iniciarCtrl", function ($scope, $location) {
  var vm = this;

  // Objetos iniciar sesion
  vm.usuario = { usuario: "Jhonatan", contrasena: "1234" };
  vm.input = { usuario: "", contrasena: "" };

  // Objeto error
  vm.error = ""

  // Funcion validacion de datos
  vm.validarDatos = function (data) {

    // Valida si los datos son correctos
    if (
      vm.usuario.usuario === data.usuario &&
      vm.usuario.contrasena === data.contrasena
    ) {
      // Envia la respuesta a el main
      $scope.$parent.$parent.main.logueado = true;
      $scope.$parent.$parent.main.usuario = vm.usuario.usuario;
      
      // Redigire al inicio
      $location.path("/");

    } else {

      // Muestra el error
      vm.error = "Los datos que ingresaste son incorrectos..."
    }
  };

  // Funcion cerrar alerta
  vm.cerrarAlerta = function () {
    vm.error = "";
  }
});
