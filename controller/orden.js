app.controller("ordenCtrl", function ($http) {
  var vm = this;

  // Objetos
  vm.ordenDato = { id: "", misOrdenes: [], miOrden: [] };
  vm.opciones = { error: "" };
  vm.validacion = {
    errorDato:
      "El dato que buscas no se encuentra registrado o se encuentra vacío...",
  };

  // Paginador
  vm.paginador = {
    totalItems: 0,
    paginaActual: 0,
    itemsPagina: 10,
    tamanoMax: 5
  };

  // Funcion cambiar pagina
  vm.cambiarPagina = function () {
    //////////////////////// METODO GET ORDENES PAGINADOR ////////////////////////
    $http
      .get("https://localhost:7247/api/Orders?pg=" + (vm.paginador.paginaActual -1))
      .then(function (respuesta) {
        vm.ordenDato.misOrdenes = respuesta.data.data;
      });
  };

  //////////////////////// METODO GET ORDENES ////////////////////////
  $http
    .get("https://localhost:7247/api/Orders?pg=" + vm.paginador.paginaActual)
    .then(function (respuesta) {
      vm.ordenDato.misOrdenes = respuesta.data.data;

      vm.paginador.totalItems = respuesta.data.count;
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
