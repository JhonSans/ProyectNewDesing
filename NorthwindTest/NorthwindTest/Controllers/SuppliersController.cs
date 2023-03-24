using Microsoft.AspNetCore.Mvc;

namespace NorthwindTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliersController : ControllerBase
    {
        // Asignacion variable contexto
        private readonly NorthwindContext _context;

        // Asignacion variable contexto publica
        public SuppliersController(NorthwindContext context)
        {
            _context = context;
        }

        // Metodo GET
        /// <summary>
        /// Obtiene los datos de todos los proveedores...
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Supplier>>> GetSuppliers()
        {
            // Valida si la peticion es correcta
            if (_context.Suppliers == null)
            {
                return BadRequest();
            }

            // Resultado
            return await _context.Suppliers
                .Include(e => e.Products)
                .ToListAsync();
        }

        // Metodo GET por Id
        /// <summary>
        /// Obtiene los datos de un proveedor obtenido por su ID...
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Supplier>> GetSupplier(int id)
        {
            // Valida si la peticin es correcta
            if (_context.Suppliers == null)
            {
                return BadRequest();
            }

            // Crea variable resultado
            var supplier = await _context.Suppliers
                .Include(e => e.Products)
                .FirstOrDefaultAsync(e => e.SupplierId == id);

            // Valida si el dato existe
            if (supplier == null)
            {
                return NotFound("El dato que ingresaste NO existe...");
            }

            // Resultado
            return supplier;
        }

        // Metodo POST
        /// <summary>
        /// Agrega un Proveedores...
        /// </summary>
        /// <param name="supplier"></param>
        /// <returns></returns>
        /// <remarks>
        /// Sample Request:
        /// 
        ///     {
        ///         "supplierId": 0,
        ///         "companyName": "Postobon",
        ///         "contactName": "Carlos Mondragon",
        ///         "contactTitle": "Gerente",
        ///         "address": "Calle 80",
        ///         "city": "Bogota",
        ///         "region": "Cundinamarca",
        ///         "postalCode": "111051",
        ///         "country": "Colombia",
        ///         "phone": "259847",
        ///         "fax": "658",
        ///         "homePage": "postobon.com.co"
        ///     }
        /// </remarks>
        [HttpPost]
        public async Task<ActionResult<Supplier>> PostSupplier(Supplier supplier)
        {
            // Agrega el dato
            _context.Suppliers
                .Add(supplier);

            // Guarda los cambios
            await _context
                .SaveChangesAsync();

            // Muestra los datos del nuevo registro
            return CreatedAtAction(nameof(GetSupplier), new { id = supplier.SupplierId }, supplier);
        }

        // Metodo PUT
        /// <summary>
        /// Edita los datos de un proveedor obtenido por su ID...
        /// </summary>
        /// <param name="id"></param>
        /// <param name="supplier"></param>
        /// <returns></returns>
        /// <remarks>
        /// Sample Request:
        /// 
        ///     {
        ///         "supplierId": 0,
        ///         "companyName": "Postobon",
        ///         "contactName": "Daniel Agudelo",
        ///         "contactTitle": "Asesor Comercial",
        ///         "address": "Calle 80",
        ///         "city": "Bogota",
        ///         "region": "Cundinamarca",
        ///         "postalCode": "111051",
        ///         "country": "Colombia",
        ///         "phone": "(57) 3104587541",
        ///         "fax": "589",
        ///         "homePage": "postobon.com.co"
        ///     }
        /// </remarks>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupplier(int id, Supplier supplier)
        {
            // Valida si la peticion es correcta
            if (id != supplier.SupplierId)
            {
                return BadRequest();
            }

            // Peticion de dato a modificar
            _context.Entry(supplier).State = EntityState.Modified;

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
                if (!SupplierExist(id))
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
        /// Elimina un proveedor obtenido por si ID...
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
        {
            // Valida si la peticion es correcta
            if (_context.Suppliers == null)
            {
                return BadRequest();
            }

            // Crea variable resultado
            var supplier = await _context.Suppliers
                .FindAsync(id);

            // Valida si el dato existe
            if (supplier == null)
            {
                return NotFound("El dato que ingresaste NO existe...");
            }

            // Elimina el dato
            _context.Suppliers
                .Remove(supplier);

            // Guarda los cambios
            await _context
                .SaveChangesAsync();

            // Resuktado
            return NoContent();
        }

        // Funcion PUT su ID existe
        private bool SupplierExist(int id)
        {
            // Valida los datos
            return (_context.Suppliers?
                .Any(e => e.SupplierId == id))
                .GetValueOrDefault();
        }
    }
}