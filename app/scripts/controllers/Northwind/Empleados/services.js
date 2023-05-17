app.factory("NorthEmpleados", function (settings, $resource) {
    var urlServicio = settings.baseUrl;

    return $resource(urlServicio + "api/Employees/:employeeId", { employeeId: "@employeeId" }, {

    });
});