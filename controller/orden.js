app.controller("ordenCtrl", function ($http) {
  var vm = this;

  // Objetos
  vm.ordenDato = { id: "" };
  vm.opciones = { error: "", misOrdenes: [], miOrden: [], clienteArray: [] };
  vm.validacion = {
    errorLetra: "Ingresaste valores invalidos o se encuentra vacío...",
  };

  //////////////////////// METODO GET ORDENES ////////////////////////
  $http.get("https://localhost:7247/api/Orders").then(function (respuesta) {
    vm.opciones.misOrdenes = respuesta.data;

    for (let i = 0; i < vm.opciones.misOrdenes.length; i++) {

      //////////// METODO GET CLIENTES ////////////
      $http
        .get("https://localhost:7247/api/Customers/" + vm.opciones.misOrdenes[i].customerId)
        .then(function (respuesta) {
          // Agrega los datos a la variable
          vm.opciones.clienteArray = respuesta.data;
        });
    }
  });
});
