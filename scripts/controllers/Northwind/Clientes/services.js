app.factory("NorthClientes", function (settings, $resource) {
    var urlServicio = settings.baseUrl;

    return $resource( urlServicio + "api/Customers/:customerId", { customerId : "@customerId" }, {
        getEmpleados: { method: "GET", url: urlServicio + "api/Employees", isArray: true },
        getExpedidores: { method: "GET", url: urlServicio + "api/Shippers", isArray: true },
        getProductos: { method: "GET", url: urlServicio + "api/Products", isArray: true }
    });
});