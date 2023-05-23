app.controller("editarOrdenesController", function ($scope, $routeParams, NorthOrdenes, NorthClientes, NorthEmpleados, NorthExpedidores, $uibModal) {
    var vm = this;
    
    $scope.backRute = "/Northwind/Ordenes";
    $scope.mainRute = "/views/Northwind/Ordenes/editar.html";

    // Variables
    vm.esEdicion = false;

    // Objetos
    vm.orden = null;
    vm.date = { orderDate: moment().toDate() };
    vm.costo = { inicial: 0, descuento: 0, total: 0 };
    vm.clientes = [];
    vm.empleados = [];
    vm.expedidores = [];
    vm.imgInicio = { editar: "/content/pictures/Northwind/Ordenes/editar.jpg", crear: "/content/pictures/Northwind/Ordenes/crear.jpg" }
    vm.fechaConfiguracion = {
        formatYear: 'yyyy',
        startingDay: 1,
        f1: false,
        f2: false,
        f3: false
    }

    // Contructor
    vm.init = function () {
        // Valida si esta en modo edicion
        vm.esEdicion = $routeParams.id == "Nuevo" ? false : true;

        // Valida si es edicion
        if (vm.esEdicion) {

            // Obtiene la orden obtenida por su id
            NorthOrdenes.get({ orderId: $routeParams.id }, function (respuesta) {

                // Agrega los datos al objeto
                vm.orden = respuesta;

                // Formatea las fechas
                vm.date.orderDate = moment(vm.orden.orderDate).toDate();
                vm.orden.shippedDate = moment(vm.orden.shippedDate).toDate();
                vm.orden.requiredDate = moment(vm.orden.requiredDate).toDate();

                // Arrays que almacenan los numeros a calcular
                var inicial = [];
                var descuento = [];
                var total = [];

                // Recorre el detalle de la orden
                _.each(vm.orden.orderDetails, function (d) {

                    // Agrega el costo de los productos al array
                    inicial.push(d.productPrice);

                    // Si tiene descuento, lo calcula y lo agrega al array
                    if (d.discount) {
                        descuento.push(parseFloat(Math.abs(d.productPrice * d.discount)));
                        total.push(d.productPrice - parseFloat(Math.abs(d.productPrice * d.discount)));
                    }
                    else {
                        total.push(d.productPrice);
                    }
                });

                // Calcula los costos de la orden
                vm.costo.inicial = _.reduce(inicial, function (memo, numero) { return memo + numero }, 0).toFixed(2);
                vm.costo.descuento = _.reduce(descuento, function (memo, numero) { return memo + numero }, 0).toFixed(2);
                vm.costo.total = _.reduce(total, function (memo, numero) { return memo + numero }, 0).toFixed(2);
            });
        }
        else
            vm.date.orderDate = moment().toDate();

        // Obtiene los clientes
        NorthClientes.query(function (respuesta) {
            vm.clientes = respuesta;
            // Ordena la lista
            vm.clientes = _.sortBy(vm.clientes, function (c) { return c.contactName });
        });
        // Obtiene los empleados
        NorthEmpleados.query(function (respuesta) {
            vm.empleados = respuesta;
            // Ordena la lista
            vm.empleados = _.sortBy(vm.empleados, function (e) { return e.firstName });
        });
        // Obtiene los expedidores
        NorthExpedidores.query(function (respuesta) {
            vm.expedidores = respuesta;
            // Ordena la lista
            vm.expedidores = _.sortBy(vm.expedidores, function (e) { return e.companyName });
        });
    }

    // Funcion que actualiza la empresa a la que pertenece el cliente
    vm.actualizarCliente = function (idCliente) {
        // Obtiene la informacion del cliente
        NorthClientes.get({ customerId : idCliente }, function (respuesta) {
            // Actualiza la empresa
            vm.orden.shipName = respuesta.companyName;
        });
    }

    // Funcion que despliega la fecha
    vm.abrirFecha = function (id) {
        // Despliega la fecha seleccionada
        if (id == 1)
            vm.fechaConfiguracion.f1 = true;
        else if (id == 2)
            vm.fechaConfiguracion.f2 = true;
        else
            vm.fechaConfiguracion.f3 = true;
    }

    // Funcion agregar o editar producto en modal
    vm.agregarProducto = function (producto) {

        // Configuracion del modal
        var modalInstance = $uibModal.open({
            templateUrl: 'views/Northwind/Ordenes/modal-producto.html',
            controller: 'modalProducto',
            controllerAs: 'productosN',
            size: 'md',
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

    // Constructor
    vm.init();
});