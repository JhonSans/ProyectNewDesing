app.factory("NorthProveedores", function (settings, $resource) {
    var urlServicio = settings.baseUrl;

    return $resource(urlServicio + "api/Suppliers/:supplierId", { supplierId: "@supplierId" }, {
        
    });
});