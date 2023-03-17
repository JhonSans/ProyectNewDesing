app.controller("clientesController", function ($http, NorthClientes, toastr, $location, settings) {
    var vm = this;

    // Var id cliente
    vm.idCliente = "";
    // Objeto clientes
    vm.clientes = null;
    //Objeto clientes copia
    vm.clientesCopia = null;
    // Objeto paginador
    vm.paginador = {
        totalItems: 0,
        totalItemsCopia: 0,
        paginaActual: 0,
        itemsPagina: 10,
        tamanoMax: 5
    }
    // Funcion inicial
    vm.init = function () {
        // Obtiene todos los clientes
        NorthClientes.get({ pg : vm.paginador.paginaActual }, function (respuesta) {
            // Agrega la informacion de los clientes al objeto
            vm.clientes = respuesta.data;
            // Realiza la copia de la lista de clientes
            vm.clientesCopia = vm.clientes;
            // Obtiene el total de los clientes
            vm.paginador.totalItems = respuesta.count;
            // Realiza una copia del total de clientes
            vm.paginador.totalItemsCopia = vm.paginador.totalItems;
        });
    }
    // Funcion cambiar de pagina
    vm.cambiarPagina = function () {
        // Obtiene todos los clientes de la siguiente pagina
        NorthClientes.get({ pg : vm.paginador.paginaActual - 1 }, function (respuesta) {
            // Agrega la informacion de los clientes al objeto
            vm.clientes = respuesta.data;
        });
    }
    // Funcion buscar cliente por ID, Nombre o Empresa
    vm.buscarCliente = function (key) {
        // Valida si el campo esta vacío o se borra contenido
        if (!vm.idCliente || key.keyCode == "8" || key.keyCode == "46") {
            // Actualiza el listado de clientes
            vm.clientes = vm.clientesCopia
            // Actualiza el total de clientes
            vm.paginador.totalItems = vm.paginador.totalItemsCopia;
            return;
        }
        // Obtiene al cliente obtenido por su ID, Nombre o Empresa
        NorthClientes.get({ customerId : vm.idCliente }, function (respuesta) {
            // Valida si la respuesta fue correcta
            if (respuesta.customerId) {
                // Actualiza el listado
                vm.clientes = [respuesta];
                // Actualiza el total de clientes en el nuevo listado
                vm.paginador.totalItems = vm.clientes.lenght;
            }
            else {
                // Mensaje de error si no encuentra ningun dato
                toastr.error("El dato ingresado es incorrecto", "Cliente");
            }
        });
    }
    // Funcion eliminar
    vm.eliminar = function (id) {
        bootbox.confirm({
            title: "Eliminar",
            message: "Desea eliminar a el cliente " + id + "?",
            buttons: {
                cancel: { label: '<i class="fa fa-times"></i> Cancelar' },
                confirm: { label: '<i class="fa fa-check"></i> Confirmar'}
            },
            callback: function (result) {
                console.log(result);
            }
        });
    }
    // Ejecuta la funcion inicial
    vm.init();
});