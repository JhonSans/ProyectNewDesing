app.controller("clienteController", function (NorthClientes, toastr, $scope, $timeout) {
    var vm = this;

    $scope.loading = false;
    $scope.mainRute = "/views/Northwind/Clientes/index.html";
    $scope.addRute = "/Northwind/Clientes/Nuevo/Cliente";
    $scope.busqueda = null;

    // Var id cliente
    vm.idCliente = "";

    // Objeto clientes
    vm.clientes = null;

    //Objeto clientes copia
    vm.clientesCopia = null;

    // Objeto paginador
    $scope.paginador = {
        totalItems: 0,
        totalItemsCopia: 0,
        paginaActual: 0,
        itemsPagina: 10,
        tamanoMax: 5
    };

    // Funcion inicial
    vm.init = function () {
        $scope.loading = true;

        // Obtiene todos los clientes
        NorthClientes.get({ pg: $scope.paginador.paginaActual }, function (respuesta) {

            // Oculta cargando
            $timeout(function () {
                $scope.loading = false;
            }, 1000);

            // Agrega la informacion de los clientes al objeto
            vm.clientes = respuesta.data;

            // Realiza la copia de la lista de clientes
            vm.clientesCopia = vm.clientes;

            // Obtiene el total de los clientes
            $scope.paginador.totalItems = respuesta.count;

            // Realiza una copia del total de clientes
            $scope.paginador.totalItemsCopia = $scope.paginador.totalItems;
        });
    }
    
    // Funcion cambiar de pagina
    $scope.cambiarPagina = function () {
        // Obtiene todos los clientes de la siguiente pagina
        NorthClientes.get({ pg: $scope.paginador.paginaActual - 1 }, function (respuesta) {
            // Agrega la informacion de los clientes al objeto
            vm.clientes = respuesta.data;
        });
    }

    // Funcion buscar una orden
    $scope.buscarElemento = function () {
        // Si el campo no tiene elementos regresa al listado completo
        if (!$scope.busqueda) {
            vm.clientes = vm.clientesCopia;
            
            // Actualiza el contador de paginas
            $scope.paginador.totalItems = $scope.paginador.totalItemsCopia;
            return;
        }
        // Obtiene la orden por id
        NorthClientes.get({ customerId: $scope.busqueda }, function (respuesta) {

            // Agrega la respuesta
            vm.clientes = [respuesta];
            
            // Actualiza el contador de paginas
            $scope.paginador.totalItems = vm.clientes.lengt;

        }, function (error) {
            // Obtiene el mensaje de error
            var message = error.data.replace("System.Exception: ", "").split("\r\n");
            toastr.error(message[0], "ERROR " + error.status);
        });
    }
    // Funcion eliminar
    vm.eliminar = function (id) {

        bootbox.confirm({
            title: "Eliminar",
            message: "Desea eliminar a el cliente " + id + "?",
            buttons: {
                cancel: { label: '<i class="fa fa-times"></i> Cancelar' },
                confirm: { label: '<i class="fa fa-check"></i> Confirmar'}
            },
            callback: function (resultado) {
                if (resultado) {
                    // Ejecuta la funcion
                    NorthClientes.remove({ customerId: id }, function (respuesta) {

                        toastr.success("El cliente ha sido eliminado satísfactoriamente", "Cliente " + id);

                        // Limpia la variable
                        vm.idCliente = "";

                        //Regresa a la primera pagina
                        $scope.paginador.paginaActual = 0;
                        
                        // Ejecuta la funcion inicial
                        vm.init();

                    }, function (error) {
                        // Obtiene el mensaje de error
                        var message = error.data.replace("System.Exception: ", "").split("\r\n");
                        toastr.error(message[0], "ERROR " + error.status);
                    });
                }
            }
        });
    }
    // Funcion contructor
    vm.init();
});