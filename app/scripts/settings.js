app.factory("settings", function () {
    // Base url para relizar las consultas en el back
    var url = "https://localhost:7247/";
    // Objeto propiedades
    var propierties = {
        baseUrl : url
    };
    // Retorna las propiedades
    return propierties;
});