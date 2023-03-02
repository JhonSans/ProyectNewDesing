// Main controller
app.controller("mainController", function ($scope, $location) {
  // Menu movil
  $scope.toggle = false;

  // Fecha Copyright
  $scope.fecha = new Date();

  // Navbar Contenidos
  $scope.contenidos = [
    {
      url: "/Inicio",
      icono: "fa fa-home",
      titulo: "Inicio",
      drop: "",
      items: [],
    },
    {
      url: "",
      icono: "fa fa-gamepad",
      titulo: "Juegos",
      drop: "fa fa-chevron-right",
      items: [
        {
          url: "/Juegos/PPTLS",
          titulo: "PPTLS",
          detalle: "PIEDRA - PAPEL - TIJERA - LAGARTO - SPOCK",
          img: "/content/pictures/Juegos/PPTLS/banner.jpg",
          lead: "Piedra, Papel, Tijera, Lagarto o Spock es una expansión de los clásicos métodos de selección del juego piedra-papel-tijeras.",
          contenidoImg : "/content/pictures/Juegos/PPTLS/contenido.png",
          contenido: "<dl class='text-justify'><strong>Piedra, Papel, Tijera, Lagarto o Spock</strong> funciona en el mismo principio básico, pero incluye dos armas adicionales: el <strong>lagarto</strong> (formado por la mano como un títere de calcetín como la boca) y <strong>Spock</strong> (formado por la mano Vulcana de Star Trek). Esto reduce las posibilidades de un final redondo en un empate. El juego fue inventado por Sam Kass con Karen Bryla. </dl><dl class='text-justify'> El juego fue mencionado en cuatro episodios de The Big Bang Theory. De acuerdo con una entrevista con Kass, los productores de la serie no pidieron permiso para usar el juego, pero más tarde se hace referencia en un episodio de la quinta temporada. </dl>"
        },
        {
          url: "/Juegos/Suma",
          titulo: "Suma Mini - Max",
          detalle: "SUMA MINI - MAX",
          img: "/content/pictures/Juegos/Suma/banner.jpg",
          lead: "Minimax es un método de decisión para minimizar la pérdida máxima esperada en juegos con adversario y con información perfecta.",
          contenidoImg: "/content/pictures/Juegos/Suma/contenido.jpg",
          contenido: "<dl class='text-justify'><strong>John von Neumann</strong> dio la siguiente definición de lo que era un juego:</dl><blockquote><p class='text-justify'><em>" + '"Un juego es una situación conflictiva en la que uno debe tomar una decisión sabiendo que los demás también toman decisiones, y que el resultado del conflicto se determina, de algún modo, a partir de todas las decisiones realizadas."' + "</em></p><footer>John von Neumann</footer></blockquote><dl class='text-justify'>Y demostró en 1926 que siempre existe una forma racional (una estrategia óptima) de actuar en juegos de dos participantes, si los intereses que los gobiernan son completamente opuestos. A este resultado se le conoce como Teorema Minimax.</dl>",
        },
      ],
    },
  ];

  // Contenido paginas
  $scope.contenidoPagina = "";

  // Carrusel
  $scope.crActive = 0;
  $scope.crIntervalo = 5000;
  $scope.crWrapSlides = false;
  $scope.slides = [
    { id: 0, img: "/content/pictures/main-1.jpg", info: "HTML + CSS" },
    { id: 1, img: "/content/pictures/main-2.png", info: "Bootstrap 3" },
    { id: 2, img: "/content/pictures/main-3.jpg", info: "AngularJS" },
  ];

  // Funcion desplegar manu movil
  $scope.dropMenu = function () {
    $scope.toggle = !$scope.toggle;
  };

  // Funcion pagina activa
  $scope.isActive = function (viewLocate) {
    return viewLocate === $location.path();
  };

  // Redirige a la direccion
  $scope.redirectLink = function (link) {
    if (link != null && link != "") {
      $scope.toggle = false;
      $location.url(link);
    }
  };

  $scope.actualizarContenido = function (link) {
    $scope.toggle = false;

    _.each($scope.contenidos, function (c) {
      _.each(c.items, function (i) {
        if (link == i.url) {
          $scope.contenidoPagina = {
            url: i.url,
            titulo: i.detalle,
            img: i.img,
            lead: i.lead,
            contenidoImg: i.contenidoImg,
            contenido: i.contenido
          };
        }
      });
    });
  };

  $scope.actualizarContenido($location.path());
});
