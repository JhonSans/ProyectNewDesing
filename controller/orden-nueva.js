app.controller("ordenNuevaCtrl", function ($http) {
  var vm = this;

  // Objeto selector
  vm.selector = {
    clientes: [],
    empleados: [],
    via: [],
  };

  // Objeto orden
  vm.orden = {
    orderId: "",
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

  ///////////////////////// METODO GET CLIENTES /////////////////////////
  $http.get("https://localhost:7247/api/Customers").then(function (respuesta) {
    vm.selector.clientes = respuesta.data;
  });

  ///////////////////////// METODO GET EMPLEADOS /////////////////////////
  $http.get("https://localhost:7247/api/Employees").then(function (respuesta) {
    vm.selector.empleados = respuesta.data;
  });

  ///////////////////////// METODO GET VIA /////////////////////////
  $http.get("https://localhost:7247/api/Shippers").then(function (respuesta) {
    vm.selector.via = respuesta.data;
  });
});
