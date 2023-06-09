app.controller("editarProductosController", function ($scope, $routeParams, NorthProductos, NorthProveedores, toastr, $location, $timeout) {
    var vm = this;

    $scope.esEdicion = true;
    $scope.backRute = "/Northwind/Productos";
    $scope.mainRute = "/views/Northwind/Productos/editar.html";
    
    // Variables
    vm.esEdicion = false;
    $scope.productos = null;

    // Objeto img productos
    vm.producto = null;
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
        // Valida si esta en modo edicion
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
    // Si es creacion actualiza la img del banner al seleccionar una categoria
    vm.seleccionCategoria = function (categoryId) {
        _.filter(vm.productosImg, function (p) {
            if (p.id == categoryId)
                vm.producto.Image = p.img;
        });
    }
    // Funcion guardar
    $scope.guardar = function () {

        $scope.loading = true;

        // Valida si esta en modo edicion
        if (vm.esEdicion) {
            NorthProductos.modificarProducto(vm.producto, function (respuesta) { 
                
                // Oculta cargando
                $timeout(function () {
                    $scope.loading = false;
                    toastr.success("El producto ha sido modificado satisfactoriamente", "Prodúcto " + respuesta.productName);
                    $location.path('/Northwind/Productos/' + $routeParams.id);
                }, 800);
                    
            }, function (error) {
                // Obtiene el mensaje de error
                var message = error.data.replace("System.Exception: ", "").split("\r\n");
                toastr.error(message[0], "ERROR " + error.status);
                $scope.loading = false;
            });
        }
        else {
            NorthProductos.crearProducto(vm.producto, function (respuesta) { 
                
                // Oculta cargando
                $timeout(function () {
                    $scope.loading = false;
                    toastr.success("El producto ha sido registrado satisfactoriamente", "Prodúcto " + respuesta.productName);
                    $scope.actualizarContenido('/Northwind/Productos');
                }, 800);

            }, function (error) {
                // Obtiene el mensaje de error
                var message = error.data.replace("System.Exception: ", "").split("\r\n");
                toastr.error(message[0], "ERROR " + error.status);
                $scope.loading = false;
            });  
        }
    }
    // Funcion contructor
    vm.init();
});