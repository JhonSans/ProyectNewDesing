app.controller("productosCtrl", function ($http, $uibModal) {
  var vm = this;

  // Objetos
  vm.productosDato = { id: "", misProductos: [], miProducto: [] };
  vm.opciones = { error: "" };
  vm.validacion = {
    errorDato:
      "El dato que buscas no se encuentra registrado o se encuentra vacío...",
  };

  //////////////////////// METODO GET PRODUCTOS ////////////////////////
  $http.get("https://localhost:7247/api/Products").then(function (respuesta) {
    vm.productosDato.misProductos = respuesta.data;
  });

  //////////////////////// METODO GET PRODUCTO {ID} ////////////////////////
  vm.buscarProducto = function (id) {
    // Obtiene los datos de un producto solicitado por su id
    $http
      .get("https://localhost:7247/api/Products/" + parseInt(id))
      .then(function (respuesta) {
        // Agrega los datos a la variable
        vm.productosDato.miProducto = respuesta.data;
        // Limpia error
        vm.opciones.error = "";

        console.log(vm.productosDato.miProducto)
      })
      .catch(function (respuesta) {
        // Capta el error
        vm.opciones.error =
          "Error " + respuesta.status + " - " + vm.validacion.errorDato;

        // Limpia variables
        vm.productosDato.miProducto = [];
      });
  };

  //Funcion cerrar alerta
  vm.cerrarAlerta = function () {
    vm.opciones.error = "";
  };

});
