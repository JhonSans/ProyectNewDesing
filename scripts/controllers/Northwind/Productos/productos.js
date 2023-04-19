app.controller("productosController", function (NorthProductos, toastr) {
    var vm = this;

    // Objeto productos
    vm.productos = null;
    // Objeto paginador
    vm.paginador = {
        totalItems: 0,
        totalItemsCopia: 0,
        paginaActual: 0,
        itemsPagina: 10,
        tamanoMax: 5
    };
    // Funcion inicial
    vm.init = function () {
        // Obtiene todos los productos
        NorthProductos.get({ pg: vm.paginador.paginaActual }, function (respuesta) {
            // Agrega la informacion de los productos
            vm.productos = respuesta.data;
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
    // Funcion eliminar
    vm.eliminar = function (id) {
        bootbox.confirm({
            title: "Eliminar",
            message: "Desea eliminar el producto " + id + "?",
            buttons: {
                cancel: { label: '<i class="fa fa-times"></i> Cancelar' },
                confirm: { label: '<i class="fa fa-check"></i> Confirmar' }
            },
            callback: function (resultado) {
                if (resultado) {
                    // Ejecuta la funcion
                    NorthProductos.remove({ productId: id }, function (respuesta) {
                        // Valida el resultado
                        if (respuesta.success) {
                            // Muestra la alerta
                            toastr.success(respuesta.message, "Producto");
                            // Regresa a la primera pagina
                            vm.paginador.paginaActual = 0;
                            // Ejecuta la funcion inicial
                            vm.init();
                        }
                        else {
                            // Muestra la alerta
                            toastr.error(respuesta.message, "Producto");
                        }
                    });
                }
            }
        });
    }
    // Funcion contructor
    vm.init();
});