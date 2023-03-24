using Microsoft.AspNetCore.Mvc;

namespace NorthwindTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegionController : ControllerBase
    {
        // Asignacion variable contexto
        private readonly NorthwindContext _context;

        // Asignacion variable contexto publica
        public RegionController(NorthwindContext context)
        {
            _context = context;
        }

        // Metodo GET
        /// <summary>
        /// Obtiene los datos de todas las regiones...
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Region>>> GetRegions()
        {
            // Valida si la peticion es correcta
            if (_context.Regions == null)
            {
                return BadRequest();
            }

            //return await _context.Regions.ToListAsync();

            // Resultado
            return await _context.Regions
                .Include(e => e.Territories)
                .ToListAsync();
        }

        // Metodo GET por ID
        /// <summary>
        /// Obtiene los datos detallados de una region obtenida por su ID...
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Region>>> GetRegion(int id)
        {
            // Valida si la peticion es correcta
            if (_context.Regions == null)
            {
                return BadRequest();
            }

            //var region = await _context.Regions.FindAsync(id);

            // Crea variable resultado
            var region = await _context.Regions
                .Where(e => e.RegionId == id)
                .Include(e => e.Territories)
                .ToListAsync();

            // Valida si el dato existe
            if (region == null)
            {
                return NotFound("El dato que ingresaste NO existe...");
            }

            //Resultado
            return region;
        }

        // Metodo GET Territorio
        /// <summary>
        /// Obtiene los datos de un territorio obtenido por su ID...
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("Territory/{id}")]
        public async Task<ActionResult<Territory>> GetTerritory(string id)
        {
            // Valida si la peticion es correcta
            if (_context.Territories == null)
            {
                return BadRequest();
            }

            //var territory = await _context.Territories.FindAsync(id);

            // Crea variable resultado
            var territory = await _context.Territories
                .FindAsync(id);

            // Valida si el dato existe
            if (territory == null)
            {
                return NotFound("El dato que ingresaste NO existe...");
            }

            //Resultado
            return territory;
        }
    }
}
