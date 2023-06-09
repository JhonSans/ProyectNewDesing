app.controller("editarProveedor", function ($routeParams, $scope, $timeout, toastr, NorthProveedores) {
    
    // Configuracion
    var vm = this;
    $scope.esEdicion = true;
    $scope.loading = false;
    $scope.backRute = "/Northwind/Proveedores";
    $scope.mainRute = "/views/Northwind/Proveedores/editar.html";

    // Objetos
    vm.esEdicion = false;
    vm.proveedor = null;

    // Constructor
    vm.init = function () {

        $scope.loading = true;

        // Valida si se esta creando
        vm.esEdicion = $routeParams.id == "Nuevo" ? false : true;

        // Si esta editando
        if (vm.esEdicion) {
            
            // Obtiene los proveedores
            NorthProveedores.get({ supplierId: $routeParams.id }, function (respuesta) {

                vm.proveedor = respuesta;

                // Oculta cargando
                $timeout(function () {
                    $scope.loading = false;
                }, 1000);

            }, function (error) {
                $scope.loading = false;
                var message = error.data.replace("System.Exception: ", "").split("\r\n");
                toastr.error(message[0], "ERROR " + error.status);
            });
        }
    }

    vm.init();
});