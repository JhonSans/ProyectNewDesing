//Controlador pagina activa
app.controller("activeNav", function ($scope, $location) {
  //Valida si esta activo
  $scope.isActive = function (viewLocate) {
    return viewLocate === $location.path();
  };
});
