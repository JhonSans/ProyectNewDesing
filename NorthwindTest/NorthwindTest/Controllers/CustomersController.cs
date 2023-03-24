using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace NorthwindTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        // Asignacion variable contexto
        private readonly NorthwindContext _context;

        // Asignacion variable contexto publica
        public CustomersController(NorthwindContext context)
        {
            _context = context;
        }

        // Metodo GET
        /// <summary>
        /// Obtiene los datos de todos los clientes...
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public dynamic GetCustomers(int? pg=null)
        {
            // Valida si la peticion es correcta
            if (_context.Customers == null)
            {
                return NotFound("El dato que ingresaste NO existe...");
            }

            if (pg != null) 
            {
                var ret = _context.Customers
                //.Include(e => e.Orders)
                //.ThenInclude(e => e.OrderDetails)
                .Skip(pg.Value * 10)
                .Take(10);
                //.ToArray();
                //.ToListAsync();

                return new { count = _context.Customers.Count(), data = ret };
            }

            // Resultado
            return _context.Customers;
                //.Include(e => e.Orders)
                //.ThenInclude(e => e.OrderDetails)
                //.ToArray();
                //.ToListAsync();
        }

        // Metodo GET por ID
        /// <summary>
        /// Obtiene los datos de un cliente obtenido por su ID...
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(string id)
        {
            // Crea variable resultado
            var customer = await _context.Customers
                .Include( e => e.Orders)
                .ThenInclude( e => e.OrderDetails)
                .FirstOrDefaultAsync(e => e.CustomerId == id || e.CompanyName == id || e.ContactName == id);

            // Resultado
            return customer;
        }

        // Metodo POST
        /// <summary>
        /// Agrega un nuevo cliente...
        /// </summary>
        /// <param name="customer"></param>
        /// <returns></returns>
        /// <remarks>
        /// Sample Request:
        /// 
        ///     {
        ///         "customerId": "JSSC",
        ///         "companyName": "VPSsoftware",
        ///         "contactName": "Jhonatan Santanilla",
        ///         "contactTitle": "Desarrollador",
        ///         "address": "AKA 86",
        ///         "city": "Bogota",
        ///         "region": "Cundinamarca",
        ///         "postalCode": "111051",
        ///         "country": "Colombia",
        ///         "phone": "(57) 3214380775",
        ///         "fax": "785"
        ///     }
        /// </remarks>
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            // Agrega el dato
            _context.Customers
                .Add(customer);

            // Guarda los cambios
            await _context
                .SaveChangesAsync();

            // Muestra los datos del nuevo registro
            return CreatedAtAction(nameof(GetCustomer), new { id = customer.CustomerId }, customer);
        }

        // Metodo PUT 
        /// <summary>
        /// Edita los datos de un cliente obtenido por su ID...
        /// </summary>
        /// <param name="id"></param>
        /// <param name="customer"></param>
        /// <returns></returns>
        /// /// <remarks>
        /// Sample Request:
        /// 
        ///     {
        ///         "customerId": "JSSC",
        ///         "companyName": "VPSsoftware",
        ///         "contactName": "Jhonatan",
        ///         "contactTitle": "Desarrollador",
        ///         "address": "AKA 86",
        ///         "city": "Bogota",
        ///         "region": "Cundinamarca",
        ///         "postalCode": "11151",
        ///         "country": "Colombia",
        ///         "phone": "(57) 3214380775",
        ///         "fax": "895"
        ///     }
        /// </remarks>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(string id, Customer customer)
        {
            // Valida si el dato existe
            if (id != customer.CustomerId)
            {
                return NotFound("El dato que ingresaste NO existe...");
            }

            // Trae la informacion de la orden de la DB
            var customerDb = await _context.Customers
                .Where(e => e.CustomerId == id)
                .FirstOrDefaultAsync();

            if (customerDb == null)
            {
                return NotFound();
            }

            customerDb.CompanyName = customer.CompanyName;
            customerDb.ContactName = customer.ContactName;
            customerDb.ContactTitle = customer.ContactTitle;
            customerDb.Address = customer.Address;
            customerDb.City = customer.City;
            customerDb.Region = customer.Region;
            customerDb.PostalCode = customer.PostalCode;
            customerDb.Country = customer.Country;
            customerDb.Fax = customer.Fax;

            // Toma de errores
            try
            {
                // Guarda los cambios
                await _context
                    .SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Valida si el dato existe
                if (!CustomerExist(id))
                {
                    return NotFound("El dato que ingresaste NO existe...");
                }
                // Salida del programa
                else
                {
                    throw;
                }
            }

            // Resultado
            return NoContent();
        }

        // Metodo DELETE
        /// <summary>
        /// Elimina a un cliente obtenido por su ID...
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(string id)
        {
            // Valida si la peticion es correcta
            if (_context.Customers == null)
            {
                return BadRequest();
            }

            // Crea varible resultado
            var customer = _context.Customers
                .Where(e => e.CustomerId == id)
                .Include(e => e.Orders)
                .ThenInclude(e => e.OrderDetails)
                .First();

            // Valida si el dato existe
            if (customer == null)
            {
                return NotFound("El dato que ingresaste NO existe...");
            }

            // Elimina relaciones
            customer.Orders.Clear();

            // Peticion de dato a eliminar
            _context.Customers
                .Remove(customer);

            // Guarda los cambios
            await _context
                .SaveChangesAsync();

            // Resultado
            return NoContent();
        }

        // Funcion PUT si ID existe
        private bool CustomerExist(string id)
        {
            // Valida los datos
            return (_context.Customers?.Any(e => e.CustomerId == id))
                .GetValueOrDefault();
        }
    }
}