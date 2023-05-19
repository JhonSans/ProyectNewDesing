app.controller("modalProducto", function (producto, $uibModalInstance) {
    var vm = this;

    // Vairables
    vm.esEdicion = false;

    // Objetos
    vm.producto = producto;

    // Constructor
    vm.init = function () {
        if (vm.producto)
            vm.esEdicion = true;
    }

    // Funcion guardar
    vm.guardar = function () {
        $uibModalInstance.close(producto);
    }

    // Funcion cancelar
    vm.cancelar = function () {
        $uibModalInstance.dismiss('cancelar');
    }

    // Ejecuta el constructor
    vm.init();
});