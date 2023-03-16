app.factory("NorthClientes", function ($resources) {
    return $resources("https://localhost:7247/api/Customers?pg=",
        
    )
});