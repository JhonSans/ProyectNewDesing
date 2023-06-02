app.controller("editarOrdenesController", function ($scope, $timeout, toastr, $location, $routeParams, NorthOrdenes, NorthClientes, NorthEmpleados, NorthExpedidores, $uibModal) {
    var vm = this;
    
    $scope.loading = false;
    $scope.backRute = "/Northwind/Ordenes";
    $scope.mainRute = "/views/Northwind/Ordenes/editar.html";

    // Variables
    vm.esEdicion = false;
    vm.requerido = false;

    // Objetos
    vm.orden = null;
    vm.date = { orderDate: null, shippedDate: null, requiredDate: null };
    vm.costo = { inicial: 0, descuento: 0, total: 0 };
    vm.clientes = [];
    vm.empleados = [];
    vm.expedidores = [];
    vm.imgInicio = { 
        editar: "/content/pictures/Northwind/Ordenes/editar.jpg", 
        crear: "/content/pictures/Northwind/Ordenes/crear.jpg" 
    };
    vm.fechaConfiguracion = {
        formatYear: 'yyyy',
        startingDay: 1,
        f1: false,
        f2: false,
        f3: false
    };

    // Contructor
    vm.init = function () {
        // Valida si esta en modo edicion
        vm.esEdicion = $routeParams.id == "Nuevo" ? false : true;
        
        // Valida si es edicion
        if (vm.esEdicion) {

            $scope.loading = true;

            var orderId = $routeParams.id;

            // Obtiene la orden obtenida por su id
            NorthOrdenes.get({ orderId: orderId }, function (respuesta) {

                // Oculta cargando
                $timeout(function () {
                    $scope.loading = false;
                }, 1000);

                // Agrega los datos al objeto
                vm.orden = respuesta;

                // Formatea las fechas
                vm.date.orderDate = moment(vm.orden.orderDate).toDate();
                vm.date.shippedDate = moment(vm.orden.shippedDate).toDate();
                vm.date.requiredDate = moment(vm.orden.requiredDate).toDate();

                // Obtiene los costos
                vm.calcularCostos();                
            });
        }
        else {
            var s = _.random(5, 15);
            var r = _.random(10, 15);
            vm.date.orderDate = moment().toDate();        
            vm.date.shippedDate = moment(vm.date.orderDate).add(s, "days").toDate();
            vm.date.requiredDate = moment(vm.date.shippedDate).add(r, "days").toDate();
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

    vm.calcularCostos = function () {
        // Arrays que almacenan los numeros a calcular
        var inicial = [];
        var descuento = [];
        var total = [];

        // Recorre el detalle de la orden
        _.each(vm.orden.orderDetails, function (d) {
            
            // Agrega el costo de los productos al array
            var price = d.unitPrice * d.quantity;
            inicial.push(price);

            // Si tiene descuento, lo calcula y lo agrega al array
            if (d.discount) {
                descuento.push(parseFloat(Math.abs(price * d.discount)));
                total.push(price - parseFloat(Math.abs(price * d.discount)));
            }
            else {
                total.push(price);
            }
        });

        // Calcula los costos de la orden
        vm.costo.inicial = _.reduce(inicial, function (memo, numero) { return memo + numero }, 0).toFixed(2);
        vm.costo.descuento = _.reduce(descuento, function (memo, numero) { return memo + numero }, 0).toFixed(2);
        vm.costo.total = _.reduce(total, function (memo, numero) { return memo + numero }, 0).toFixed(2);
    }

    // Funcion agregar o editar producto en modal
    vm.agregarProducto = function (producto) {

        // Configuracion del modal
        var modalInstance = $uibModal.open({
            templateUrl: 'views/Northwind/Ordenes/modal-producto.html',
            controller: 'modalProductoController',
            controllerAs: 'modalProducto',
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
            // Valida si existe el producto dentro de la orden y lo edita
            var validar = _.find(vm.orden.orderDetails, function (o) { return o.productId == producto.productId });

            // Si no existe lo agrega
            if (!validar) {
                // Si esta vacio lo inicializa
                if (!vm.orden.orderDetails)
                    vm.orden.orderDetails = [];

                vm.orden.orderDetails.push(producto);
            }

            // Actualiza los costos
            vm.calcularCostos();

        }, function (error) {
            console.log(error);
        });
    }

    // Funcion eliminar producto de la lista
    vm.eliminarProducto = function (productId) {

        // Filtra los productos y retorna los diferentes al seleccionado
        vm.orden.orderDetails = _.filter(vm.orden.orderDetails, function (o) { return o.productId != productId ? o : ""; });

        // Actualiza los costos
        vm.calcularCostos();
    }

    // Funcion guardar
    $scope.guardar = function () {

        // Valida los campos
        if (!vm.orden || !vm.orden.customerId || !vm.orden.employeeId || !vm.orden.shipVia || !vm.orden.shipAddress || !vm.orden.shipCity || !vm.orden.shipCountry) {
            vm.requerido = true;
            toastr.warning("Valide que todos los campos requeridos estén llenos", "Atención");
            return;
        }

        // Agrega las fechas al objeto
        vm.orden.orderDate = vm.date.orderDate;
        vm.orden.requiredDate = vm.date.requiredDate;
        vm.orden.shippedDate = vm.date.shippedDate;
        
        $scope.loading = true;

        // Valida si esta en modo edicion
        if (vm.esEdicion) {
            // Modifica la orden
            NorthOrdenes.modificarOrden(vm.orden, function (respuesta) {

                // Oculta cargando
                $timeout(function () {
                    $scope.loading = false;
                    // Redirige a la orden actual
                    toastr.success("La orden ha sido modificada satisfactoriamente", "Orden #" + respuesta.orderId);
                    $location.path('/Northwind/Ordenes/' + respuesta.orderId);
                }, 500);

            }, function (error) {
                // Obtiene el mensaje de error
                var message = error.data.replace("System.Exception: ", "").split("\r\n");
                toastr.error(message[0], "ERROR " + error.status);
                $scope.loading = false;
            });
        }
        else {
            // Crea la orden
            NorthOrdenes.crearOrden(vm.orden, function (respuesta) {

                // Oculta cargando
                $timeout(function () {
                    $scope.loading = false;
                    // Redirigue a la lista de ordenes
                    toastr.success("La orden a sido creada satisfactoriamente", "Orden #" + respuesta.orderId);
                    $scope.actualizarContenido('/Northwind/Ordenes');                    
                }, 500);

            }, function (error) {
                // Obtiene el mensaje de error
                var message = error.data.replace("System.Exception: ", "").split("\r\n");
                toastr.error(message[0], "ERROR " + error.status);
                $scope.loading = false;
            });
        }
    }

    // Constructor
    vm.init();
});