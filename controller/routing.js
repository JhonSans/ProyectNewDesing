//Controlador pagina activa
app.controller("activeNav", function ($scope, $location) {
  //Valida si esta activo
  $scope.isActive = function (viewLocate) {
    return viewLocate === $location.path();
  };
});

//Controlador carrusel
app.controller("mainCarrusel", function () {
  var vm = this;

  //Intervalo transicion
  vm.miIntervalo = 5000;
  //Activo inicial
  vm.active = 0;
  //Lista de imagenes
  vm.listaSlides = [
    { id: 0, img: "/img/main-1.jpg", info: "HTML + CSS" },
    { id: 1, img: "/img/main-2.png", info: "Bootstrap 3" },
    { id: 2, img: "/img/main-3.jpg", info: "AngularJS" },
  ];
});
