app.controller("proveedoresController", function ($scope, $timeout, toastr, NorthProveedores) {
    
    // Configuracion
    var vm = this;
    $scope.loading = false;
    $scope.busqueda = null;
    $scope.mainRute = "/views/Northwind/Proveedores/index.html";

    // Objeto proveedores
    vm.proveedores = null;
    vm.proveedoresCopia = null;

    // Paginador
    $scope.paginador = {
        totalItems: 0,
        totalItemsCopia: 0,
        paginaActual: 0,
        itemsPagina: 10,
        tamanoMax: 5
    };

    // Constructor
    vm.init = function () {

        $scope.loading = true;

        // Obtiene los proveedores
        NorthProveedores.get({ pg: $scope.paginador.paginaActual }, function (respuesta) {
            // Agrega el resultado al objeto
            vm.proveedores = respuesta.data;
            // Crea una copia del resultado
            vm.proveedoresCopia = angular.copy(vm.proveedores);
            // Obtiene el total de los proveedores
            $scope.paginador.totalItems = respuesta.count;
            // Crea una copia del total de items
            $scope.paginador.totalItemsCopia = angular.copy($scope.paginador.totalItems);
            // Oculta cargando
            $timeout(function () {
                $scope.loading = false;
            }, 1000);
        });
    }

    // Funcion cambiar pagina
    $scope.cambiarPagina = function () {
        // Obtiene los proveedores de la siguiente pagina
        NorthProveedores.get({ pg: $scope.paginador.paginaActual - 1 }, function (respuesta) {
            // Actualiza el resultado del objeto
            vm.proveedores = respuesta.data;
        });
    }

    // Funcion buscar un proveedor
    $scope.buscarElemento = function () {
        // Si el campo no tiene elementos regresa al listado completo
        if (!$scope.busqueda) {
            vm.proveedores = vm.proveedoresCopia;

            // Actualiza el contador de paginas
            $scope.paginador.totalItems = $scope.paginador.totalItemsCopia;
            return;
        }
        // Obtiene un producto por id
        NorthProveedores.get({ supplierId: $scope.busqueda }, function (respuesta) {
            // Agrega la respuesta
            vm.proveedores = [respuesta];
            // Actualiza el contador de paginas
            $scope.paginador.totalItems = vm.proveedores.lengt;
        }, function (error) {
            var message = error.data.replace("System.Exception: ", "").split("\r\n");
            toastr.error(message[0], "ERROR " + error.status);
        });
    }

    // Constructor
    vm.init();
});