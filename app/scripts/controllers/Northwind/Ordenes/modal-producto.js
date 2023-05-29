app.controller("modalProductoController", function ($timeout, producto, toastr, $uibModalInstance, NorthProductos) {
    var vm = this;

    // Vairables
    vm.esEdicion = false;
    vm.loading = false;

    // Objetos
    vm.producto = null;
    vm.productos = null;
    vm.costo = { inicial: 0, total: 0 };
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

    // Constructor
    vm.init = function () {
        // Si viene un dato es edicion
        if (producto) {
            vm.loading = true;
            vm.esEdicion = true;

            vm.producto = producto;

            // Obtiene el producto seleccionado
            vm.buscarProducto(producto.productId);
        }
        else {
            // Obtiene los productos
            NorthProductos.query(function (respuesta) {
                vm.productos = respuesta;
                vm.productos = _.sortBy(vm.productos, function (p) { return p.productName });
            });
        }
    }

    // Funcion buscar producto
    vm.buscarProducto = function (productId) {
        // Obtiene el producto por Id
        NorthProductos.get({ productId: productId }, function (respuesta) {
            
            // Oculta cargando
            $timeout(function () {
                vm.loading = false;
            }, 800);

            // Valida si es edicion y ajusta los datos
            if (!vm.esEdicion) {
                vm.producto.unitPrice = respuesta.unitPrice;
                vm.producto.quantity = 1;
                vm.producto.discount = 0;
            }
            
            // Datos basicos
            vm.producto.productId = respuesta.productId;
            vm.producto.productName = respuesta.productName;
            vm.producto.discountAbsolute = vm.producto.discount * 100;
            
            // Agrega la img de la categoria
            _.filter(vm.productosImg, function (p) {
                if (p.id == respuesta.categoryId)
                    vm.producto.Image = p.img;
            });

            // Calcula los costos del producto
            vm.actualizarCostos();
        });
    }

    // Funcion actualizar costos del producto
    vm.actualizarCostos = function () {
        // Calcula los costos del producto
        vm.producto.discount = vm.producto.discountAbsolute / 100;
        vm.costo.inicial = vm.producto.unitPrice * vm.producto.quantity;
        vm.costo.total = (vm.costo.inicial - (vm.costo.inicial * vm.producto.discount)).toFixed(2);        
    }

    // Funcion seleccionar un producto nuevo
    vm.seleccionarProducto = function () {
        // Obtiene el producto por Id
        vm.buscarProducto(vm.producto.productId);
    }

    // Funcion guardar
    vm.guardar = function () {

        // Valida que los campos esten llenos
        if (!vm.producto || !vm.producto.productId) {
            toastr.warning("Debe seleccionar un producto", "Atención");
            return;
        }

        $uibModalInstance.close(vm.producto);
    }

    // Funcion cancelar
    vm.cancelar = function () {
        $uibModalInstance.dismiss('cancelar');
    }

    // Ejecuta el constructor
    vm.init();
});