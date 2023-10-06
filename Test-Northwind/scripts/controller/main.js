mainApp.controller("mainController", function ($scope) {

    $scope.toggleNav = "Default";
    $scope.toggleMenu = false;
    $scope.toggleHeader = false;

    $scope.news = [
        { Picture: "content/back-1.jpg", Name: "¿Qué es Lorem Ipsum?", Description: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen." },
        { Picture: "content/back-2.jpg", Name: "¿Por qué lo usamos?", Description: "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo 'Contenido aquí, contenido aquí'." },
        { Picture: "content/back-3.jpg", Name: "¿De dónde viene?", Description: "Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, 'consecteur', en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable." },
        { Picture: "content/back-4.jpg", Name: "¿Dónde puedo conseguirlo?", Description: "Hay muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría sufrió alteraciones en alguna manera, ya sea porque se le agregó humor, o palabras aleatorias que no parecen ni un poco creíbles. Si vas a utilizar un pasaje de Lorem Ipsum, necesitás estar seguro de que no hay nada avergonzante escondido en el medio del texto." }
    ];

    $scope.toggleMenuAction = function () {

        if ($scope.toggleNav == "Default") {
            $scope.toggleNav = "In"
            $scope.toggleMenu = !$scope.toggleMenu
        }
        else if ($scope.toggleNav == "In") {
            $scope.toggleNav = "Down"
            $scope.toggleMenu = !$scope.toggleMenu
        }
        else {
            $scope.toggleNav = "Default"
            $scope.toggleMenuAction();
        }
    }
});