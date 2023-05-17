app.controller("proveedoresController", function (NorthProveedores, toastr) {
    var vm = this;

    // Objeto proveedores
    vm.proveedores = null;
    // Objeto paginador
    vm.paginador = {
        totalItems: 0,
        totalItemsCopia: 0,
        paginaActual: 0,
        itemsPagina: 10,
        tamanoMax: 5
    }
    // Constructor
    vm.init = function () {
        // Obtiene los proveedores
        NorthProveedores.get({ pg: vm.paginador.paginaActual }, function (respuesta) {
            // Agrega el resultado al objeto
            vm.proveedores = respuesta.data;
            // Obtiene el total de los proveedores
            vm.paginador.totalItems = respuesta.count;
        });
    }
    // Funcion cambiar pagina
    vm.cambiarPagina = function () {
        // Obtiene los proveedores de la siguiente pagina
        NorthProveedores.get({ pg: vm.paginador.paginaActual - 1 }, function (respuesta) {
            // Actualiza el resultado del objeto
            vm.proveedores = respuesta.data;
        });
    }
    // Constructor
    vm.init();
});