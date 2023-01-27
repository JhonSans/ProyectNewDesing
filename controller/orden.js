app.controller("ordenCtrl", function ($http, $uibModal) {
  var vm = this;

  // Objetos
  vm.ordenDato = { id: "", misOrdenes: [], miOrden: [] };
  vm.opciones = { error: "", listo: "", nuevo: false };
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
    //////////////////////// METODO GET ORDENES PAGINADOR ////////////////////////
    $http
      .get(
        "https://localhost:7247/api/Orders?pg=" +
          (vm.paginador.paginaActual - 1)
      )
      .then(function (respuesta) {
        vm.ordenDato.misOrdenes = respuesta.data.data;
      });
  };

  //////////////////////// METODO GET ORDENES ////////////////////////
  $http
    .get("https://localhost:7247/api/Orders?pg=" + vm.paginador.paginaActual)
    .then(function (respuesta) {
      vm.ordenDato.misOrdenes = respuesta.data.data;

      vm.paginador.totalItems = respuesta.data.count;
    });

  //////////////////////// METODO GET ORDEN {ID} ////////////////////////
  vm.buscarOrden = function (id) {
    // Obtiene los datos de laorden solicitada por su id
    $http
      .get("https://localhost:7247/api/Orders/" + id)
      .then(function (respuesta) {
        // Agrega los datos a la variable
        vm.ordenDato.miOrden = respuesta.data;
        // Limpia error
        vm.opciones.error = "";
      })
      .catch(function (respuesta) {
        // Capta el error
        vm.opciones.error =
          "Error " + respuesta.status + " - " + vm.validacion.errorDato;
      });
  };

  //////////////////////// METODO DELETE ORDEN {ID} ////////////////////////
  vm.eliminarOrden = function (id) {
    $http.delete("https://localhost:7247/api/Orders/" + id).then(
      function (respuesta) {
        // Valida la respuesta
        if (respuesta.data) {
          // Limpia el error
          vm.opciones.error = "";
          // Agrega la alerta
          vm.opciones.listo = "La orden ha sido ELIMINADA satisfactoriamente.";
          vm.paginador.paginaActual = 0;
        }
      },
      function (respuesta) {
        // Limpia satisfactorio
        vm.opciones.listo = "";
        // Agrega la alerta
        vm.opciones.error =
          "Error " + respuesta.status + ", hubo un error al eliminar la orden.";
      }
    );
  };

  //Funcion cerrar alertas
  vm.cerrarAlerta = function () {
    vm.opciones.error = "";
    vm.opciones.listo = "";
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
      templateUrl: "orden.html",
      controller: "modalOrden",
      controllerAs: "orden",
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
app.controller("modalOrden", function ($uibModalInstance, id, $http) {
  var vm = this;

  // Objeto opciones
  vm.opciones = {
    listo: "",
    error: "",
  };

  // Objeto orden
  vm.ordenInfo = {
    orderId: id,
    customerId: "",
    employeeId: 0,
    orderDate: "",
    requiredDate: "",
    shippedDate: "",
    shipVia: 0,
    freight: 0,
    shipName: "",
    shipAddress: "",
    shipCity: "",
    shipRegion: "",
    shipPostalCode: "",
    shipCountry: "",
    employee: "",
    orderDetails: "",
  };

  // Objeto empleado
  vm.empleadosInfo = [];

  // Objeto transportista
  vm.transportistaInfo = [];

  // Objeto productos
  vm.productoBandera = 0;
  vm.productoAgregar = false;
  vm.productos = {
    lista: [],
    nombre: "",
    ids: [],
  };
  vm.producto = {
    orderId: 0,
    productId: 0,
    unitPrice: 0,
    quantity: 0,
    discount: 0,
  };
  vm.productoNuevo = {
    orderId: 0,
    productId: 0,
    unitPrice: "",
    quantity: "",
    discount: 0,
  };
  vm.productosLista = [];

  //////////////////////// METODO GET ORDEN {ID} ////////////////////////
  $http
    .get("https://localhost:7247/api/Orders/" + id)
    .then(function (respuesta) {
      // Agrega los datos a la variable
      vm.ordenInfo = {
        orderId: respuesta.data.orderId,
        customerId: respuesta.data.customerId,
        employeeId: respuesta.data.employeeId,
        orderDate: respuesta.data.orderDate,
        requiredDate: respuesta.data.requiredDate,
        shippedDate: respuesta.data.shippedDate,
        shipVia: respuesta.data.shipVia,
        freight: respuesta.data.freight,
        shipName: respuesta.data.shipName,
        shipAddress: respuesta.data.shipAddress,
        shipCity: respuesta.data.shipCity,
        shipRegion: respuesta.data.shipRegion,
        shipPostalCode: respuesta.data.shipPostalCode,
        shipCountry: respuesta.data.shipCountry,
        employee: respuesta.data.employee,
        orderDetails: respuesta.data.orderDetails,
      };
    });

  //////////////////////// METODO GET EMPLEADO //////////////////////////
  $http.get("https://localhost:7247/api/Employees").then(function (respuesta) {
    vm.empleadosInfo = respuesta.data;
  });

  //////////////////////// METODO GET TRANSPORTISTAS ///////////////////////////
  $http.get("https://localhost:7247/api/Shippers").then(function (respuesta) {
    vm.transportistaInfo = respuesta.data;
  });

  // Funcion obtener los productos de la orden
  vm.obtenerProducto = function (datos) {
    // Agrega los datos a la variable
    vm.productos.lista = datos;

    // Recorre la informacion de la variable
    for (let i = 0; i < vm.productos.lista.length; i++) {
      //////////////////////// METODO GET PRODUCTOS ///////////////////////
      $http.get(
        "https://localhost:7247/api/Products/" + vm.productos.lista[i].productId
      );
    }
  };

  // Funcion detalle del producto
  vm.detalleProducto = function (datos) {
    // configura la bandera
    vm.productoBandera = datos.productId;
    vm.productoAgregar = false;

    // Agrega los datos al objeto
    vm.producto = {
      orderId: datos.orderId,
      productId: datos.productId,
      unitPrice: datos.unitPrice,
      quantity: datos.quantity,
      discount: datos.discount,
    };

    //////////////////////// METODO GET PRODUCTOS {ID} ///////////////////////
    $http
      .get("https://localhost:7247/api/Products/" + datos.productId)
      .then(function (respuesta) {
        vm.productos.nombre = respuesta.data.productName;
      });
  };

  // Funcion cambio de estado
  vm.cambioEstado = function () {
    // Configura la bandera
    vm.productoBandera = 0;
    vm.productoAgregar = true;

    //////////////////////// METODO GET PRODUCTOS ///////////////////////
    $http
      .get("https://localhost:7247/api/Products/")
      .then(function (respuesta) {
        vm.productosLista = respuesta.data;
      });
  };

  // Funcion guardar informacion
  vm.guardarInfo = function () {
    //////////////////////// METODO PUT ORDEN ///////////////////////
    $http
      .put(
        "https://localhost:7247/api/Orders/" + vm.ordenInfo.orderId,
        vm.ordenInfo
      )
      .then(
        function (respuesta) {
          // Valida que la respuesta sea correcta
          if (respuesta.data) {
            // Configura la bandera
            vm.productoBandera = 0;
            // Limpia el error
            vm.opciones.error = "";
            // Agrega la alerta
            vm.opciones.listo =
              "La orden " +
              vm.ordenInfo.orderId +
              ", ha sido MODIFICADA satisfactoriamente.";
          }
        },
        function (respuesta) {
          // Configura la bandera
          vm.productoBandera = 0;
          // Limpia correcto
          vm.opciones.listo = "";
          // Agrega la alerta
          vm.opciones.error =
            "Error " +
            respuesta.status +
            ", hubo un error al modificar los datos.";
        }
      );
  };

  // Funcion agregar producto
  vm.guardarModificado = function () {
    // Recorre la informacion del los detalles de orden
    for (let i = 0; i < vm.ordenInfo.orderDetails.length; i++) {
      // Valida si el id es igual al existente
      if (vm.ordenInfo.orderDetails[i].productId === vm.producto.productId) {
        // Agrega los datos al objeto
        vm.ordenInfo.orderDetails[i] = {
          orderId: vm.producto.orderId,
          productId: vm.producto.productId,
          unitPrice: vm.producto.unitPrice,
          quantity: vm.producto.quantity,
          discount: vm.producto.discount,
        };
        //////////////////////// METODO PUT ORDEN ///////////////////////
        $http
          .put(
            "https://localhost:7247/api/Orders/" + vm.ordenInfo.orderId,
            vm.ordenInfo
          )
          .then(
            function (respuesta) {
              if (respuesta.data) {
                // Configura la bandera
                vm.productoBandera = 0;
                // Limpia el error
                vm.opciones.error = "";
                // Agrega la alerta
                vm.opciones.listo =
                  "El producto " +
                  vm.productos.nombre +
                  ", ha sido MODIFICADO satisfactoriamente.";
              }
            },
            function (respuesta) {
              // Configura la bandera
              vm.productoBandera = 0;
              // Limpia satisfactorio
              vm.opciones.listo = "";
              // Agrega la alerta
              vm.opciones.error =
                "Error " +
                respuesta.status +
                ", hubo un error al modificar los datos.";
            }
          );
      }
    }
  };

  // Funcion agregar producto
  vm.guardarNuevo = function () {
    // Recorre la informacion del detalle de orden
    for (let i = 0; i < vm.ordenInfo.orderDetails.length; i++) {
      // Agrega los productos a la variable
      vm.productos.ids.push(vm.ordenInfo.orderDetails[i].productId);
    }
    // Valida si el producto existe en la variable
    if (vm.productos.ids.includes(vm.productoNuevo.productId)) {
      // Limpia satisfactorio
      vm.opciones.listo = "";
      // Agrega el error
      vm.opciones.error =
        "Error, el producto que intentas agregar ya existe en la orden.";
    } else {
      // Limpia el error
      vm.opciones.error = "";
      // Agrega el nuevo producto a la orden
      vm.ordenInfo.orderDetails.push(vm.productoNuevo);
      //////////////////////// METODO PUT ORDEN ///////////////////////
      $http
        .put(
          "https://localhost:7247/api/Orders/" + vm.ordenInfo.orderId,
          vm.ordenInfo
        )
        .then(
          function (respuesta) {
            if (respuesta.data) {
              // Configura la bandera
              vm.productoAgregar = 0;
              // Limpia el error
              vm.opciones.error = "";
              // Agrega la alerta
              vm.opciones.listo =
                "El producto ha sido AGREGADO satisfactoriamente.";
              // Limpia el objeto
              vm.productoNuevo = {
                orderId: 0,
                productId: 0,
                unitPrice: "",
                quantity: "",
                discount: 0,
              };
            }
          },
          function (respuesta) {
            // Configura la bandera
            vm.productoAgregar = 0;
            // Limpia satisfactorio
            vm.opciones.listo = "";
            // Agrega el error
            vm.opciones.error =
              "Error " +
              respuesta.status +
              ", hubo un error al modificar los datos.";
          }
        );
    }
  };

  // Funcion eliminar producto
  vm.eliminarProducto = function () {
    //////////////////////// METODO DELETE PRODUCTO ///////////////////////
    $http
      .delete(
        "https://localhost:7247/api/Orders?id=" +
          vm.ordenInfo.orderId +
          "&productId=" +
          vm.producto.productId
      )
      .then(
        function (respuesta) {
          if (respuesta.data) {
            // Configura la bandera
            vm.productoBandera = 0;
            // Limpia el error
            vm.opciones.error = "";
            // Agrega la alerta
            vm.opciones.listo =
              "El producto ha sido ELIMINADO satisfactoriamente.";
          }
        },
        function (respuesta) {
          // Configura la bandera
          vm.productoBandera = 0;
          // Limpia satisfactorio
          vm.opciones.listo = "";
          // Agrega la alerta
          vm.opciones.error =
            "Error " +
            respuesta.status +
            ", hubo un error al eliminar el producto.";
        }
      );
  };

  // Funcion cancelar
  vm.cancelar = function () {
    $uibModalInstance.dismiss("cancel");
  };

  //Funcion cerrar alertas
  vm.cerrarAlerta = function () {
    vm.opciones.listo = "";
    vm.opciones.error = "";
  };
});
