app.factory("NorthClientes", function (settings, $resource) {
    var urlServicio = settings.baseUrl;

    return $resource( urlServicio + "api/Customers/:customerId", { customerId : "@customerId" });
});