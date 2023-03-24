app.controller("editarClienteController", function ($routeParams, NorthClientes, toastr) {
    var vm = this;
    // Var acordion    
    vm.toggle = false;
    // Objeto cliente
    vm.cliente = null;
    // Objeto orden
    vm.orden = null;
    // Objeto opia
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
        // Obtiene al cliente obtenido por su ID, Nombre o Empresa
        NorthClientes.get({ customerId : $routeParams.id }, function (respuesta) {
            // Agrega los datos al objeto
            vm.cliente = respuesta;
            // Agrupa las ordenes por año
            vm.cliente.orders = _.groupBy(vm.cliente.orders, function (o) { return moment(o.orderDate).format('yyyy'); } );          
        });
        // Obtiene los empleados
        NorthClientes.getEmpleados(function (respuesta) {
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
        });
    }
    // Funcion seleccionar orden
    vm.seleccionarOrden = function (dato) {
        // Agrega los datos al objeto
        vm.orden = dato;
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
        });
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
    vm.seleccionarProducto = function (item) {
        // Valida si el producto existe en el listado copiado
        var existe = _.find(vm.copy, function (c) { return c.productId == item.productId });        
        // Busca el producto en la lista de productos y lo agrega a la variable
        var producto = _.find(vm.productos, function (p) { return p.productId == item.productId });
        if (existe) {
            toastr.warning("El producto " + producto.productName + " ya se encuentra en la lista", "Producto");
            item.productId = null;
            return;
        }
        // Recorre el detalle de la orden
        _.each(vm.orden.orderDetails, function (o) { 
            // Valida que el producto sea el mismo que el id recibido y agrega la informacion
            if (o.productId == item.productId) {                
                // Valida que la cantidad sea mayor a 0
                if (o.quantity && o.quantity < 1) {
                    toastr.warning("La cantidad no puede ser inferior a 1", "Cantidad");
                    o.total = null;
                    return;
                }
                // Valida que el descuento sea mayor a 0 e infernior a 1 y
                if (o.discount < 0 || o.discount > 1) {
                    toastr.warning("El descuento debe estar entre 0 y 1", "Descuento");
                    o.total = null;
                    return;
                }
                // Agrega los datos
                o.productName = producto.productName;
                o.unitPrice = producto.unitPrice;
                o.total = (o.unitPrice * o.quantity) - ((o.unitPrice * o.quantity) * o.discount);
                // Si todo sale bien actualiza la copia
                vm.copy = vm.orden.orderDetails;
            }
        });
    }
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
        console.log(vm.cliente);
    }
    // Funcion contructor
    vm.init();
});