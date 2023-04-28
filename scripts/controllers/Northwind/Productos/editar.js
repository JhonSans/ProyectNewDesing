app.controller("editarProductosController", function ($scope, $routeParams, NorthProductos, NorthProveedores, toastr, $location, $timeout) {
    var vm = this;
    // Variables
    vm.esEdicion = false;
    vm.producto = null;
    // Objeto img productos
    vm.productosImg = [
        { id: 1, img: "/content/pictures/Northwind/Productos/p-beverages.jpg" },
        { id: 2, img: "/content/pictures/Northwind/Productos/p-condiments.jpg" },
        { id: 3, img: "/content/pictures/Northwind/Productos/p-confections.jpg" },
        { id: 4, img: "/content/pictures/Northwind/Productos/p-dairy-products.jpg" },
        { id: 5, img: "/content/pictures/Northwind/Productos/p-grains-cereals.jpg" },
        { id: 6, img: "/content/pictures/Northwind/Productos/p-meat-poultry.jpg" },
        { id: 7, img: "/content/pictures/Northwind/Productos/p-produce.jpg" },
        { id: 8, img: "/content/pictures/Northwind/Productos/p-seafood.jpg" },
    ];
    // Objeto descontinuado
    vm.descontinuado = [
        { id: true, estado: "Si" },
        { id: false, estado: "No" }
    ];
    // Arrays
    vm.categorias = [];
    vm.proveedores = [];

    // Constructor
    vm.init = function () {
        // Valida si esta en modo edición
        vm.esEdicion = $routeParams.id == "Nuevo" ? false : true;        
        // Valida si es edicion
        if (vm.esEdicion) {
            // Obtiene el producto obtenido por su ID
            NorthProductos.get({ productId: $routeParams.id }, function (respuesta) {
                // Agrega los datos al objeto
                vm.producto = respuesta;
                // Crea la copia del producto
                vm.productoCopia = vm.producto;
                // Agrega la img de la categoria
                _.filter(vm.productosImg, function (p) { 
                    if (p.id == vm.producto.categoryId)
                        vm.producto.category.Image = p.img;
                });
            });
        }
        // Obtiene las categorias
        NorthProductos.getCategorias(function (respuesta) {
            vm.categorias = respuesta;
            // Ordena la lista
            vm.categorias = _.sortBy(vm.categorias, function (c) { return c.categoryName });     
        });
        // Obtiene los proveedores
        NorthProveedores.query(function (respuesta) {
            vm.proveedores = respuesta;
            // Ordena la lista
            vm.proveedores = _.sortBy(vm.proveedores, function (p) { return p.companyName });
        });
    }
    // Funcion guardar
    vm.guardar = function () {        
        // Valida si esta en modo edicion
        if (vm.esEdicion) {
            NorthProductos.modificarProducto(vm.producto, function (respuesta) { 
                // Valida el resultado
                if (respuesta.success) {
                    toastr.success(respuesta.message, "Prodúcto");
                    $location.path('/Northwind/Productos/' + $routeParams.id);
                }
                else
                    toastr.error(respuesta.message, "Prodúcto");
            });
        }
        else {
            NorthProductos.crearProducto(vm.producto, function (respuesta) { 
                // Valida el resultado
                if (respuesta.success) {
                    toastr.success(respuesta.message, "Prodúcto");
                    $scope.actualizarContenido('/Northwind/Productos');
                }
                else
                    toastr.error(respuesta.message, "Prodúcto");
            });  
        }
    }
    // Funcion contructor
    vm.init();
});