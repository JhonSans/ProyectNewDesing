app.controller("sumaController", function (toastr) {
    var vm = this;

    // Var callapse
    vm.isCollapse = false;
    // Var campos
    vm.campos = "";
    // Var digito
    vm.digito = "";
    // Objeto suma
    vm.suma = { total: "", min: "", max: "", reducida: "" }
    // Array inputs
    vm.inputs = [];
    // Array numeros
    vm.listaNumeros = [];
    // Array numeros reducidos
    vm.listaReducida = [];
    // Array resultado
    vm.listaFinal = [];
    // Array sumas
    vm.listaSumas = [];

    // Funcion agregar inputs
    vm.agregarCampos = function () {
        // Limpia el array
        vm.inputs = [];
        // Limpia listado final
        vm.listaFinal = [];
        // Limpia lista de sumas
        vm.listaSumas = [];
        // Limpia la lista de numeros
        vm.listaNumeros = [];
        // Limpia las sumas
        vm.suma = { total: "", min: "", max: "", reducida: "" }
        // Agrega el valor del campo sin numeros al digito
        vm.digito = vm.campos.replace(/[^0-9]/g, "");
        // Valida si el campo contiene letras
        if (vm.digito !== vm.campos) {
            toastr.warning("Debe digitar un número", "Campos");
            return;
        }
        // Valida que el campo sea mayor a 5
        if (vm.campos < 5 && vm.campos) {
            toastr.warning("El número debe ser mayor a 5", "Campos");
            return;
        }
        // Recorre el campo y agrega la cantidad de inputs
        for (let c = 0; c < vm.campos; c++) {
            vm.inputs.push({ id: c, numero: "" });
        }
    }
    // Funcion agregar numero
    vm.agregarNumero = function (indice, numero) {
        // Limpia listado de numeros
        vm.listaFinal = [];
        // Limpia lista de sumas
        vm.listaSumas = [];
        // Agrega el valor del campo sin numeros al digito
        vm.digito = numero.replace(/[^0-9]/g, "");
        // Valida si el campo contiene letras, el numero ya existe o es nulo
        if (vm.digito !== numero || !numero || vm.listaNumeros.indexOf(parseInt(numero)) !== -1) {
            toastr.warning(!numero ? "El campo no debe estar vacío" : (vm.digito !== numero ? "Debe digitar un número" : "El número ya existe"));
            //Elimina el numero
            vm.listaNumeros.splice(indice, 1, 0);
            // Suma la lista de numeros
            vm.sumarNumeros();
            return;
        }
        // Agrega el numero a la lista
        vm.listaNumeros.splice(indice, 1, parseInt(numero));
        // Suma la lista de numeros
        vm.sumarNumeros();
    }
    // Funcion sumar
    vm.sumarNumeros = function () {
        // Funcion sumar actual al total
        var numero = (total, actual) => total + actual;
        // Suma la lista de numeros
        vm.suma.total = vm.listaNumeros.reduce(numero);
        // Recorre la lista de numeros
        _.each(vm.listaNumeros, function (n) {
            // Filtra el conjunto total
            vm.listaReducida = vm.listaNumeros.filter(function (l) { return l !== n; });
            // Recorre la lista reducida
            _.each(vm.listaReducida, function () {
                // Funcion sumar actual al total
                var numero = (total, actual) => total + actual;
                // Suma la lista de numeros
                vm.suma.reducida = vm.listaReducida.reduce(numero);
            });
            // Agrega el resultado a la lista
            vm.listaFinal.push({ numero: n, lista: vm.listaReducida, suma: vm.suma.reducida });
            // Agrega las sumas a la lista
            vm.listaSumas.push(vm.suma.reducida);
        });
        // Obtiene el valor minimo
        vm.suma.min = Math.min(...vm.listaSumas);
        // Obtiene el valor maximo
        vm.suma.max = Math.max(...vm.listaSumas);
    }
});