app.controller("detalleProveedorController", function ($routeParams, $scope, $timeout, $uibModal, toastr, NorthProductos, NorthProveedores) {
    
    // Configuracion
    var vm = this;
    $scope.esEdicion = false;
    $scope.loading = false;
    $scope.mainRute = "/views/Northwind/Proveedores/detalles.html";
    $scope.backRute = "/Northwind/Proveedores";
    $scope.include = "/views/Northwind/Productos/index.html";

    // Objetos
    vm.img = "/content/pictures/Northwind/Proveedores/proveedores.png";
    vm.proveedor = null;
    vm.productos = null;

    // Constructor
    vm.init = function () {

        $scope.loading = true;

        // Obtiene los proveedores
        NorthProveedores.get({ supplierId: $routeParams.id }, function (respuesta) {

            vm.proveedor = respuesta;

            // Agrega la imagen al proveedor
            vm.proveedor.photo = vm.img;

            // Oculta cargando
            $timeout(function () {
                $scope.loading = false;
            }, 1000);

        }, function (error) {
            $scope.loading = false;
            var message = error.data.replace("System.Exception: ", "").split("\r\n");
            toastr.error(message[0], "ERROR " + error.status);
        });

        // Obtiene los productos
        NorthProductos.query({ supplier: $routeParams.id }, function (respuesta) {

            $scope.productos = respuesta;

        }, function (error) {
            var message = error.data.replace("System.Exception: ", "").split("\r\n");
            toastr.error(message[0], "ERROR " + error.status);
        });
    }

    // Funcion modal producto
    $scope.detallesProducto = function (producto) {
        // Configuracion del modal
        var modalInstance = $uibModal.open({
            templateUrl: 'views/Northwind/Proveedores/modal-producto.html',
            controller: 'modalProductoController',
            controllerAs: 'modalProducto',
            size: 'lg',
            backdrop: "static",
            keyboard: false,
            resolve: {
                producto: function () {
                    return producto;
                }
            }
        });
        // Resultado del modal
        modalInstance.result.then(function (producto) {
            console.log(producto);

        }, function (error) {
            console.log(error);
        });
    }

    vm.init();
});