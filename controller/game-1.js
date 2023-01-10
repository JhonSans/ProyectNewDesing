// Logica Juego 1
app.controller("miPrimerJuego", function ($scope, $uibModal) {
  var vm = this;

  //Objetos
  vm.j1 = {
    nombre: "",
    estrategia: "",
    ganadasJ1: 0,
    img: "",
  };
  vm.j2 = {
    nombre: "",
    estrategia: "",
    ganadasJ2: 0,
    img: "",
  };
  vm.res = {
    nombre: "",
    jugada: "",
    razon: "",
    img: "",
    estado: "",
  };

  //Activa la animacion del modal
  vm.animationsEnabled = true;

  //Array Opciones
  vm.opcionesJuego = [
    {
      opcionId: "1",
      opcionInfo: "Roca",
      opcionImg: "img/game1/piedra.png",
    },
    {
      opcionId: "2",
      opcionInfo: "Papel",
      opcionImg: "img/game1/papel.png",
    },
    {
      opcionId: "3",
      opcionInfo: "Tijera",
      opcionImg: "img/game1/tijera.png",
    },
    {
      opcionId: "4",
      opcionInfo: "Lagarto",
      opcionImg: "img/game1/lagarto.png",
    },
    {
      opcionId: "5",
      opcionInfo: "Spock",
      opcionImg: "img/game1/spock.png",
    },
  ];
  //Array Reglas
  vm.reglasJuego = [
    "Tijeras cortan Papel.",
    "Papel cubre Roca.",
    "Roca aplasta lagarto.",
    "Lagarto envenena Spock.",
    "Spock destruye Tijeras.",
    "Tijeras decapitan Lagarto.",
    "Lagarto come Papel.",
    "Papel refuta Spock.",
    "Spock vaporiza Roca.",
    "Roca aplasta Tijeras.",
  ];

  //Funcion comenzar
  vm.comenzarJuego = function (size) {
    //Toma el primer caracter de cada cadena y los concatena
    vm.res.jugada = vm.j1.estrategia.charAt(0) + vm.j2.estrategia.charAt(0);

    //Toma decision
    switch (vm.res.jugada) {
      //Condicion victoria jugador 1
      case "TP":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j1.nombre;
        vm.res.razon = vm.reglasJuego[0];
        vm.j1.ganadasJ1 = vm.j1.ganadasJ1 + 1;
        vm.res.img = vm.j1.img;
        break;
      case "PR":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j1.nombre;
        vm.res.razon = vm.reglasJuego[1];
        vm.j1.ganadasJ1 = vm.j1.ganadasJ1 + 1;
        vm.res.img = vm.j1.img;
        break;
      case "RL":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j1.nombre;
        vm.res.razon = vm.reglasJuego[2];
        vm.j1.ganadasJ1 = vm.j1.ganadasJ1 + 1;
        vm.res.img = vm.j1.img;
        break;
      case "LS":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j1.nombre;
        vm.res.razon = vm.reglasJuego[3];
        vm.j1.ganadasJ1 = vm.j1.ganadasJ1 + 1;
        vm.res.img = vm.j1.img;
        break;
      case "ST":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j1.nombre;
        vm.res.razon = vm.reglasJuego[4];
        vm.j1.ganadasJ1 = vm.j1.ganadasJ1 + 1;
        vm.res.img = vm.j1.img;
        break;
      case "TL":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j1.nombre;
        vm.res.razon = vm.reglasJuego[5];
        vm.j1.ganadasJ1 = vm.j1.ganadasJ1 + 1;
        vm.res.img = vm.j1.img;
        break;
      case "LP":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j1.nombre;
        vm.res.razon = vm.reglasJuego[6];
        vm.j1.ganadasJ1 = vm.j1.ganadasJ1 + 1;
        vm.res.img = vm.j1.img;
        break;
      case "PS":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j1.nombre;
        vm.res.razon = vm.reglasJuego[7];
        vm.j1.ganadasJ1 = vm.j1.ganadasJ1 + 1;
        vm.res.img = vm.j1.img;
        break;
      case "SR":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j1.nombre;
        vm.res.razon = vm.reglasJuego[8];
        vm.j1.ganadasJ1 = vm.j1.ganadasJ1 + 1;
        vm.res.img = vm.j1.img;
        break;
      case "RT":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j1.nombre;
        vm.res.razon = vm.reglasJuego[9];
        vm.j1.ganadasJ1 = vm.j1.ganadasJ1 + 1;
        vm.res.img = vm.j1.img;
        break;

      //Condicion victoria jugador 2
      case "PT":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j2.nombre;
        vm.res.razon = vm.reglasJuego[0];
        vm.j2.ganadasJ2 = vm.j2.ganadasJ2 + 1;
        vm.res.img = vm.j2.img;
        break;
      case "RP":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j2.nombre;
        vm.res.razon = vm.reglasJuego[1];
        vm.j2.ganadasJ2 = vm.j2.ganadasJ2 + 1;
        vm.res.img = vm.j2.img;
        break;
      case "LR":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j2.nombre;
        vm.res.razon = vm.reglasJuego[2];
        vm.j2.ganadasJ2 = vm.j2.ganadasJ2 + 1;
        vm.res.img = vm.j2.img;
        break;
      case "SL":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j2.nombre;
        vm.res.razon = vm.reglasJuego[3];
        vm.j2.ganadasJ2 = vm.j2.ganadasJ2 + 1;
        vm.res.img = vm.j2.img;
        break;
      case "TS":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j2.nombre;
        vm.res.razon = vm.reglasJuego[4];
        vm.j2.ganadasJ2 = vm.j2.ganadasJ2 + 1;
        vm.res.img = vm.j2.img;
        break;
      case "LT":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j2.nombre;
        vm.res.razon = vm.reglasJuego[5];
        vm.j2.ganadasJ2 = vm.j2.ganadasJ2 + 1;
        vm.res.img = vm.j2.img;
        break;
      case "PL":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j2.nombre;
        vm.res.razon = vm.reglasJuego[6];
        vm.j2.ganadasJ2 = vm.j2.ganadasJ2 + 1;
        vm.res.img = vm.j2.img;
        break;
      case "SP":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j2.nombre;
        vm.res.razon = vm.reglasJuego[7];
        vm.j2.ganadasJ2 = vm.j2.ganadasJ2 + 1;
        vm.res.img = vm.j2.img;
        break;
      case "RS":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j2.nombre;
        vm.res.razon = vm.reglasJuego[8];
        vm.j2.ganadasJ2 = vm.j2.ganadasJ2 + 1;
        vm.res.img = vm.j2.img;
        break;
      case "TR":
        vm.res.estado = "¡¡GANADOR!!";
        vm.res.nombre = vm.j2.nombre;
        vm.res.razon = vm.reglasJuego[9];
        vm.j2.ganadasJ2 = vm.j2.ganadasJ2 + 1;
        vm.res.img = vm.j2.img;
        break;

      //Condicion empate
      case "RR":
        vm.res.estado = "EMPATE!!";
        vm.res.nombre = "";
        vm.res.razon = "Ambos Jugadores sacaron Roca.";
        vm.res.img = "";
        break;
      case "PP":
        vm.res.estado = "EMPATE!!";
        vm.res.nombre = "";
        vm.res.razon = "Ambos Jugadores sacaron Papel.";
        vm.res.img = "";
        break;
      case "TT":
        vm.res.estado = "EMPATE!!";
        vm.res.nombre = "";
        vm.res.razon = "Ambos Jugadores sacaron Tijera.";
        vm.res.img = "";
        break;
      case "LL":
        vm.res.estado = "EMPATE!!";
        vm.res.nombre = "";
        vm.res.razon = "Ambos Jugadores sacaron Lagarto.";
        vm.res.img = "";
        break;
      case "SS":
        vm.res.estado = "EMPATE!!";
        vm.res.nombre = "";
        vm.res.razon = "Ambos Jugadores sacaron Spock.";
        vm.res.img = "";
        break;
    }

    //Crea la instacia uibModal
    $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: "modal-title",
      ariaDescribedBy: "modal-body",
      templateUrl: "game-1.html",
      controller: "instanciaModal",
      controllerAs: "juego1",
      size: size,
      resolve: {
        resultadoJuego: function () {
          return vm.res;
        },
      },
    });
  };
});

// Controlador instancia del Modal
app.controller("instanciaModal", function ($uibModalInstance, resultadoJuego) {
  var vm = this;

  //Objeto resultado
  vm.res = { nombre: "", razon: "", img: "", estado: "" };

  //console.log(resultadoJuego);

  //Resultado del juego
  vm.res.nombre = resultadoJuego.nombre;
  vm.res.razon = resultadoJuego.razon;
  vm.res.img = resultadoJuego.img;
  vm.res.estado = resultadoJuego.estado;

  //Accion boton cerrar
  vm.cerrarModal = function () {
    $uibModalInstance.close("cerrar");
  };
});
