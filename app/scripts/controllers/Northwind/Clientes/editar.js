app.controller("editarClienteController", function ($scope, $routeParams, NorthClientes, toastr, $location) {
    var vm = this;
    // Modo edicion
    vm.esEdicion = false;
    // Var acordion    
    vm.toggle = false;
    // Objeto cliente
    vm.cliente = null;
    // Objeto orden
    vm.orden = null;
    // Objeto copia
    vm.copy = null;
    // Objeto empleados
    vm.empleados = null;
    // Objeto expedidores
    vm.expedidores = null;
    // Objeto productos
    vm.productos = null;
    // Objeto eliminado
    vm.eliminado = [];
    // Var cargando
    vm.cargando = null;

    // Contructor
    vm.init = function () {
        // Valida si esta en modo edicion
        vm.esEdicion = $routeParams.id == "Nuevo" ? false : true;
        // Valida si es edición
        if (vm.esEdicion) {
            // Obtiene al cliente obtenido por su ID, Nombre o Empresa
            NorthClientes.get({ customerId : $routeParams.id }, function (respuesta) {
                // Agrega los datos al objeto
                vm.cliente = respuesta;
                // Crea una copia del cliente
                vm.copy = angular.copy(vm.cliente);
                // Agrupa las ordenes por año
                //vm.copy.orders = _.groupBy(vm.copy.orders, function (o) { return moment(o.orderDate).format('yyyy'); } );                
            });
        }
        // Obtiene los empleados
        /*NorthClientes.getEmpleados(function (respuesta) {
            // Agrega los datos a la respuesta
            vm.empleados = respuesta;
            // Ordena la lista
            vm.empleados = _.sortBy(vm.empleados, function (e) { return e.lastName });
        });
        // Obtiene los expedidores
        NorthClientes.getExpedidores(function (respuesta) {
            // Agrega los datos a la respuesta
            vm.expedidores = respuesta;
            // Ordena la lista
            vm.expedidores = _.sortBy(vm.expedidores, function (e) { return e.companyName })
        });
        // Obtiene los productos
        NorthClientes.getProductos(function (respuesta) {
            // Agrega los datos a la respuesta
            vm.productos = respuesta;
            // Ordena la lista
            vm.productos = _.sortBy(vm.productos, function (e) { return e.productName })
        });*/
    }
    // Funcion seleccionar orden
    vm.seleccionarOrden = function (orden) {
        // Agrega los datos al objeto
        vm.orden = orden;
        console.log(vm.orden);
        /*// Formatea las fechas
        vm.orden.orderDate = moment(vm.orden.orderDate).format("DD/MM/yyyy");
        vm.orden.shippedDate = moment(vm.orden.shippedDate).format("DD/MM/yyyy");
        vm.orden.requiredDate = moment(vm.orden.requiredDate).format("DD/MM/yyyy");
        // Limpia el array
        vm.productosOrden = [];
        // Agrega los datos a la copia
        vm.copy = angular.copy(vm.orden.orderDetails);
        // Recorre los detalles de la orden
        _.each(vm.orden.orderDetails, function (o) {
            // Determina el total
            o.total = (o.unitPrice * o.quantity) - ((o.unitPrice * o.quantity) * o.discount);
            // Busca los productos de la orden en la lista de productos y agrega datos al objeto
            _.each(vm.productos, function (p) {
                if (o.productId == p.productId)
                    o.productName = p.productName;
            });
        });*/
    }
    // Funcion agregar producto
    vm.agregarProducto = function () {
        // Agrega un espacio vacio para registrar un nuevo producto
        vm.orden.orderDetails.push({
            productId: null,
            productName: null,
            unitPrice: null,
            quantity: null,
            discount: null,
            new: true
        });
    }
    // Funcion seleccionar nuevo producto
    /*vm.seleccionarProducto = function (indice, item, tipo) {

        console.log("Lista original: ", vm.copy);
        console.log("Lista nueva: ", vm.orden.orderDetails);

        // Busca el producto en la lista de productos y lo agrega a la variable
        var producto = _.find(vm.productos, function (p) { return p.productId == item.productId });

        if (tipo == 0) {
            // Busca el producto en el listado original
            var existe = _.find(vm.copy, function (c) { return c.productId == item.productId });            
            // Valida si el producto existe en el listado original
            if (existe) {
                item.productId = null;
                toastr.warning("El producto " + producto.productName + " ya se encuentra en la lista", "Producto");
                return;
            }
            // Agrega el nombre y el precio del producto
            item.productName = producto.productName;
            item.unitPrice = producto.unitPrice;
            item.quantity = 1;
            item.discount = 0;
            // Si todo sale bien actualiza la copia
            vm.copy.splice(indice, 1, item);
        } else {
            // Valida que la cantidad sea mayor a 0
            if (item.quantity && item.quantity < 1) {
                item.total = null;
                toastr.warning("La cantidad no puede ser inferior a 1", "Cantidad");
                return;
            }
            // Valida que el descuento sea mayor a 0 e infernior a 1 y
            if (item.discount < 0 || item.discount > 1) {
                item.total = null;
                toastr.warning("El descuento debe estar entre 0 y 1", "Descuento");
                return;
            }
            // Calcula el total
            item.total = (item.unitPrice * item.quantity) - ((item.unitPrice * item.quantity) * item.discount);
            // Si todo sale bien actualiza la copia
            vm.copy.splice(indice, 1, item);
        }
    }*/
    // Funcion eliminar producto del detalle de orden
    vm.eliminarProducto = function (indice, item) {
        // Valida que el producto no este vacio
        if (!item.productId) {
            vm.orden.orderDetails.splice(indice, 1);
            return;
        }
        // Modal de confirmacion
        bootbox.confirm({
            title: "Eliminar producto " + item.productId,
            message: "¿Está segu@ que desea eliminar el producto " + item.productId + "?",
            cancel: {
                label: "<i class='fa fa-times'></i> Cancelar"
            },
            confirm: {
                label: "<i class='fa fa-check'></i> Eliminar"
            },
            callback: function (resultado) {
                // Si se valida como correcto, elimina el producto de la orden
                if (resultado) {
                    vm.orden.orderDetails.splice(indice, 1);
                    // Agrega el item eliminado a la lista
                    vm.eliminado.push({ indice: indice, item: item });
                }
            }
        });
    }
    // Funcion deshacer
    vm.desahacer = function () {
        // Obtiene el ultimo elemento de la lista
        var undo = vm.eliminado[vm.eliminado.length - 1];
        // Agrega el producto a la lista, en su posicion inicial
        vm.orden.orderDetails.splice(undo.indice, 0, undo.item);
        // Elimina el ultimo registro de la lista de eliminados
        vm.eliminado.pop();
    }
    // Funcion guardar
    vm.guardar = function () {
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