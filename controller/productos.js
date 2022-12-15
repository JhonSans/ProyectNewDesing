app.controller("productosCtrl", function ($http, $uibModal) {
  var vm = this;

  // Objetos
  vm.productosDato = { id: "", misProductos: [], miProducto: [] };
  vm.opciones = { error: "" };
  vm.validacion = {
    errorDato:
      "El dato que buscas no se encuentra registrado o se encuentra vacío...",
  };

  //////////////////////// METODO GET PRODUCTOS ////////////////////////
  $http.get("https://localhost:7247/api/Products").then(function (respuesta) {
    vm.productosDato.misProductos = respuesta.data;
  });

  //////////////////////// METODO GET PRODUCTO {ID} ////////////////////////
  vm.buscarProducto = function (id) {
    // Obtiene los datos de un producto solicitado por su id
    $http
      .get("https://localhost:7247/api/Products/" + parseInt(id))
      .then(function (respuesta) {
        // Agrega los datos a la variable
        vm.productosDato.miProducto = respuesta.data;
        // Limpia error
        vm.opciones.error = "";
      })
      .catch(function (respuesta) {
        // Capta el error
        vm.opciones.error =
          "Error " + respuesta.status + " - " + vm.validacion.errorDato;

        // Limpia variables
        vm.productosDato.miProducto = [];
      });
  };

  //Funcion cerrar alerta
  vm.cerrarAlerta = function () {
    vm.opciones.error = "";
  };

  //Funcion cerrar alertas
  vm.cerrarAlerta = function () {
    vm.opciones.error = "";
  };

  //////////// MODAL ////////////

  // Animacion modal
  vm.animationsEnabled = true;

  // Opciones modal
  vm.detalle = function (datos) {
    $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: "modal-title",
      ariaDescribedBy: "modal-body",
      templateUrl: "productos.html",
      controller: "modalProducto",
      controllerAs: "producto",
      size: "lg",
      resolve: {
        respuesta: function () {
          return datos;
        },
      },
    });
  };
});

// Controlador del modal
app.controller("modalProducto", function ($uibModalInstance, respuesta, $http) {
  var vm = this;

  // Objeto producto
  vm.producto = {
    id: respuesta.productId,
    nombre: respuesta.productName,
    proveedor: respuesta.supplierId,
    categoria: respuesta.categoryId,
    cantidadUnidad: respuesta.quantityPerUnit,
    precioUnidad: respuesta.unitPrice,
    unidadStock: respuesta.unitsInStock,
    unidadOrden: respuesta.unitsOnOrder,
    unidadReorden: respuesta.reorderLevel,
    descontinuado: respuesta.discontinued,
  };

  // Objeto proveedor
  vm.proveedor = [respuesta.supplier];

  //Objeto variables
  vm.opciones = {
    id: 0,
    proveedoresArray: [],
    categoriasArray: [],
    productosArray: [],
    descontinuadoArray: [
      { estado: true, info: "Si" },
      { estado: false, info: "No" },
    ],
  };

  // Funcion cancelar
  vm.cancelar = function () {
    $uibModalInstance.dismiss("cancel");
  };

  //////////////////////// METODO GET PROVEEDORES ////////////////////////
  $http.get("https://localhost:7247/api/Suppliers").then(function (resultado) {
    vm.opciones.proveedoresArray = resultado.data;
  });

  //////////////////////// METODO GET CATEGORIAS ////////////////////////
  $http.get("https://localhost:7247/api/Categories").then(function (resultado) {
    vm.opciones.categoriasArray = resultado.data;
  });

  // Funcion buscar proveedor
  vm.buscarProveedor = function (id) {
    vm.opciones.id = id;

    //////////////////////// METODO GET PRODUCTOS ////////////////////////
    $http.get("https://localhost:7247/api/Products").then(function (respuesta) {
      // Recorre todos los productos
      for (let i = 0; i < respuesta.data.length; i++) {
        // Valida que los productos pertenezcan a el proveedor id
        if (respuesta.data[i].supplierId === vm.opciones.id) {
          // Agrega los productos a el array
          vm.opciones.productosArray.push(respuesta.data[i]);
        }
      }
    });
  };
});
