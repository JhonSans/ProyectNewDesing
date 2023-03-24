using Microsoft.AspNetCore.Mvc;

namespace NorthwindTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        // Asignacion variable contexto
        private readonly NorthwindContext _context;

        // Asignacion variable contexto publica
        public CategoriesController(NorthwindContext context)
        {
            _context = context;
        }

        // Metodo GET
        /// <summary>
        /// Obtiene los datos de todas las categorías...
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            // Valida si la peticion es correcta
            if (_context.Categories == null)
            {
                return BadRequest();
            }

            // Resultado
            return await _context.Categories
                .Include(e => e.Products)
                .ToListAsync();
        }

        // Metodo GET por id
        /// <summary>
        /// Obtiene una categoría junto a todos sus prodúctos por su ID...
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategoryProduct(int id)
        {
            // Valida si la peticion es correcta
            if (_context.Categories == null)
            {
                return BadRequest();
            }

            // Crea variable resultado
            var category = await _context.Categories
                .Include(e => e.Products)
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.CategoryId == id);

            // Valida si el dato existe
            if (category == null)
            {
                return NotFound("El dato que ingresaste NO existe...");
            }

            // Resultado
            return category;
        }
    }
}
