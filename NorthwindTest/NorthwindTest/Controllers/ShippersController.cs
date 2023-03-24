using Microsoft.AspNetCore.Mvc;

namespace NorthwindTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShippersController : ControllerBase
    {
        // Asignacion variable contexto
        private readonly NorthwindContext _context;

        // Asignacion variable contexto publica
        public ShippersController(NorthwindContext context)
        {
            _context = context;
        }

        // Metodo GET
        /// <summary>
        /// Obtiene los datos de todos los expedidores...
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shipper>>> GetShippers()
        {
            // Valida si la peticion es correcta
            if (_context.Shippers == null)
            {
                return BadRequest();
            }

            // Resultado
            return await _context.Shippers
                .ToListAsync();
        }

        // Metodo GET por Id
        /// <summary>
        /// Obtiene los datos de un expedidor obtenido por su ID...
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Shipper>> GetShipper(int id)
        {
            // Valida si la peticion es correcta
            if (_context.Shippers == null)
            {
                return BadRequest();
            }

            // Crea variable resultado
            var shipper = await _context.Shippers
                .FindAsync(id);

            // Valida si el dato existe
            if (shipper == null)
            {
                return NotFound("El dato que ingresaste NO existe...");
            }

            // Resultado
            return shipper;
        }
    }
}
