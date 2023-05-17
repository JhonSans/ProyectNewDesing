app.controller("productosController", function (NorthProductos, toastr) {
    var vm = this;

    // Objetos
    vm.producto = null;
    vm.productos = null;
    vm.productosCopia = null;
    // Paginador
    vm.paginador = {
        totalItems: 0,
        totalItemsCopia: 0,
        paginaActual: 0,
        itemsPagina: 10,
        tamanoMax: 5
    };
    // Constructor
    vm.init = function () {
        // Obtiene todos los productos
        NorthProductos.get({ pg: vm.paginador.paginaActual }, function (respuesta) {
            // Agrega la informacion de los productos
            vm.productos = respuesta.data;
            // Realiza una copia del listado
            vm.productosCopia = angular.copy(vm.productos);
            // Obtiene el total de los productos
            vm.paginador.totalItems = respuesta.count;
            // Realiza una copia del total de productos
            vm.paginador.totalItemsCopia = vm.paginador.totalItems;
        });
    }
    // Funcion cambiar de pagina
    vm.cambiarPagina = function () {        
        // Obtiene todos los productos de la siguiente pagina
        NorthProductos.get({ pg: vm.paginador.paginaActual - 1 }, function (respuesta) {
            // Agrega la informacion de los productos al objeto
            vm.productos = respuesta.data;
        });
    }
    // Funcion buscar un producto
    vm.buscarProducto = function () {
        // Si el campo no tiene elementos regresa al listado completo
        if (!vm.producto) {
            vm.productos = vm.productosCopia;
            // Actualiza el contador de paginas
            vm.paginador.totalItems = vm.paginador.totalItemsCopia;
            return;
        }
        // Obtiene un producto por id
        NorthProductos.get({ productId: vm.producto }, function (respuesta) {
            // Agrega la respuesta
            vm.productos = [respuesta];
            // Actualiza el contador de paginas
            vm.paginador.totalItems = vm.productos.lengt;
        }, function (error) {
            toastr.error("El producto con ID #" + vm.producto + " no existe", "Error " + error.status)
        });
    }
    // Funcion eliminar
    vm.eliminar = function (producto) {
        bootbox.confirm({
            title: "Eliminar",
            message: "Desea eliminar el producto " + producto.productName + "?",
            buttons: {
                cancel: { label: '<i class="fa fa-times"></i> Cancelar' },
                confirm: { label: '<i class="fa fa-check"></i> Confirmar' }
            },
            callback: function (resultado) {
                if (resultado) {
                    // Ejecuta la funcion
                    NorthProductos.delete({ productId: producto.productId }, function (respuesta) {
                        toastr.success("El producto " + producto.productName + " ha sido eliminado satisfactoriamente", "Producto #" + producto.productId);
                        // Regresa a la primera pagina
                        vm.paginador.paginaActual = 0;
                        // Ejecuta la funcion inicial
                        vm.init();
                    }, function (error) {
                        toastr.error("Ocurrió un error al eliminar el producto " + producto.productName, "Error " + error.status);
                    });
                }
            }
        });
    }
    // Constructor
    vm.init();
});