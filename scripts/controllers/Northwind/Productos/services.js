app.factory("NorthProductos", function (settings, $resource) {
    var urlServicio = settings.baseUrl;

    return $resource(urlServicio + "api/Products/:productId", { productId: "@productId" }, {
        getCategorias: { method: "GET", url: urlServicio + "api/Categories", isArray: true },
        crearProducto: { method: "POST", url: urlServicio + "api/Products" },
        modificarProducto: { method: "PUT", url: urlServicio + "api/Products/:productId", params: { productId : "@productId" } }
    });
});