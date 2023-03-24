using Microsoft.AspNetCore.Mvc;

namespace NorthwindTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        // Asignacion variable contexto
        private readonly NorthwindContext _context;

        // Asignacion variable contexto publica
        public ProductsController(NorthwindContext context)
        {
            _context = context;
        }

        // Metodo GET
        /// <summary>
        /// Obtiene los datos de todos los prodúctos...
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public dynamic GetProducts(int? pg=null)
        {
            // Valida si la peticion es correcta
            if (_context.Products == null)
            {
                return BadRequest();
            }

            if (pg != null)
            {
                var ret = _context.Products
                    .Include(e => e.Category)
                    .Skip(pg.Value * 10)
                    .Take(10);

                return new { count = _context.Products.Count(), data = ret };
            }

            // Resultado
            return _context.Products
                .Include(e => e.Category);
        }

        // Metodo GET por Id
        /// <summary>
        /// Obtiene los datos de un prodúcto obtenido por su ID...
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            // Valida si la peticion es correcta
            if (_context.Products == null)
            {
                return BadRequest();
            }

            // Crea variable resultado
            var product = await _context.Products
                .Include(e => e.Category)
                .Include(e => e.Supplier)
                .FirstOrDefaultAsync(e => e.ProductId == id);

            // Valida si el dato existe
            if (product == null)
            {
                return NotFound("El dato que ingresaste NO existe...");
            }

            // Resultado
            return product;
        }

        // Metodo POST
        /// <summary>
        /// Agrega un prodúcto...
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        /// <remarks>
        /// Sample Request: 
        /// 
        ///     {
        ///         "productId": 0,
        ///         "productName": "Gaseosa Uva",
        ///         "supplierId": 33,
        ///         "categoryId": 1,
        ///         "quantityPerUnit": "1 - 2.5lts",
        ///         "unitPrice": 1.5,
        ///         "unitsInStock": 5,
        ///         "unitsOnOrder": 0,
        ///         "reorderLevel": 2,
        ///         "discontinued": false
        ///     }
        /// </remarks>
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            // Agrega el dato
            _context.Products
                .Add(product);

            // Guarda los cambios
            await _context
                .SaveChangesAsync();

            // Muestra los datos del nuevo registro
            return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, product);
        }

        // Metodo PUT
        /// <summary>
        /// Edita los datos de un prodúcto obtenido por su ID...
        /// </summary>
        /// <param name="id"></param>
        /// <param name="product"></param>
        /// <returns></returns>
        /// <remarks>
        /// Sample Request: 
        /// 
        ///     {
        ///         "productId": 0,
        ///         "productName": "Gaseosa Uva",
        ///         "supplierId": 33,
        ///         "categoryId": 1,
        ///         "quantityPerUnit": "1 - 1.5lts",
        ///         "unitPrice": 0.8,
        ///         "unitsInStock": 5,
        ///         "unitsOnOrder": 0,
        ///         "reorderLevel": 3,
        ///         "discontinued": false
        ///     }
        /// </remarks>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            // Valida si la peticion es correcta
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            // Peticion de dato a modificar
            _context.Entry(product).State = EntityState.Modified;

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
                if (!ProductExist(id))
                {
                    return NotFound("El dato que ingresaste NO existe...");
                }
                // Salida del programa
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // Metodo DELETE
        /// <summary>
        /// Elimina un prodúcto obtenido por su ID...
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            // Valida si la peticion es correcta
            if (_context.Products == null)
            {
                return NoContent();
            }

            // Crea variable resultado
            var product = await _context.Products
                .FindAsync(id);

            // Valida si el dato existe
            if (product == null)
            {
                return NotFound("El dato que ingresaste NO existe...");
            }

            // Elimina el producto
            _context.Products
                .Remove(product);

            // Guarda los cambios
            await _context
                .SaveChangesAsync();

            // Resultado
            return NoContent();
        }

        // Funcion PUT si ID existet
        private bool ProductExist(int id)
        {
            // Valida los datos
            return (_context.Products?
                .Any(e => e.ProductId == id))
                .GetValueOrDefault();
        }
    }
}
