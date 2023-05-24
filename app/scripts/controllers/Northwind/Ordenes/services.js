app.factory("NorthOrdenes", function (settings, $resource) {
    var urlServicio = settings.baseUrl;

    return $resource(urlServicio + "api/Orders/:orderId", { orderId: "@orderId" }, {
        crearOrden: { method: "POST", url: urlServicio + "api/Orders" },
        modificarOrden: { method: "PUT", url: urlServicio + "api/Orders/:orderId", params: { orderId : "@orderId" } }
    });
});