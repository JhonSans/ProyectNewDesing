app.controller("miSegundoJuego", function () {
  var vm = this;
  vm.isCollapsed = false;
  //Validaciones - Mensajes de error
  vm.validacion = {
    digito: "",
    numero: 0,
    errorLetra: "Ingresaste valores invalidos o se encuentra vacío...",
    errorMinimo: "Debes agregar al menos 5 elementos...",
    errorNumero: "Ya haz agregado este número...",
  };

  ///////////////////////////////Solucion 1///////////////////////////////

  //Objeto Mini-Max
  vm.minMax = { numero: "", error: "", sumTotal: 0, sumMin: 0, sumMax: 0 };

  //Conjunto de numeros/respuesta
  vm.conjuntos = { total: [], minimo: [], sumas: [] };
  vm.respuesta = [];

  //Funcion Agregar
  vm.agregarNum = function () {
    //Valida si se agrega una letra
    if (vm.minMax.numero) {
      //Remplaza la cadena a solo numeros
      vm.validacion.digito = vm.minMax.numero.replace(/[^0-9]/g, "");

      //Si es verdadero mensaje error, si no continua
      if (vm.validacion.digito !== vm.minMax.numero) {
        vm.minMax.error = "Debes agregar un número valido...";
      } else {
        //Limpia error
        vm.minMax.error = "";

        //Valida si el número ya se ha agregado
        if (vm.conjuntos.total.indexOf(vm.minMax.numero) == -1) {
          //Agrega numero digitado al conjunto
          vm.conjuntos.total.push(vm.minMax.numero);

          //Limpia contenido
          vm.limpiarResultado();
        } else {
          //Muestra el mensaje de error
          vm.minMax.error = "Ya haz agregado éste número...";
        }
      }
    }
  };

  //Funcion Quitar
  vm.quitarNum = function (x) {
    //Elimina de la lista
    vm.conjuntos.total.splice(x, 1);

    //Limpia contenido
    vm.limpiarResultado();
  };

  //Funcion Suma
  vm.sumaMinMax = function () {
    vm.minMax.error = "";

    //Limpia resultado
    vm.respuesta = [];

    //Valida si la lista contiene al menos 5 elementos
    if (vm.conjuntos.total.length < 5) {
      vm.minMax.error = "Debes agregar al menos 5 números...";
    } else {
      //Toma los datos del conjunto de numeros
      for (let x = 0; x < vm.conjuntos.total.length; x++) {
        //Limpia la suma total
        vm.minMax.sumTotal = 0;

        //Filtra el conjunto total y agrega los valores al conjunto minimo
        vm.conjuntos.minimo = vm.conjuntos.total.filter(function (y) {
          return y !== vm.conjuntos.total[x];
        });

        //Suma el total de los numeros del conjunto minimo
        for (let o = 0; o < vm.conjuntos.minimo.length; o++) {
          vm.validacion.numero = parseInt(vm.conjuntos.minimo[o]);
          vm.minMax.sumTotal += vm.validacion.numero;
        }

        //Agrega los resultados de las sumas al conjunto
        vm.conjuntos.sumas.push(vm.minMax.sumTotal);

        vm.respuesta.push({
          numeros: vm.conjuntos.total[x],
          conjunto: vm.conjuntos.minimo,
          resultado: vm.minMax.sumTotal,
        });
      }

      //Obtiene valor minimo
      vm.minMax.sumMin = Math.min(...vm.conjuntos.sumas);

      //Obtiene valor maximo
      vm.minMax.sumMax = Math.max(...vm.conjuntos.sumas);
    }
  };

  //Funcion Limpiar
  vm.limpiarResultado = function () {
    //Limpia error
    vm.minMax.error = "";
    //Limpia la suma total
    vm.minMax.sumTotal = 0;
    //Limpia resultado
    vm.respuesta = [];
    vm.conjuntos.sumas = [];
    //Limpia min
    vm.minMax.sumMin = 0;
    //Limpia max
    vm.minMax.sumMax = 0;
    //Limpia las validaciones
    vm.validacion.digito = "";
    vm.validacion.numero = 0;
  };

  ///////////////////////////////Solucion 2///////////////////////////////

  //Objeto cantidad
  vm.cantidad = {
    numero: "",
    inputs: [],
    totalSum: 0,
    minSum: 0,
    maxSum: 0,
    error: "",
  };

  //Conjunto de numeros
  vm.lista = { numeros: [], reducida: [], sumas: [] };
  vm.resultado = [];

  //Funcion agregar inputs
  vm.agregarInput = function () {
    //Limpia resultados
    vm.limpiarPantalla();

    //Valida si es una letra
    if (vm.cantidad.numero) {
      //Reemplaza la cadena a solo numeros
      vm.validacion.digito = vm.cantidad.numero.replace(/[^0-9]/g, "");

      //Si es verdadero mensaje error, si no continua
      if (vm.validacion.digito !== vm.cantidad.numero) {
        vm.cantidad.error = "Ingresaste valores invalidos...";
      } else {
        //Verifica si el numero de inputs es de al menos 5
        for (let i = 0; i < vm.cantidad.numero; i++) {
          if (vm.cantidad.numero < 5) {
            vm.cantidad.error = "Debes agregar al menos 5 campos...";
          } else {
            //Agrega espacios vacios a el conjunto
            vm.cantidad.inputs.push(i + 1);
          }
        }
      }
    }
  };

  //Funcion agregar numeros
  vm.sumarInputs = function () {
    vm.cantidad.error = "";

    //Limpia resultado
    vm.resultado = [];
    //Limpia conjunto suma
    vm.lista.sumas = [];
    //Limpia sumas
    vm.cantidad.minSum = 0;
    vm.cantidad.maxSum = 0;

    if (vm.cantidad.inputs == "") {
      vm.cantidad.error = "Debes agregar al menos 5 campos...";
    } else {
      if (vm.lista.numeros.length < vm.cantidad.inputs.length) {
        vm.cantidad.error = "Debes llenar todos los campos...";
      } else {
        //Toma los datos del conjunto numeros
        for (let i = 0; i < vm.lista.numeros.length; i++) {
          if (vm.lista.numeros[i]) {
            //Remplaza la cadena a solo numeros
            vm.validacion.digito = vm.lista.numeros[i].replace(/[^0-9]/g, "");

            if (vm.validacion.digito !== vm.lista.numeros[i]) {
              vm.cantidad.error = "Ingresaste valores invalidos...";

              //Limpia resultado
              vm.resultado = [];
              //Limpia conjunto suma
              vm.lista.sumas = [];

              break;
            } else {
              //Limpia el total de la suma
              vm.cantidad.totalSum = 0;

              //Filtra el conjunto total y agrega los valores al conjunto minimo
              vm.lista.reducida = vm.lista.numeros.filter(function (y) {
                return y !== vm.lista.numeros[i];
              });

              //Suma el total de los numeros del conjunto minimo
              for (let x = 0; x < vm.lista.reducida.length; x++) {
                vm.validacion.numero = parseInt(vm.lista.reducida[x]);
                vm.cantidad.totalSum += vm.validacion.numero;
              }

              //Agrega los valores al resultado
              vm.resultado.push({
                numeros: vm.lista.numeros[i],
                conjunto: vm.lista.reducida,
                total: vm.cantidad.totalSum,
              });

              //Agrega los resultados de las sumas al conjunto
              vm.lista.sumas.push(vm.cantidad.totalSum);
            }
          }
        }
        //Obtiene valor minimo
        vm.cantidad.minSum = Math.min(...vm.lista.sumas);

        //Obtiene valor maximo
        vm.cantidad.maxSum = Math.max(...vm.lista.sumas);
      }
    }
  };

  //Funcion limpiar resultado
  vm.limpiarPantalla = function () {
    //Limpiar resultado
    vm.resultado = [];
    //Limpia conjunto suma
    vm.lista.sumas = [];
    //Limpia inputs
    vm.cantidad.inputs = [];
    //Limpia numeros
    vm.lista.numeros = [];
    //Limpia suma maxima
    vm.cantidad.maxSum = 0;
    //Limpia suma minima
    vm.cantidad.minSum = 0;
    //Limpia mensaje de error
    vm.cantidad.error = "";
    //Limpia las validaciones
    vm.validacion.digito = "";
    vm.validacion.numero = 0;
  };

  ///////////////////////////////Solucion 2.1//////////////////////////////

  //Objetos
  vm.principal = {
    campos: "",
    error: "",
    numero: 0,
    indice: 0,
    listaNumeros: [],
    listaReducida: [],
    listaSumas: [],
    listaFinal: [],
    sumaTotal: 0,
    sumaReducida: 0,
    sumaMinima: 0,
    sumaMaxima: 0,
  };
  vm.inputs = [];

  //Funcion agregar inputs
  vm.agregarCampos = function () {
    //Limpia conjunto inputs
    vm.inputs = [];
    //Limpia mensaje de error
    vm.principal.error = "";
    //Limpia lista de numeros
    vm.principal.listaNumeros = [];
    vm.principal.listaFinal = [];
    vm.principal.listaSumas = [];
    //Limpia las sumas
    vm.principal.sumaMaxima = 0;
    vm.principal.sumaMinima = 0;
    vm.principal.sumaTotal = 0;

    //Valida si se ha escrito en el campo
    if (vm.principal.campos) {
      //Convierte el texto a solo digitos
      vm.validacion.digito = vm.principal.campos.replace(/[^0-9]/g, "");

      //Valida si lo escrito es letra
      if (vm.validacion.digito !== vm.principal.campos) {
        //Mensaje de error
        vm.principal.error = vm.validacion.errorLetra;
      } else {
        //Transforma el numero escrito en longitud de numeros
        for (let i = 0; i < vm.principal.campos; i++) {
          //Si la longitus es menor a 5 = error
          if (vm.principal.campos < 5) {
            //Mensaje de error
            vm.principal.error = vm.validacion.errorMinimo;
          } else {
            //Inserta la cantidad de inputs dada de la longitud
            vm.inputs.push({ id: i, numero: "" });
          }
        }
      }
    }
  };

  //Funcion validar numeros existentes
  vm.validarNumero = function (indice, contenido) {
    vm.principal.numero = contenido.numero;
    vm.principal.indice = indice;

    //Limpia mensaje de error
    vm.principal.error = "";
    //Limpia conjunto
    vm.principal.listaSumas = [];
    vm.principal.listaFinal = [];

    //Convierte el texto a solo digitos
    vm.validacion.digito = contenido.numero.replace(/[^0-9]/g, "");

    //Valida si lo escrito es letra
    if (vm.validacion.digito !== contenido.numero) {
      //Mensaje de error
      vm.principal.error = vm.validacion.errorLetra;
    } else {
      //Valida si el numero ya existe
      if (
        vm.principal.listaNumeros.indexOf(parseInt(vm.principal.numero)) !== -1
      ) {
        //Mensaje de error
        vm.principal.error = vm.validacion.errorNumero;
      } else {
        //Valida los espacios en blanco
        if (vm.principal.numero === "") {
          //Deja la variable vacia
          vm.principal.listaNumeros.splice(vm.principal.indice, 1, 0);
          //Mensaje de error
          vm.principal.error = vm.validacion.errorLetra;

          //Acciona funcion suma
          vm.resultadoSumas();
        } else {
          //Si todo es correcto agrega el numero a la lista
          vm.principal.listaNumeros.splice(
            vm.principal.indice,
            1,
            parseInt(vm.principal.numero)
          );

          //Acciona funcion suma
          vm.resultadoSumas();
        }
      }
    }
  };

  //Funcion sumar total de la lista
  vm.resultadoSumas = function () {
    //funcion sumar actual al total
    vm.validacion.numero = (total, actual) => total + actual;

    //Acciona la funcion de suma
    vm.principal.sumaTotal = vm.principal.listaNumeros.reduce(
      vm.validacion.numero
    );

    //Toma los datos de la lista de numeros
    for (let i = 0; i < vm.principal.listaNumeros.length; i++) {
      //Limpia la variable numero
      vm.validacion.numero = 0;

      //Filtra el conjunto total y agrega los valores al conjunto minimo
      vm.principal.listaReducida = vm.principal.listaNumeros.filter(function (
        y
      ) {
        return y !== vm.principal.listaNumeros[i];
      });

      //Suma el total de los numeros del conjunto minimo
      for (let x = 0; x < vm.principal.listaReducida.length; x++) {
        //funcion sumar actual al total
        vm.validacion.numero = (totalReducido, actualReducido) =>
          totalReducido + actualReducido;

        //Acciona la funcion de suma
        vm.principal.sumaReducida = vm.principal.listaReducida.reduce(
          vm.validacion.numero
        );
      }

      //Agrega los valores al resultado
      vm.principal.listaFinal.push({
        numero: vm.principal.listaNumeros[i],
        lista: vm.principal.listaReducida,
        suma: vm.principal.sumaReducida,
      });

      //Agrega las sumas al conjunto
      vm.principal.listaSumas.push(vm.principal.sumaReducida);
    }
    //Obtiene valor minimo
    vm.principal.sumaMinima = Math.min(...vm.principal.listaSumas);

    //Obtiene valor maximo
    vm.principal.sumaMaxima = Math.max(...vm.principal.listaSumas);
  };

  ///////////////////////////////Alertas///////////////////////////////

  //Funcion cerrar alertas
  vm.cerrarAlerta = function () {
    vm.minMax.error = "";
    vm.cantidad.error = "";
    vm.principal.error = "";
  };
});
