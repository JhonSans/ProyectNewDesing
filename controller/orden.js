app.controller("ordenCtrl", function ($http) {
    var vm = this;
  
    // Objetos
    vm.ordenDato = { id: "" };
    vm.opciones = { error: "", misOrdenes: [], miOrden: [] };
    vm.validacion = {
      errorLetra: "Ingresaste valores invalidos o se encuentra vacío...",
    };
  
    // Obtiene todos los datos de los clientes
    $http.get("https://localhost:7247/api/Orders").then(function (res) {
      vm.opciones.misOrdenes = res.data;
    });
  });
  