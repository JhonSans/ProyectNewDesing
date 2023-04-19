app.factory("NorthProductos", function (settings, $resource) {
    var urlServicio = settings.baseUrl;

    return $resource(urlServicio + "api/Products/:productId", { productId: "@productId" }, {
        
    });
});