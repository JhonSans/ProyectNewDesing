app.controller("editarClienteController", function ($routeParams, NorthClientes) {
    var vm = this;

    vm.cliente = null;

    vm.init = function () {
        // Obtiene al cliente obtenido por su ID, Nombre o Empresa
        NorthClientes.get({ customerId : $routeParams.id }, function (respuesta) {
            // Agrega los datos al objeto
            vm.cliente = respuesta;
        });
    }

    vm.init();
});