app.controller("pptslController", function ($location, $interval, $timeout) {
    var vm = this;

    // Cargando
    vm.cargando = 0;

    // Pausa
    vm.pause = false;
    vm.pauseMostrar = false;

    // Cambios de estado
    vm.vista = 1;

    // Toggle accion cerrar/abrir
    vm.toggle = false;
    
    // Seleccionado
    vm.seleccionado = { personaje: "", estrategia: "", opcion: "", icono: "" };
    
    // Conteo para jugar
    vm.conteo = "VS";

    // Cantidad de jugadores
    vm.cantidad = "";

    // Condicion de victoria
    vm.estado = { partida: false, condicion: "", razon: "", resultado: "", iconoJ1: "", iconoJ2: "" };

    // Jugadores
    vm.jugadores = [];

    // Daño inflingido
    vm.hit = { dano: "", valor: "", objetivo: "" };

    // Reglas del juego
    vm.reglas = [
        "Tijeras cortan Papel.",
        "Papel cubre Piedra.",
        "Piedra aplasta lagarto.",
        "Lagarto envenena Spock.",
        "Spock destruye Tijeras.",
        "Tijeras decapitan Lagarto.",
        "Lagarto come Papel.",
        "Papel refuta Spock.",
        "Spock vaporiza Piedra.",
        "Piedra aplasta Tijeras.",
    ];

    // Personajes
    vm.personajes = [
        "fa-android",
        "fa-superpowers",
        "fa-snowflake-o",
        "fa-drupal",
        "fa-envira",
        "fa-empire",
        "fa-eercast",
        "fa-firefox",
        "fa-first-order",
        "fa-gitlab",
        "fa-rebel",
        "fa-renren",
        "fa-desktop",
    ];

    // Opciones del juego
    vm.estrategias = [
        {
            id: 1,
            titulo: "Piedra",
            img: "/content/pictures/Juegos/PPTLS/piedra.png",
            icono: "fa-hand-rock-o",
        },
        {
            id: 2,
            titulo: "Papel",
            img: "/content/pictures/Juegos/PPTLS/papel.png",
            icono: "fa-hand-paper-o",
        },
        {
            id: 3,
            titulo: "Tijera",
            img: "/content/pictures/Juegos/PPTLS/tijera.png",
            icono: "fa-hand-scissors-o",
        },
        {
            id: 4,
            titulo: "Lagarto",
            img: "/content/pictures/Juegos/PPTLS/lagarto.png",
            icono: "fa-hand-lizard-o",
        },
        {
            id: 5,
            titulo: "Spock",
            img: "/content/pictures/Juegos/PPTLS/spock.png",
            icono: "fa-hand-spock-o",
        },
    ];

    // Funcion inicial
    vm.init = function () {
        vm.cargandoJuego();
    };

    // Funcion ir a pagina del juego
    vm.jugar = function () {
        return $location.url("/Juegos/PPTLS/Jugar");
    };

    // Funcion regresar
    vm.regresar = function () {
        return $location.url("/Juegos/PPTLS");
    };

    // Cerrar ventanas
    vm.cerrar = function () {
        vm.toggle = !vm.toggle;
    };

    // Funcion cambiar vista del juego
    vm.cambioVista = function (vista) {
        // Limpia los jugadores
        vm.jugadores = [];

        // Cambia a la vista indicada
        switch (vista) {
            case "inicio":
                vm.vista = 0;
                break;
            case "comenzar":
                vm.vista = 1;
                break;    
            case "creditos":
                vm.vista = 3;
                break;
        }
    };

    // Funcion regresar vista anterior
    vm.volver = function () {
        // Valida si la vista actual es CREDITOS, si es asi regresa al inicio si no regresa a una vista anterior
        if (vm.vista == 3) {
            vm.vista = 0;
        } else {
            vm.vista = vm.vista - 1;
        }
    };

    // Funcion agregar jugadores
    vm.agregarJugadores = function (n) {
        // Asigna el numero de jugadores a la cantidad
        vm.cantidad = n;

        // Limpia las variables
        vm.jugadores = [];
        vm.seleccionado = { personaje: "", estrategia: "", opcion: "", icono: "" };

        // Pantalla de carga
        vm.cargandoJuego();

        // Cambia la vista
        $timeout(function () {
            vm.vista = 2;
        }, 1000);

        // Valida si van a jugar 1 o 2 jugadores y los agrega al abjeto
        if (vm.cantidad == 1) {
            vm.jugadores.push(
                { nombre: "", icono: "", estrategia: "", img: "", vida: "100" },
                { nombre: "CPU", icono: "fa-desktop", estrategia: "", img: "", vida: "100" }
            );
        } else {
            vm.jugadores.push(
                { nombre: "", icono: "", estrategia: "", img: "", vida: "100" },
                { nombre: "", icono: "", estrategia: "", img: "", vida: "100" }
            );
        }
    };

    // Funcion asignar elecciones del jugador
    vm.jugadorElecciones = function (dato) {      
        // Valida si la cantidad de jugadores es 1
        if (vm.cantidad == 1) {
            // Valida si el dato recibido es int o un string
            if (typeof dato === "string") {
                // Recorre a los jugadores, si el jugador es diferente a la CPU, agrega el personaje a el jugador
                _.each(vm.jugadores, function (j) {
                    if (j.nombre != "CPU") { 
                        j.icono = dato;
                        j.nombre = dato;
                        vm.seleccionado.opcion = dato;

                        // Espera 2 segundos para asignar el dato a la variable personaje
                        $timeout(function () {
                            vm.seleccionado.personaje = dato;
                        }, 2000);
                    }
                });
            }
            else {
                // Asigna el valor del click a la estrategia
                vm.seleccionado.estrategia = dato;

                // Recorre las estrategias y agrega el icono a la variable
                _.each(vm.estrategias, function (e) {
                    if (e.id == dato)
                        vm.seleccionado.icono = e.icono;
                });

                // Recorre a los jugadores, si el jugador es diferente a la CPU, agrega la estrategia a el jugador
                _.each(vm.jugadores, function (e) {
                    if (e.nombre != "CPU") { 
                        e.estrategia = vm.seleccionado.estrategia;
                        e.img = vm.seleccionado.icono;
                    }
                });
            }
        } else {
            // VS
        }
    };

    // Funcion para comenzar el juego
    vm.comenzarJuego = function () {

        // Si el juego no esta pausado, cambia el icono de play a pause
        vm.pause = true;

        // Bloquea el boton pause
        vm.estado.partida = true;

        // Realiza el conteo para comenzar a jugar
        $interval(function (i) {
            if (i == 1) vm.conteo = "3";
            if (i == 2) vm.conteo = "2";
            if (i == 3) vm.conteo = "1";
            if (i == 4) vm.conteo = "YA!";
            if (i == 5) vm.conteo = "";
        }, 1000);

        if (!vm.pauseMostrar) {
            // Recorre los jugadores, si el jugador es CPU le asigna un valor de estrategia aleatorio
            _.each(vm.jugadores, function (p) {
                if (p.nombre == "CPU") {
                    _.each(vm.estrategias, function (e) {
                        var r = Math.ceil(Math.random() * (5 - 1) + 1);

                        if (e.id == r.toString()) {
                            p.estrategia = e.id;
                            p.img = e.icono;
                        }
                    });
                }
            });

            // Espera 5 segundos para ejecutar la funcion
            $timeout(function () {
                // Ejecuta la funcion de partida
                vm.partidaJugada();
            }, 5000);
            
            // Espera 6 segundos para ejecutar la funcion
            $timeout(function () {
                vm.comenzarJuego();
                vm.seleccionado.estrategia = "";
                vm.estado = { partida: false, condicion: "", razon: "", resultado: "", iconoJ1: "", iconoJ2: "" };
                vm.hit = { dano: "", valor: "", objetivo: "" };
            }, 7000);
        }
    };

    // Funcion pausar
    vm.pausarJuego = function () {
        vm.pauseMostrar = !vm.pauseMostrar;
    }

    // Funcion obtener ganador
    vm.partidaJugada = function () {

        // Recorre los jugadores asigna las estrategias a la condicion
        _.each(vm.jugadores, function(p) {
            vm.estado.condicion += p.estrategia;
        });

        // Condiciones
        switch (vm.estado.condicion) {

            // Victoria
            case "32":
                vm.estado.razon = vm.reglas[0];
                vm.estado.resultado = "¡GANADOR!";
                vm.estado.iconoJ1 = vm.estrategias[2].icono;
                vm.estado.iconoJ2 = vm.estrategias[1].icono;
                break;
            case "21":
                vm.estado.razon = vm.reglas[1];
                vm.estado.resultado = "¡GANADOR!";
                vm.estado.iconoJ1 = vm.estrategias[1].icono;
                vm.estado.iconoJ2 = vm.estrategias[0].icono;
                break;
            case "14":
                vm.estado.razon = vm.reglas[2];
                vm.estado.resultado = "¡GANADOR!";
                vm.estado.iconoJ1 = vm.estrategias[0].icono;
                vm.estado.iconoJ2 = vm.estrategias[3].icono;
                break;
            case "45":
                vm.estado.razon = vm.reglas[3];
                vm.estado.resultado = "¡GANADOR!";
                vm.estado.iconoJ1 = vm.estrategias[3].icono;
                vm.estado.iconoJ2 = vm.estrategias[4].icono;
                break;
            case "53":
                vm.estado.razon = vm.reglas[4];
                vm.estado.resultado = "¡GANADOR!";
                vm.estado.iconoJ1 = vm.estrategias[4].icono;
                vm.estado.iconoJ2 = vm.estrategias[2].icono;
                break;
            case "34":
                vm.estado.razon = vm.reglas[5];
                vm.estado.resultado = "¡GANADOR!";
                vm.estado.iconoJ1 = vm.estrategias[2].icono;
                vm.estado.iconoJ2 = vm.estrategias[3].icono;
                break;
            case "42":
                vm.estado.razon = vm.reglas[6];
                vm.estado.resultado = "¡GANADOR!";
                vm.estado.iconoJ1 = vm.estrategias[3].icono;
                vm.estado.iconoJ2 = vm.estrategias[1].icono;
                break;
            case "25":
                vm.estado.razon = vm.reglas[7];
                vm.estado.resultado = "¡GANADOR!";
                vm.estado.iconoJ1 = vm.estrategias[1].icono;
                vm.estado.iconoJ2 = vm.estrategias[4].icono;
                break;
            case "51":
                vm.estado.razon = vm.reglas[8];
                vm.estado.resultado = "¡GANADOR!";
                vm.estado.iconoJ1 = vm.estrategias[4].icono;
                vm.estado.iconoJ2 = vm.estrategias[0].icono;
                break;
            case "13":
                vm.estado.razon = vm.reglas[9];
                vm.estado.resultado = "¡GANADOR!";
                vm.estado.iconoJ1 = vm.estrategias[0].icono;
                vm.estado.iconoJ2 = vm.estrategias[2].icono;
                break;

            // Derrota
            case "23":
                vm.estado.razon = vm.reglas[0];
                vm.estado.resultado = "¡PERDEDOR!";
                vm.estado.iconoJ1 = vm.estrategias[1].icono;
                vm.estado.iconoJ2 = vm.estrategias[2].icono;
                break;
            case "12":
                vm.estado.razon = vm.reglas[1];
                vm.estado.resultado = "¡PERDEDOR!";
                vm.estado.iconoJ1 = vm.estrategias[0].icono;
                vm.estado.iconoJ2 = vm.estrategias[1].icono;
                break;
            case "41":
                vm.estado.razon = vm.reglas[2];
                vm.estado.resultado = "¡PERDEDOR!";
                vm.estado.iconoJ1 = vm.estrategias[3].icono;
                vm.estado.iconoJ2 = vm.estrategias[0].icono;
                break;
            case "54":
                vm.estado.razon = vm.reglas[3];
                vm.estado.resultado = "¡PERDEDOR!";
                vm.estado.iconoJ1 = vm.estrategias[4].icono;
                vm.estado.iconoJ2 = vm.estrategias[3].icono;
                break;
            case "35":
                vm.estado.razon = vm.reglas[4];
                vm.estado.resultado = "¡PERDEDOR!";
                vm.estado.iconoJ1 = vm.estrategias[2].icono;
                vm.estado.iconoJ2 = vm.estrategias[4].icono;
                break;
            case "43":
                vm.estado.razon = vm.reglas[5];
                vm.estado.resultado = "¡PERDEDOR!";
                vm.estado.iconoJ1 = vm.estrategias[3].icono;
                vm.estado.iconoJ2 = vm.estrategias[2].icono;
                break;
            case "24":
                vm.estado.razon = vm.reglas[6];
                vm.estado.resultado = "¡PERDEDOR!";
                vm.estado.iconoJ1 = vm.estrategias[1].icono;
                vm.estado.iconoJ2 = vm.estrategias[3].icono;
                break;
            case "52":
                vm.estado.razon = vm.reglas[7];
                vm.estado.resultado = "¡PERDEDOR!";
                vm.estado.iconoJ1 = vm.estrategias[4].icono;
                vm.estado.iconoJ2 = vm.estrategias[1].icono;
                break;
            case "15":
                vm.estado.razon = vm.reglas[8];
                vm.estado.resultado = "¡PERDEDOR!";
                vm.estado.iconoJ1 = vm.estrategias[0].icono;
                vm.estado.iconoJ2 = vm.estrategias[4].icono;
                break;
            case "31":
                vm.estado.razon = vm.reglas[9];
                vm.estado.resultado = "¡PERDEDOR!";
                vm.estado.iconoJ1 = vm.estrategias[2].icono;
                vm.estado.iconoJ2 = vm.estrategias[0].icono;
                break;

            // Empate
            case "11":
                vm.estado.razon = "Ambos sacáron Piedra.";
                vm.estado.resultado = "¡EMPATE!";
                vm.estado.iconoJ1 = vm.estrategias[0].icono;
                vm.estado.iconoJ2 = vm.estrategias[0].icono;
                break;
            case "22":
                vm.estado.razon = "Ambos sacáron Papel";
                vm.estado.resultado = "¡EMPATE!";
                vm.estado.iconoJ1 = vm.estrategias[1].icono;
                vm.estado.iconoJ2 = vm.estrategias[1].icono;
                break;
            case "33":
                vm.estado.razon = "Ambos sacáron Tijera";
                vm.estado.resultado = "¡EMPATE!";
                vm.estado.iconoJ1 = vm.estrategias[2].icono;
                vm.estado.iconoJ2 = vm.estrategias[2].icono;
                break;
            case "44":
                vm.estado.razon = "Ambos sacáron Lagarto";
                vm.estado.resultado = "¡EMPATE!";
                vm.estado.iconoJ1 = vm.estrategias[3].icono;
                vm.estado.iconoJ2 = vm.estrategias[3].icono;
                break;
            case "55":
                vm.estado.razon = "Ambos sacáron Spock";
                vm.estado.resultado = "¡EMPATE!";
                vm.estado.iconoJ1 = vm.estrategias[4].icono;
                vm.estado.iconoJ2 = vm.estrategias[4].icono;
                break;
            // Default
            default:
                vm.estado.resultado = "¡PERDEDOR!";
        }

        vm.hit.dano = Math.ceil(Math.random() * (25 - 7) + 7);

        if (vm.hit.dano >= 20) {
            vm.hit.valor = "Critico!!"
        }

        switch (vm.estado.resultado) {
            case "¡GANADOR!":
                vm.jugadores[1].vida = vm.jugadores[1].vida - vm.hit.dano;
                vm.hit.objetivo = vm.jugadores[1].nombre;
                break;
            case "¡PERDEDOR!":
                vm.jugadores[0].vida = vm.jugadores[0].vida - vm.hit.dano;
                vm.hit.objetivo = vm.jugadores[0].nombre;
                break;
        }
        
        if (vm.jugadores[0].vida == 0 || vm.jugadores[1].vida == 0)
        {
            console.log("Fin del juego");
        }
    }

    // Funcion de carga
    vm.cargandoJuego = function () {
        vm.cargando = 100;
        // Altera el estado de la barra
        /*$interval(function () {
            // Agrega un numero aleatorio a la barra de progreso
            vm.cargando = Math.ceil(
                Math.random() * (100 - vm.cargando) + vm.cargando
            );
        }, 2000);*/
    };

    vm.init();
});
