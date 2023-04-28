app.controller("editarOrdenesController", function ($routeParams, NorthOrdenes) {
    var vm = this;
    // Variables
    vm.esEdicion = false;
    // Objetos
    vm.orden = null;

    // Contructor
    vm.init = function () {
        // Valida si esta en modo edicion
        vm.esEdicion = $routeParams.id == "Nuevo" ? false : true;
        // Valida si es edicion
        if (vm.esEdicion) {
            // Obtiene la orden obtenida por su id
            NorthOrdenes.get({ orderId: $routeParams.id }, function (respuesta) {
                // Agrega los datos al objeto
                vm.orden = respuesta;
            });
        }
    }
    // Constructor
    vm.init();
});