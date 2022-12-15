app.controller("ordenCtrl", function ($http) {
  var vm = this;

  // Objetos
  vm.ordenDato = { id: "", misOrdenes: [], miOrden: [] };
  vm.opciones = { error: "" };
  vm.validacion = {
    errorDato:
      "El dato que buscas no se encuentra registrado o se encuentra vacío...",
  };

  //////////////////////// METODO GET ORDENES ////////////////////////
  $http.get("https://localhost:7247/api/Orders").then(function (respuesta) {
    vm.ordenDato.misOrdenes = respuesta.data;
  });

  //////////////////////// METODO GET ORDEN {ID} ////////////////////////
  vm.buscarOrden = function (id) {
    // Obtiene los datos de laorden solicitada por su id
    $http
      .get("https://localhost:7247/api/Orders/" + parseInt(id))
      .then(function (respuesta) {
        // Agrega los datos a la variable
        vm.ordenDato.miOrden = respuesta.data;
        // Limpia error
        vm.opciones.error = "";
      })
      .catch(function (respuesta) {
        // Capta el error
        vm.opciones.error =
          "Error " + respuesta.status + " - " + vm.validacion.errorDato;
        // Limpia variables
        vm.ordenDato.miOrden = [];
      });
  };
});
