app.controller("editarProductosController", function ($scope, $routeParams, NorthProductos, toastr, $location) {
    var vm = this;
    // Mode edicion
    vm.esEdicion = false;
    // Objeto producto
    vm.producto = null;

    // Constructor
    vm.init = function () {
        // Valida si esta en modo edición
        vm.esEdicion = $routeParams.id == "Nuevo" ? false : true;
        // Valida si es edicion
        if (vm.esEdicion) {
            // Obtiene el producto obtenido por su ID
            NorthProductos.get({ productId: $routeParams.id }, function (respuesta) {
                // Agrega los datos al objeto
                vm.producto = respuesta;             
            });
        }
    }
    // Funcion contructor
    vm.init();
});