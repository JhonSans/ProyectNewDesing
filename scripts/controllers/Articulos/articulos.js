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
    },
    {
      img: "/content/pictures/Northwind/Clientes/clientes.jpg",
      titulo: "Clientes - Northwind",
      cont: "Listado de clientes registrados en la base de datos de Northwind",
      url: "/Northwind/Clientes",
    },
    {
      img: "/content/pictures/Northwind/Proveedores/proveedores.jpg",
      titulo: "Proveedores - Northwind",
      cont: "Listado de proveedores registrados en la base de datos de Northwind",
      url: "/Northwind/Proveedores",
    },
    {
      img: "/content/pictures/Northwind/Productos/productos.jpg",
      titulo: "Productos - Northwind",
      cont: "Listado de productos registrados en la base de datos de Northwind",
      url: "/Northwind/Productos",
    },
    {
      img: "/content/pictures/Northwind/Ordenes/ordenes.jpg",
      titulo: "Ordenes - Northwind",
      cont: "Listado de ordenes registradas en la base de datos de Northwind",
      url: "/Northwind/Ordenes",
    }
  ];
});
