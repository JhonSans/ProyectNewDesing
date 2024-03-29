mainApp.controller("mainController", function ($scope, $location, $window) {
    $scope.toggleNav = "Default";
    $scope.toggleMenu = false;
    $scope.toggleHeader = false;
    $scope.fixedNav = false;

    $scope.lastScrollPosition = $window.scrollY || $window.pageYOffset;

    $scope.news = [
        {
            Picture: "content/back-1.jpg",
            Character: "content/back-1-pj.png",
            Name: "¿Qué es Lorem Ipsum?",
            Description: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.",
        },
        {
            Picture: "content/back-2.jpg",
            Character: "content/back-2-pj.png",
            Name: "¿Por qué lo usamos?",
            Description: "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo 'Contenido aquí, contenido aquí'.",
        },
        {
            Picture: "content/back-3.jpg",
            Character: "content/back-3-pj.png",
            Name: "¿De dónde viene?",
            Description: "Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, 'consecteur', en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable.",
        },
        {
            Picture: "content/back-4.jpg",
            Character: "content/back-4-pj.png",
            Name: "¿Dónde puedo conseguirlo?",
            Description: "Hay muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría sufrió alteraciones en alguna manera, ya sea porque se le agregó humor, o palabras aleatorias que no parecen ni un poco creíbles. Si vas a utilizar un pasaje de Lorem Ipsum, necesitás estar seguro de que no hay nada avergonzante escondido en el medio del texto.",
        },
        {
            Picture: "content/back-5.jpg",
            Character: "content/back-5-pj.png",
            Name: "El pasaje estándar Lorem Ipsum",
            Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
            Picture: "content/back-6.jpg",
            Character: "content/back-6-pj.png",
            Name: "Traducción hecha por H. Rackham en 1914",
            Description: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
        },
    ];

    $scope.isActive = function (viewLocate) {
        return viewLocate === $location.path();
    };

    $scope.$on("$locationChangeStart", function (event, next, current) {
        if (current != next) {
            $scope.toggleNav = "In";
            $scope.toggleMenuAction();
        }
    });

    $scope.toggleMenuAction = function () {
        if ($scope.toggleNav == "Default") {
            $scope.toggleNav = "In";
            $scope.toggleMenu = !$scope.toggleMenu;
        } else if ($scope.toggleNav == "In") {
            $scope.toggleNav = "Down";
            $scope.toggleMenu = !$scope.toggleMenu;
        } else {
            $scope.toggleNav = "Default";
            $scope.toggleMenuAction();
        }
    };

    // Function to handle scroll event
    angular.element($window).bind('scroll', function() {
        // Get the current scroll position
        var currentScrollPosition = $window.scrollY || $window.pageYOffset;

        // Detect change in scroll position
        if (currentScrollPosition !== $scope.lastScrollPosition) {
            // Scroll position has changed
            // console.log('Scroll position changed!');
            // console.log('Previous scroll position:', $scope.lastScrollPosition);
            // console.log('Current scroll position:', currentScrollPosition);

            // Update the last scroll position
            $scope.lastScrollPosition = currentScrollPosition;

            if ($scope.lastScrollPosition >= 110)
                $scope.fixedNav = true;
            else
                $scope.fixedNav = false;

            // Apply changes to the scope (if needed)
            $scope.$apply();
        }
    });
});
