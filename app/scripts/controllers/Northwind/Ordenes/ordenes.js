app.controller("ordenesController", function (NorthOrdenes, NorthClientes, NorthEmpleados, toastr, $scope, $timeout) {
    var vm = this;

    $scope.loading = false;
    $scope.mainRute = "/views/Northwind/Ordenes/index.html";
    $scope.addRute = "/Northwind/Ordenes/Nuevo";    

    // Objetos
    $scope.busqueda = null;
    vm.ordenes = null;
    vm.ordenesCopia = null;
    vm.clientes = [];
    vm.empleados = [];
    vm.filtro = { customerId: null, employeeId: null }

    // Paginador
    vm.paginador = {
        totalItems: 0,
        totalItemsCopia: 0,
        paginaActual: 0,
        itemsPagina: 10,
        tamanoMax: 5
    }

    // Constructor
    vm.init = function () {
        $scope.loading = true;

        // Obtiene los clientes
        NorthClientes.query(function (respuesta) {
            // Filtra el resultado y agrega los usuarios al objeto
            _.filter(respuesta, function (r) { 
                vm.clientes.push({ customerId: r.customerId, contactName: r.contactName});
            });

            // Obtiene los unicos
            vm.paises = _.uniq(vm.paises, function (p) { return p });

            // Ordena la lista de usuarios
            vm.clientes = _.sortBy(vm.clientes, function (c) { return c.contactName });

            // Agrega la primera opcion
            vm.clientes.unshift({ customerId: null, contactName: "Todos" });
        });

        // Obtiene los empleados
        NorthEmpleados.query(function (respuesta) {
            // Filtra el resultado y agrega los usuarios al objeto
            _.filter(respuesta, function (r) { vm.empleados.push({ employeeId: r.employeeId, contactName: r.firstName + " " + r.lastName }); });

            // Ordena la lista de usuarios
            vm.empleados = _.sortBy(vm.empleados, function (e) { return e.contactName });

            // Agrega la primera opcion
            vm.empleados.unshift({ employeeId: null, contactName: "Todos" });
        });
        
        // Obtiene todas las ordenes filtradas
        vm.actualizarFiltro(vm.paginador.paginaActual);
    }

    // Funcion aplicar filtro
    vm.actualizarFiltro = function (paginaActual, actualizar) {

        // Valida que la pagina actual sea la incial para mostrar el loading
        if (actualizar)
            $scope.loading = true;
       
        // Obtiene todas las ordenes
        NorthOrdenes.get({ pg: paginaActual, customerId: vm.filtro.customerId, employeeId: vm.filtro.employeeId }, function (respuesta) {
            
            // Oculta cargando
            $timeout(function () {
                $scope.loading = false;
            }, 1000);

            // Agrega la informacion al objeto
            vm.ordenes = respuesta.data;

            // Formatea las fechas de cada orden
            vm.ajustesBasicos();
            
            // Realiza una copia del listado
            vm.ordenesCopia = angular.copy(vm.ordenes);
            
            // Obtiene el total de las ordenes
            vm.paginador.totalItems = respuesta.count;
            
            // Realiza una copia del total de las ordenes
            vm.paginador.totalItemsCopia = vm.paginador.totalItems;
        });
    }

    // Funcio formatear fechas
    vm.ajustesBasicos = function () {
        vm.ordenes = _.each(vm.ordenes, function (o) {
            // Obtiene la fecha actual
            var fechaActual = moment().toDate();

            // Valida la fecha actual con las fechas de la orden para determinar su estado
            if (fechaActual < moment(o.orderDate) || fechaActual > moment(o.orderDate) && fechaActual < moment(o.shippedDate))
                o.status = "Pendiente";
            else if (fechaActual > moment(o.shippedDate) && fechaActual < moment(o.requiredDate))
                o.status = "Enviado";
            else if (fechaActual > moment(o.requiredDate))
                o.status = "Entregado";

            // Formatea las fechas para la vista
            o.orderDate = moment(o.orderDate).format("DD-MM-YYYY");
            o.shippedDate = moment(o.shippedDate).format("DD-MM-YYYY");
            o.requiredDate = moment(o.requiredDate).format("DD-MM-YYYY");
        });
    }

    // Funcion cambiar de pagina
    vm.cambiarPagina = function () {
        // Ajusta la pagina
        vm.actualizarFiltro(vm.paginador.paginaActual - 1);
    }
    // Funcion buscar una orden
    $scope.buscarElemento = function () {
        // Si el campo no tiene elementos regresa al listado completo
        if (!$scope.busqueda) {
            vm.ordenes = vm.ordenesCopia;
            
            // Actualiza el contador de paginas
            vm.paginador.totalItems = vm.paginador.totalItemsCopia;
            return;
        }
        // Obtiene la orden por id
        NorthOrdenes.get({ orderId: $scope.busqueda }, function (respuesta) {

            // Agrega la respuesta
            vm.ordenes = [respuesta];
            
            // Formatea las fechas
            vm.ajustesBasicos();
            
            // Actualiza el contador de paginas
            vm.paginador.totalItems = vm.ordenes.lengt;

        }, function (error) {
            // Obtiene el mensaje de error
            var message = error.data.replace("System.Exception: ", "").split("\r\n");
            toastr.error(message[0], "ERROR " + error.status);
        });
    }
    // Funcion eliminar
    vm.eliminar = function (orden) {
        bootbox.confirm({
            title: "Eliminar",
            message: "Desea eliminar la orden #" + orden.orderId + "?",
            buttons: {
                cancel: { label: '<i class="fa fa-times"></i> Cancelar' },
                confirm: { label: '<i class="fa fa-check"></i> Confirmar' }
            },
            callback: function (resultado) {
                if (resultado) {
                    // Ejecuta la funcion
                    NorthOrdenes.delete({ orderId: orden.orderId }, function () {  

                        toastr.success("La orden #" + orden.orderId + " ha sido eliminada satisfactoriamente", "Orden #" + orden.orderId);
                        // Regresa a la primera pagina
                        
                        vm.paginador.paginaActual = 0;
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
    // Constructor
    vm.init();
});