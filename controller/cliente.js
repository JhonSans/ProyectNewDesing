// Logica Northwind
app.controller("clienteCtrl", function ($http, $uibModal, $scope) {
  var vm = this;
  
  // Objetos
  vm.clienteDet = { id: "", miCliente: [], misClientes: [] };
  vm.opciones = { error: "", soloUna: true, sesion: "" };

  // Validacion de errores
  vm.validacion = {
    errorDato:
      "El dato que buscas no se encuentra registrado o se encuentra vacío...",
  };

  // Paginador
  vm.paginador = {
    totalItems: 0,
    paginaActual: 0,
    itemsPagina: 10,
    tamanoMax: 5
  };

  // Funcion cambiar pagina
  vm.cambiarPagina = function () {
    //////////// METODO GET CLIENTES PAGINADOR ////////////
    $http
      .get(
        "https://localhost:7247/api/Customers?pg=" + (vm.paginador.paginaActual - 1)
      )
      .then(function (respuesta) {
        // Actualiza los datos a la variable
        vm.clienteDet.misClientes = respuesta.data.data;
      });
  };

  //////////// METODO GET CLIENTES ////////////
  $http
    .get("https://localhost:7247/api/Customers?pg=" + vm.paginador.paginaActual)
    .then(function (respuesta) {
      // Agrega los datos a la variable
      vm.clienteDet.misClientes = respuesta.data.data;

      vm.paginador.totalItems = respuesta.data.count;
    });

  //////////// METODO GET CLIENTE {ID} ////////////
  vm.buscarCliente = function (id) {
    // Obtiene los datos de un cliente solicitado por su id
    $http
      .get("https://localhost:7247/api/Customers/" + id)
      .then(function (respuesta) {
        // Agrega los datos a la variable
        vm.clienteDet.miCliente = respuesta.data.customerId;

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
  vm.detalle = function (datos) {
    $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: "modal-title",
      ariaDescribedBy: "modal-body",
      templateUrl: "cliente.html",
      controller: "modalCliente",
      controllerAs: "cliente",
      size: "lg",
      resolve: {
        respuesta: function () {
          return datos;
        },
      },
    });
  };
});

// Controlador modal
app.controller("modalCliente", function ($uibModalInstance, respuesta, $http) {
  var vm = this;

  console.log(respuesta);

  // Objeto Cliente
  vm.clienteDato = {
    id: "",
    empresa: "",
    nombre: "",
    titulo: "",
    direccion: "",
    ciudad: "",
    region: "",
    codPostal: "",
    pais: "",
    telefono: "",
    fax: "",
    orden: [],
  };

  // Objeto Orden
  vm.detalle = {
    id: 0,
    clienteId: "",
    empleadoId: 0,
    fechaOrden: "",
    fechaEntrega: "",
    fechaSalida: "",
    via: 0,
    flete: 0,
    repartidor: "",
    direccion: "",
    ciudad: "",
    region: "",
    codPostal: "",
    pais: "",
    detalles: [],
  };

  // Objeto variables
  vm.opciones = {
    cliente: {},
    empleadoArray: [],
    viaArray: [],
    productoArray: [],
    ordenArray: [],
    ordenDetArray: [],
    respuesta: 0,
    id: 0,
    precio: 0,
    cantidad: 0,
    descuento: 0,
    suma: [],
  };

  // Agrega los datos del cliente a el objeto
  vm.clienteDato.id = respuesta.customerId;
  vm.clienteDato.empresa = respuesta.companyName;
  vm.clienteDato.nombre = respuesta.contactName;
  vm.clienteDato.titulo = respuesta.contactTitle;
  vm.clienteDato.direccion = respuesta.address;
  vm.clienteDato.ciudad = respuesta.city;
  vm.clienteDato.region = respuesta.region;
  vm.clienteDato.codPostal = respuesta.postalCode;
  vm.clienteDato.pais = respuesta.country;
  vm.clienteDato.telefono = respuesta.phone;
  vm.clienteDato.fax = respuesta.fax;
  vm.clienteDato.orden = respuesta.orders;

  // Funcion detalle de la orden
  vm.detallePro = function (datos) {
    // Agrega los datos de la orden a el objeto
    vm.detalle.id = datos.orderId;
    vm.detalle.clienteId = datos.customerId;
    vm.detalle.empleadoId = datos.employeeId;
    vm.detalle.fechaOrden = datos.orderDate;
    vm.detalle.fechaEntrega = datos.requiredDate;
    vm.detalle.fechaSalida = datos.shippedDate;
    vm.detalle.via = datos.shipVia;
    vm.detalle.flete = datos.freight;
    vm.detalle.repartidor = datos.shipName;
    vm.detalle.direccion = datos.shipAddress;
    vm.detalle.ciudad = datos.shipCity;
    vm.detalle.region = datos.shipRegion;
    vm.detalle.codPostal = datos.shipPostalCode;
    vm.detalle.pais = datos.shipCountry;
    vm.detalle.detalles = datos.orderDetails;

    //Limpia las variables
    vm.opciones.productoArray = [];
    vm.opciones.suma = [];
    vm.opciones.precio = 0;
    vm.opciones.cantidad = 0;
    vm.opciones.descuento = 0;

    // Recorre los detalles del producto
    for (let i = 0; i < vm.detalle.detalles.length; i++) {
      // Asigna los datos a las variables opcionales
      vm.opciones.id = vm.detalle.detalles[i].productId;
      vm.opciones.precio = vm.detalle.detalles[i].unitPrice;
      vm.opciones.cantidad = vm.detalle.detalles[i].quantity;
      vm.opciones.descuento = vm.detalle.detalles[i].discount;

      // Agrega el resultado de la suma a el array Suma
      vm.opciones.suma.push({
        id: vm.opciones.id,
        total:
          vm.opciones.precio * vm.opciones.cantidad -
          vm.opciones.precio * vm.opciones.cantidad * vm.opciones.descuento,
      });

      //////////// METODO GET PRODUCTO {ID} ////////////
      $http
        .get("https://localhost:7247/api/Products/" + vm.opciones.id)
        .then(function (respuesta) {
          // Agrega los datos a la variable
          vm.opciones.productoArray.push(respuesta.data);
        });
    }

    //////////// METODO GET EMPLEADOS ////////////
    $http
      .get("https://localhost:7247/api/Employees")
      .then(function (respuesta) {
        // Agrega los datos a la variable
        vm.opciones.empleadoArray = respuesta.data;
      });

    //////////// METODO GET TRANSPORTISTAS ////////////
    $http.get("https://localhost:7247/api/Shippers").then(function (respuesta) {
      // Agrega los datos a la variable
      vm.opciones.viaArray = respuesta.data;
    });
  };

  //////////// METODO PUT CLIENTE {ID} ////////////
  vm.guardar = function () {
    //$uibModalInstance.close("ok");

    vm.opciones.cliente = {
      customerId: vm.clienteDato.id,
      companyName: vm.clienteDato.empresa,
      contactName: vm.clienteDato.nombre,
      contactTitle: vm.clienteDato.titulo,
      address: vm.clienteDato.direccion,
      city: vm.clienteDato.ciudad,
      region: vm.clienteDato.region,
      postalCode: vm.clienteDato.codPostal,
      country: vm.clienteDato.pais,
      phone: vm.clienteDato.telefono,
      fax: vm.clienteDato.fax,
    };

    $http
      .put(
        "https://localhost:7247/api/Customers/" +
          vm.opciones.cliente.customerId,
        vm.opciones.cliente
      )
      .then(function (respuesta) {
        console.log(respuesta.data);
      });
  };

  // Funcion cancelar
  vm.cancelar = function () {
    $uibModalInstance.dismiss("cancel");
  };
});
