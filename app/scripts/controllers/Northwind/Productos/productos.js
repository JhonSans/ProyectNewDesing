app.controller("productosController", function (NorthProductos, NorthProveedores, toastr, $scope, $timeout) {
    var vm = this;
    
    $scope.loading = false;
    $scope.mainRute = "/views/Northwind/Productos/index.html";
    $scope.addRute = "/Northwind/Productos/Nuevo";    

    // Objetos
    $scope.busqueda = null;
    vm.productos = null;
    vm.productosCopia = null;
    vm.categorias = [];
    vm.proveedores = [];
    vm.filtro = { category: null, supplier: null };

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
        $scope.loading = true;

        // Obtiene las categorias
        NorthProductos.getCategorias(function (respuesta) {
            // Agrega el resultado al objeto
            vm.categorias = respuesta;

            // Ordena la lista
            vm.categorias = _.sortBy(vm.categorias, function (c) { return c.categoryName });
            vm.categorias.unshift({ categoryId: null, categoryName: "Todos" });
        });

        // Obtiene los proveedores
        NorthProveedores.query(function (respuesta) {
            // Agrega el resultado al objeto
            vm.proveedores = respuesta;

            // Ordena la lista por proveedor
            vm.proveedores = _.sortBy(vm.proveedores, function (p) { return p.companyName });
            vm.proveedores.unshift({ supplierId: null, companyName: "Todos" });
        });

        // Obtiene todos los productos filtrados
        vm.actualizarFiltro(vm.paginador.paginaActual);
    }

    // Funcion actualizar filtro
    vm.actualizarFiltro = function (paginaActual, actualizar) {
        
        // Valida que la pagina actual sea la incial para mostrar el loading
        if (actualizar)
            $scope.loading = true;

        // Obtiene todos los productos
        NorthProductos.get({ pg: paginaActual, category: vm.filtro.category, supplier: vm.filtro.supplier }, function (respuesta) {

            // Oculta cargando
            $timeout(function () {
                $scope.loading = false;
            }, 1000);

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
        // Ajusta la pagina
        vm.actualizarFiltro(vm.paginador.paginaActual - 1);
    }

    // Funcion buscar un producto
    $scope.buscarElemento = function () {

        // Si el campo no tiene elementos regresa al listado completo
        if (!$scope.busqueda) {
            vm.productos = vm.productosCopia;

            // Actualiza el contador de paginas
            vm.paginador.totalItems = vm.paginador.totalItemsCopia;
            return;
        }
        // Obtiene un producto por id
        NorthProductos.get({ productId: $scope.busqueda }, function (respuesta) {

            // Agrega la respuesta
            vm.productos = [respuesta];

            // Actualiza el contador de paginas
            vm.paginador.totalItems = vm.productos.lengt;

        }, function (error) {
            toastr.error("El producto con ID #" + $scope.busqueda + " no existe", "Error " + error.status)
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