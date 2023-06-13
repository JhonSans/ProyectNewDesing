app.controller("editarClienteController", function ($scope, $routeParams, NorthClientes, toastr, $location, $uibModal, NorthOrdenes, $timeout) {
    var vm = this;

    // Configuracion
    $scope.loading = false;
    $scope.esEdicion = true;
    $scope.backRute = "/Northwind/Clientes";
    $scope.mainRute = "/views/Northwind/Clientes/editar.html";

    // Variables
    vm.esEdicion = false;
    vm.requerido = false;
    
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

        // Valida los campos
        if (!vm.cliente || !vm.cliente.customerId || !vm.cliente.companyName || !vm.cliente.contactName) {
            vm.requerido = true;
            toastr.warning("Valide que todos los campos requeridos estén llenos", "Atención");
            return;
        }

        $scope.loading = true;

        // Valida si esta en modo edicion
        if (!vm.esEdicion) {
            // Ejecuta la funcion
            NorthClientes.crearCliente(vm.cliente, function (respuesta) {

                // Oculta cargando
                $timeout(function () {
                    $scope.loading = false;

                    toastr.success("El cliente ha sido creado satísfactoriamente", "Cliente " + respuesta.customerId);

                    // Redirigue a la lista de clientes
                    $location.path('/Northwind/Clientes/' + respuesta.customerId);
                }, 500);
                
            }, function (error) {
                // Obtiene el mensaje de error
                var message = error.data.replace("System.Exception: ", "").split("\r\n");
                toastr.error(message[0], "ERROR " + error.status);
                $scope.loading = false;
            });
        }
        else {           
            // Ejecuta la funcion
            NorthClientes.modificarCliente(vm.cliente, function (respuesta) {

                // Oculta cargando
                $timeout(function () {
                    $scope.loading = false;

                    toastr.success("El cliente ha sido modificado satísfactoriamente", "Cliente " + respuesta.customerId);

                    // Redirigue a la lista de clientes
                    $location.path('/Northwind/Clientes/' + respuesta.customerId);
                }, 500);

            }, function (error) {
                // Obtiene el mensaje de error
                var message = error.data.replace("System.Exception: ", "").split("\r\n");
                toastr.error(message[0], "ERROR " + error.status);
                $scope.loading = false;
            });

        }
    }
    // Funcion contructor
    vm.init();
});