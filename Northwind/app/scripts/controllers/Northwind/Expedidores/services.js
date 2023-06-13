app.factory("NorthExpedidores", function (settings, $resource) {
    var urlServicio = settings.baseUrl;

    return $resource(urlServicio + "api/Shippers/:shipperId", { shipperId: "@shipperId" });
});