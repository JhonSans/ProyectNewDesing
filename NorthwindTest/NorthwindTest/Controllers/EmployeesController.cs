using Microsoft.AspNetCore.Mvc;

namespace NorthwindTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        // Asignacion variable contexto
        private readonly NorthwindContext _context;

        // Asignacion variable contexto publica
        public EmployeesController(NorthwindContext context)
        {
            _context = context;
        }

        // Metodo GET
        /// <summary>
        /// Obtiene los datos de todos los empleados...
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeers()
        {
            // Valida si la peticion es correcta
            if (_context.Employees == null)
            {
                return BadRequest();
            }

            // Respuesta
            return await _context.Employees
                .ToListAsync();
        }

        // Metodo GET por ID
        /// <summary>
        /// Obtiene los datos de un empleado obtenido por su ID...
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployee(int id)
        {
            // Valida si la peticion es correcta
            if (_context.Employees == null)
            {
                return BadRequest();
            }


            //var employee = await _context.Employees.FindAsync(id);

            // Crea variable respuesta
            var employee = await _context.Employees
                .Where(e => e.EmployeeId == id)
                .Include(e => e.ReportsToNavigation)
                .ToListAsync();

            // Valida si el dato existe
            if (employee == null)
            {
                return NotFound("El dato que ingresaste NO existe...");
            }

            // Resultado
            return employee;
        }
    }
}
