app.controller("editarClienteController", function ($scope, $routeParams, NorthClientes, toastr, $location, $uibModal, NorthOrdenes, $timeout) {
    var vm = this;

    // Configuracion
    $scope.loading = false;
    $scope.esEdicion = true;
    $scope.backRute = "/Northwind/Clientes";
    $scope.mainRute = "/views/Northwind/Clientes/editar.html";

    // Variables
    vm.esEdicion = false;
    
    // Objetos
    vm.cliente = { photo: "/content/pictures/Northwind/Clientes/user.png" };
    vm.orden = null;

    // Contructor
    vm.init = function () {

        // Obtiene los parametros de para validar si se esta editando
        vm.esEdicion = $routeParams.tipo == "Nuevo" ? false : true;

        // Valida si es edición
        if (vm.esEdicion) {

            $scope.loading = true;

            // Obtiene al cliente obtenido por su ID, Nombre o Empresa
            NorthClientes.get({ customerId : $routeParams.id }, function (respuesta) {

                // Oculta cargando
                $timeout(function () {
                    $scope.loading = false;
                }, 1000);

                // Agrega los datos al objeto
                vm.cliente = respuesta;
            });
        }
    }

    // Funcion guardar
    $scope.guardar = function () {
        // Valida si esta en modo edicion
        if (!vm.esEdicion) {
            // Ejecuta la funcion
            NorthClientes.crearCliente(vm.cliente, function (respuesta) {
                // Valida el resultado
                if (respuesta.success) {
                    // Muestra la alerta
                    toastr.success(respuesta.message, "Cliente");
                    // Redirigue a la lista de clientes
                    $scope.actualizarContenido('/Northwind/Clientes');
                }
                else {
                    // Muestra la alerta
                    toastr.error(respuesta.message, "Cliente");
                }
            });
        }
        else {           
            // Ejecuta la funcion
            NorthClientes.modificarCliente(vm.cliente, function (respuesta) {
                // Valida el resultado
                if (respuesta.success) {
                    // Muestra la alerta
                    toastr.success(respuesta.message, "Cliente");
                    // Redirigue a la lista de clientes
                    $location.path('/Northwind/Clientes/' + $routeParams.id);
                }
                else {
                    // Muestra la alerta
                    toastr.error(respuesta.message, "Cliente");
                }
            });
        }    
    }
    // Funcion contructor
    vm.init();
});