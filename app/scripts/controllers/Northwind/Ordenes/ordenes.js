app.controller("ordenesController", function (NorthOrdenes, toastr, $scope) {
    var vm = this;

    $scope.mainRute = "/views/Northwind/Ordenes/index.html";
    $scope.addRute = "/Northwind/Ordenes/Nuevo";    

    // Objetos
    $scope.busqueda = null;
    vm.ordenes = null;
    vm.ordenesCopia = null;

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
        // Obtiene todas las ordenes
        NorthOrdenes.get({ pg: vm.paginador.paginaActual }, function (respuesta) {
            
            // Agrega la informacion al objeto
            vm.ordenes = respuesta.data;

            // Formatea las fechas de cada orden
            vm.ordenes = _.each(vm.ordenes, function (o) { o.orderDate = moment(o.orderDate).format("DD-MM-YYYY"); });
            
            // Realiza una copia del listado
            vm.ordenesCopia = angular.copy(vm.ordenes);
            
            // Obtiene el total de las ordenes
            vm.paginador.totalItems = respuesta.count;
            
            // Realiza una copia del total de las ordenes
            vm.paginador.totalItemsCopia = vm.paginador.totalItems;
        });
    }

    // Funcion cambiar de pagina
    vm.cambiarPagina = function () {
        // Obtiene todas las ordenes de la siguiente pagina
        NorthOrdenes.get({ pg: vm.paginador.paginaActual - 1 }, function (respuesta) {
            
            // Agrega la informacion de las ordenes
            vm.ordenes = respuesta.data;
            
            // Formatea las fechas de cada orden
            vm.ordenes = _.each(vm.ordenes, function (o) { o.orderDate = moment(o.orderDate).format("DD-MM-YYYY"); });
        });
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
            vm.ordenes = _.each(vm.ordenes, function (o) { o.orderDate = moment(o.orderDate).format("DD-MM-YYYY"); });
            
            // Actualiza el contador de paginas
            vm.paginador.totalItems = vm.ordenes.lengt;

        }, function (error) {
            toastr.error("La orden #" + $scope.busqueda + " no existe", "Error " + error.status);
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
                        toastr.error("Ocurrió un error al eliminar la orden #" + orden.orderId, "Error " + error.status);
                    });
                }
            }
        });
    }
    // Constructor
    vm.init();
});