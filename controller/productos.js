app.controller("productosCtrl", function ($scope, $http, $uibModal, $location) {
  var vm = this;

  // Objetos
  vm.productosDato = { id: "", misProductos: [], miProducto: [] };
  vm.opciones = { error: "" };
  vm.validacion = {
    errorDato:
      "El dato que buscas no se encuentra registrado o se encuentra vacío...",
  };

  // Paginador
  vm.paginador = {
    totalItems: 0,
    paginaActual: 0,
    itemsPagina: 10,
    tamanoMax: 5,
  };

  // Funcion cambiar pagina
  vm.cambiarPagina = function () {
    //////////////////////// METODO GET PRODUCTOS PAGINADOR////////////////////////
    $http
      .get(
        "https://localhost:7247/api/Products?pg=" +
          (vm.paginador.paginaActual - 1)
      )
      .then(function (respuesta) {
        vm.productosDato.misProductos = respuesta.data.data;
      });
  };

  //////////////////////// METODO GET PRODUCTOS ////////////////////////
  $http
    .get("https://localhost:7247/api/Products?pg=" + vm.paginador.paginaActual)
    .then(function (respuesta) {
      vm.productosDato.misProductos = respuesta.data.data;

      vm.paginador.totalItems = respuesta.data.count;
    });

  //////////////////////// METODO GET PRODUCTO {ID} ////////////////////////
  vm.buscarProducto = function (id) {
    $http
      .get("https://localhost:7247/api/Products/" + id)
      .then(function (respuesta) {
        vm.productosDato.miProducto = respuesta.data;

        // Limpia error
        vm.opciones.error = "";
      })
      .catch(function (respuesta) {
        // Capta el error
        vm.opciones.error =
          "Error " + respuesta.status + " - " + vm.validacion.errorDato;
      });
  };

  //Funcion cerrar alertas
  vm.cerrarAlerta = function () {
    vm.opciones.error = "";
  };

  //////////// MODAL ////////////

  // Animacion modal
  vm.animationsEnabled = true;

  // Opciones modal
  vm.detalle = function (id) {
    $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: "modal-title",
      ariaDescribedBy: "modal-body",
      templateUrl: "productos.html",
      controller: "modalProducto",
      controllerAs: "producto",
      size: "lg",
      resolve: {
        id: function () {
          return id;
        },
      },
    });
  };
});

// Controlador del modal
app.controller("modalProducto", function ($uibModalInstance, id, $http) {
  var vm = this;

  // Objeto producto
  vm.productosProveedor = [];
  vm.productoInfo = {
    productId: id,
    productName: "",
    supplierId: 0,
    categoryId: 0,
    quantityPerUnit: "",
    unitPrice: 0,
    unitsInStock: 0,
    unitsOnOrder: 0,
    reorderLevel: 0,
    discontinued: "",
    category: "",
    supplier: "",
  };

  // Objeto proveedor
  vm.productoBandera = 0;
  vm.proveedoresInfo = [];
  vm.proveedorInfo = {
    supplierId: 0,
    companyName: "",
    contactName: "",
    contactTitle: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
    phone: "",
    fax: "",
    homePage: "",
  };

  // Objeto categoria
  vm.categoriaInfo = [];

  // Objeto producto descontinuado
  vm.descontinuadoInfo = [
    { estado: true, info: "Si" },
    { estado: false, info: "No" },
  ];

  //////////////////////// METODO GET {ID} ////////////////////////
  $http
    .get("https://localhost:7247/api/Products/" + id)
    .then(function (respuesta) {
      vm.productoInfo = {
        productId: respuesta.data.productId,
        productName: respuesta.data.productName,
        supplierId: respuesta.data.supplierId,
        categoryId: respuesta.data.categoryId,
        quantityPerUnit: respuesta.data.quantityPerUnit,
        unitPrice: respuesta.data.unitPrice,
        unitsInStock: respuesta.data.unitsInStock,
        unitsOnOrder: respuesta.data.unitsOnOrder,
        reorderLevel: respuesta.data.reorderLevel,
        discontinued: respuesta.data.discontinued,
        category: respuesta.data.category,
        supplier: respuesta.data.supplier,
      };
    });

  //////////////////////// METODO GET PROVEEDORES ////////////////////////
  $http.get("https://localhost:7247/api/Suppliers/").then(function (respuesta) {
    vm.proveedoresInfo = respuesta.data;
  });

  //////////////////////// METODO GET CATEGORIAS ////////////////////////
  $http.get("https://localhost:7247/api/Categories").then(function (respuesta) {
    vm.categoriaInfo = respuesta.data;
  });

  // Funcion obtener proveedor
  vm.obtenerProveedor = function (id) {
    //////////////////////// METODO GET PROVEEDORES ////////////////////////
    $http
      .get("https://localhost:7247/api/Suppliers/" + id)
      .then(function (respuesta) {
        vm.proveedorInfo = {
          supplierId: respuesta.data.supplierId,
          companyName: respuesta.data.companyName,
          contactName: respuesta.data.contactName,
          contactTitle: respuesta.data.contactTitle,
          address: respuesta.data.address,
          city: respuesta.data.city,
          region: respuesta.data.region,
          postalCode: respuesta.data.postalCode,
          country: respuesta.data.country,
          phone: respuesta.data.phone,
          fax: respuesta.data.fax,
          homePage: respuesta.data.homePage,
        };
      });
  };

  vm.productosRelacionados = function (id) {
    // Variable proveedor
    vm.productoBandera = id;

    // Vacia el array
    vm.productosProveedor = [];

    //////////////////////// METODO GET PRODUCTOS ////////////////////////
    $http.get("https://localhost:7247/api/Products").then(function (respuesta) {
      // Recorre todos los productos
      for (let i = 0; i < respuesta.data.length; i++) {
        // Valida que los productos pertenezcan a el proveedor id
        if (respuesta.data[i].supplierId === id) {
          // Agrega los productos a el array
          vm.productosProveedor.push(respuesta.data[i]);
        }
      }
    });
  };

  // Funcion cancelar
  vm.cancelar = function () {
    $uibModalInstance.dismiss("cancel");
  };
});
