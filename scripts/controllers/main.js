// Main controller
app.controller("mainController", function ($scope, $location) {
    // Var menu movil
    $scope.toggle = false;

    // Var fecha Copyright
    $scope.fecha = new Date();

    // Objeto contenidos
    $scope.contenidos = [
        {
            url: "/Inicio",
            icono: "fa fa-home",
            titulo: "Inicio",
            drop: "",
            articulos: [],
        },
        {
            url: "",
            icono: "fa fa-gamepad",
            titulo: "Juegos",
            drop: "fa fa-chevron-right",
            articulos: [
                {
                    url: "/Juegos/PPTLS",
                    icon: "fa-gamepad",
                    titulo: "PPTLS",
                    detalle: "PIEDRA - PAPEL - TIJERA - LAGARTO - SPOCK",
                    img: "/content/pictures/Juegos/PPTLS/banner.jpg",
                    lead: "Piedra, Papel, Tijera, Lagarto o Spock es una expansión de los clásicos métodos de selección del juego piedra-papel-tijeras.",
                    contenidoImg: "/content/pictures/Juegos/PPTLS/contenido.png",
                    contenido: "<dl class='text-justify'><strong>Piedra, Papel, Tijera, Lagarto o Spock</strong> funciona en el mismo principio básico, pero incluye dos armas adicionales: el <strong>lagarto</strong> (formado por la mano como un títere de calcetín como la boca) y <strong>Spock</strong> (formado por la mano Vulcana de Star Trek). Esto reduce las posibilidades de un final redondo en un empate. El juego fue inventado por Sam Kass con Karen Bryla. </dl><dl class='text-justify'> El juego fue mencionado en cuatro episodios de The Big Bang Theory. De acuerdo con una entrevista con Kass, los productores de la serie no pidieron permiso para usar el juego, pero más tarde se hace referencia en un episodio de la quinta temporada. </dl>",
                },
                {
                    url: "/Juegos/Suma",
                    icon: "fa-calculator",
                    titulo: "Suma Mini - Max",
                    detalle: "SUMA MINI - MAX",
                    img: "/content/pictures/Juegos/Suma/banner.jpg",
                    lead: "Minimax es un método de decisión para minimizar la pérdida máxima esperada en juegos con adversario y con información perfecta.",
                    contenidoImg: "/content/pictures/Juegos/Suma/contenido.jpg",
                    contenido: "<dl class='text-justify'><strong>John von Neumann</strong> dio la siguiente definición de lo que era un juego:</dl><blockquote><p class='text-justify'><em>Un juego es una situación conflictiva en la que uno debe tomar una decisión sabiendo que los demás también toman decisiones, y que el resultado del conflicto se determina, de algún modo, a partir de todas las decisiones realizadas.</em></p><footer>John von Neumann</footer></blockquote><dl class='text-justify'>Y demostró en 1926 que siempre existe una forma racional (una estrategia óptima) de actuar en juegos de dos participantes, si los intereses que los gobiernan son completamente opuestos. A este resultado se le conoce como Teorema Minimax.</dl>",
                },
            ],
        },
        {
            url: "",
            icono: "fa fa-list-alt",
            titulo: "Northwind",
            drop: "fa fa-chevron-right",
            articulos: [
                {
                    url: "/Northwind/Clientes",
                    icon: "fa-users",
                    titulo: "Clientes",
                    detalle: "Northwind - Clientes",
                    img: "/content/pictures/Northwind/Clientes/banner.jpg",
                    lead: "",
                    contenidoImg: "",
                    contenido: "",
                },
                {
                    url: "/Northwind/Productos",
                    icon: "fa-cutlery",
                    titulo: "Productos",
                    detalle: "Northwind - Productos",
                    img: "/content/pictures/Northwind/Productos/banner.jpg",
                    lead: "",
                    contenidoImg: "",
                    contenido: ""
                },
                {
                    url: "/Northwind/Ordenes",
                    icon: "fa-truck",
                    titulo: "Ordenes",
                    detalle: "Northwind - Ordenes",
                    img: "/content/pictures/Northwind/Ordenes/banner.jpeg",
                    lead: "",
                    contenidoImg: "",
                    contenido: "",
                }
            ]
        }
    ];

    // Var contenido
    $scope.contenidoPagina = "";

    // Var carrusel
    $scope.crActive = 0;
    $scope.crIntervalo = 5000;
    $scope.crWrapSlides = false;

    // Objeto slides carrusel
    $scope.slides = [
        { id: 0, img: "/content/pictures/main-1.jpg", info: "HTML + CSS" },
        { id: 1, img: "/content/pictures/main-2.png", info: "Bootstrap 3" },
        { id: 2, img: "/content/pictures/main-3.jpg", info: "AngularJS" },
    ];

    // Funcion inicial
    this.init = function () {
        // Actualiza el contenido de la pagina
        $scope.actualizarContenido($location.path());
    };

    // Funcion desplegar menu movil
    $scope.dropMenu = function () {
        // Cambia el estado de la variable movil
        $scope.toggle = !$scope.toggle;
    };

    // Funcion pagina activa
    $scope.isActive = function (viewLocate) {
        // Retorna el path actual
        return viewLocate === $location.path();
    };

    // Redirige a la pagina seleccionada
    $scope.redirectLink = function (link) {
        // Valida que el link no este vacio
        if (link != null && link != "") {
            // Cambia el estado de la variable movil
            $scope.toggle = false;

            // Redirige a el link
            $location.url(link);
        }
    };

    // Actualiza el contenido de la pagina seleccionada
    $scope.actualizarContenido = function (link) {
        // Cambia el estado de la variable movil
        $scope.toggle = false;

        // Valida si la variable contenidoPagina esta vacia, si no es asi, redirige a el link
        if ($scope.contenidoPagina != null || $scope.contenidoPagina != '')
            $location.path(link)

        // Recorre los contenidos de la pagina
        _.each($scope.contenidos, function (c) {
            // Recorre los articulos
            _.each(c.articulos, function (i) {
                // Valida si el link del articulo sea igual al link recibido
                if (link == i.url) {
                    // Asigna los parametros del articulo a el contenido de la pagina
                    $scope.contenidoPagina = {
                        url: i.url,
                        titulo: i.detalle,
                        img: i.img,
                        lead: i.lead,
                        contenidoImg: i.contenidoImg,
                        contenido: i.contenido,
                    };
                }
            });
        });
    };

    // Carga la funcion inicial
    this.init();
});
