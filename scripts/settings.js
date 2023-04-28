app.factory("settings", function () {
    // Base url para relizar las consultas en el back
    var url = "https://localhost:7247/";
    // Objeto propiedades
    var propierties = {
        baseUrl : url
    };
    // Retorna las propiedades
    return propierties;
});

/**
 * DIRECTIVAS
 */
// Buscar elementos
app.directive('buscarElemento', function () {
    // Retorna la funcion que ejecuta el evento de enter
    return function (scope, element, attrs) {
        // Valida los eventos keydown/keypress y ejecuta la funcion
        element.bind("keydown keypress", function (event) {
            // Si la tecla es el enter ejecuta la accion
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.buscarElemento);
                });

                event.preventDefault();
            }
        });
    };
});