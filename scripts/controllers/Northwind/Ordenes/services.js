app.factory("NorthOrdenes", function (settings, $resource) {
    var urlServicio = settings.baseUrl;

    return $resource(urlServicio + "api/Orders/:orderId", { orderId: "@orderId" });
});