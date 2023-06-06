app.controller("detalleClienteController", function ($routeParams, $scope, $timeout, $uibModal, toastr, NorthClientes, NorthOrdenes) {
    // Configuracion
    var vm = this;
    $scope.esEdicion = false;
    $scope.loading = false;
    $scope.mainRute = "/views/Northwind/Clientes/detalles.html";
    $scope.backRute = "/Northwind/Clientes";
    
    // Objetos
    vm.cliente = null;
    vm.img = [
        "/content/pictures/Northwind/Clientes/user-1.png",
        "/content/pictures/Northwind/Clientes/user-2.png",
        "/content/pictures/Northwind/Clientes/user-3.png",
        "/content/pictures/Northwind/Clientes/user-4.png",
        "/content/pictures/Northwind/Clientes/user-5.png",
        "/content/pictures/Northwind/Clientes/user-6.png"
    ];

    // Constructor
    vm.init = function () {

        $scope.loading = true;

        // Obtiene la informacion del cliente
        NorthClientes.get({ customerId : $routeParams.id }, function (respuesta) {

            // Oculta cargando
            $timeout(function () {
                $scope.loading = false;
            }, 1000);

            // Agrega los datos al objeto
            vm.cliente = respuesta;

            // Agrega una img aleatoria al cliente
            vm.cliente.photo = vm.img[Math.floor(Math.random() * vm.img.length)];
        });
    }

    // Funcion abrir orden
    vm.abrirOrden = function (order) {

        // Ajusta los parametros para crear una orden
        if (order == "Nuevo")
            order = { orderId: 0, customerId: vm.cliente.customerId, shipAddress: vm.cliente.address, shipCity: vm.cliente.city, shipCountry: vm.cliente.country };

        // Configuracion del modal
        var modalInstance = $uibModal.open({
            templateUrl: 'views/Northwind/Clientes/modal-orden.html',
            controller: 'editarOrdenesController',
            controllerAs: 'ordenesN',
            size: 'lg',
            backdrop: "static",
            keyboard: false,
            resolve: {
                modalOrderId: function () {
                    return order;
                }
            }
        });

        // Resultado del modal
        modalInstance.result.then(function (order) {

            $scope.loading = true;

            // Valida si se esta creando o editando
            if (order.orderId) {
                NorthOrdenes.modificarOrden(order, function (respuesta) {
    
                    // Oculta cargando
                    $timeout(function () {
                        $scope.loading = false;

                        // Alerta
                        toastr.success("La orden ha sido modificada satisfactoriamente", "Orden #" + respuesta.orderId);

                        // Ajusta el id del cliente
                        $routeParams.id = vm.cliente.customerId;

                        // Ejecuta el constructor
                        vm.init();
                    }, 500);
    
                }, function (error) {
                    // Obtiene el mensaje de error
                    var message = error.data.replace("System.Exception: ", "").split("\r\n");
                    toastr.error(message[0], "ERROR " + error.status);
                    $scope.loading = false;
                });
            }
            else {
                NorthOrdenes.crearOrden(order, function (respuesta) {

                    // Oculta cargando
                    $timeout(function () {
                        $scope.loading = false;

                        // Alerta
                        toastr.success("La orden a sido creada satisfactoriamente", "Orden #" + respuesta.orderId);

                        // Ajusta el id del cliente
                        $routeParams.id = vm.cliente.customerId;

                        // Ejecuta el constructor
                        vm.init();
                    }, 500);
    
                }, function (error) {
                    // Obtiene el mensaje de error
                    var message = error.data.replace("System.Exception: ", "").split("\r\n");
                    toastr.error(message[0], "ERROR " + error.status);
                    $scope.loading = false;
                });
            }
        }, function (error) {
            $scope.loading = false;
            console.log(error);
        });
    }

    // Funcion eliminar orden
    vm.eliminarOrden = function (orden) {

        bootbox.confirm({
            title: "Eliminar",
            message: "Desea eliminar la orden #" + orden.orderId + "?",
            buttons: {
                cancel: { label: '<i class="fa fa-times"></i> Cancelar' },
                confirm: { label: '<i class="fa fa-check"></i> Confirmar' }
            },
            callback: function (resultado) {
                if (resultado) {
                    NorthOrdenes.delete({ orderId: orden.orderId }, function () {  
                        toastr.success("La orden #" + orden.orderId + " ha sido eliminada satisfactoriamente", "Orden #" + orden.orderId);
                        // Ajusta el id del cliente
                        $routeParams.id = vm.cliente.customerId;
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

    // Ejecuta el contructor al iniciar
    vm.init();
});