app.controller("articulosController", function () {
  var vm = this;

  vm.articulos = [
    {
      img: "/content/pictures/Juegos/PPTLS/pptls.jpg",
      titulo: "Piedra - Papel - Tijera - Lagarto - Spock",
      cont: "Piedra, Papel, Tijera, Lagarto o Spock es una expansión de los clásicos método de selección de juego piedra-papel-tijeras.",
      url: "/Juegos/PPTLS",
    },
    {
      img: "/content/pictures/Juegos/Suma/suma-min-max.jpg",
      titulo: "Suma Mini - Max",
      cont: "Minimax es un método de decisión para minimizar la pérdida máxima esperada en juegos con adversario y con información perfecta.",
      url: "/Juegos/Suma",
    }
  ];
});
