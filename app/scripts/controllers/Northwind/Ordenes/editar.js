app.controller("editarOrdenesController", function ($routeParams, NorthOrdenes, NorthClientes, NorthEmpleados, NorthExpedidores) {
    var vm = this;
    // Variables
    vm.esEdicion = false;
    // Objetos
    vm.orden = null;
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
                vm.orden.orderDate = moment(vm.orden.orderDate).toDate();
                vm.orden.shippedDate = moment(vm.orden.shippedDate).toDate();
                vm.orden.requiredDate = moment(vm.orden.requiredDate).toDate();
            });
        }
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

    // Constructor
    vm.init();
});