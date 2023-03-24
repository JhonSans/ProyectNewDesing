using Microsoft.AspNetCore.Mvc;

namespace NorthwindTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        // Asignacion variable contexto
        private readonly NorthwindContext _context;

        // Asignacion variable contexto publica
        public OrdersController(NorthwindContext context)
        {
            _context = context;
        }

        //////////// ORDEN ////////////

        // Metodo GET
        //
        /// <summary>
        /// Obtiene los datos de todas las ordenes...
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public dynamic GetOrders(int? pg=null)
        {
            // Valida si la peticion es correcta
            if (_context.Orders == null)
            {
                return BadRequest();
            }

            if (pg != null)
            {
                var ret = _context.Orders
                    .Include(e => e.Employee)
                    .Skip(pg.Value * 10)
                    .Take(10);

                return new { count = _context.Orders.Count(), data = ret };
            }

            // Resultado
            return _context.Orders
               //.Include(e => e.OrderDetails)
               .Include(e => e.Employee)
               .ToList();
        }

        // Metodo GET por Id
        //
        /// <summary>
        /// Obtiene los datos detallados de una orden obtenida por su ID...
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            // Valida si la peticion es correcta
            if (_context.Orders == null)
            {
                return BadRequest();
            }

            // Crea variable resultado
            var order = await _context.Orders
               .Include(e => e.OrderDetails)
               .Include(e => e.Employee)
               .FirstOrDefaultAsync(e => e.OrderId == id);

            // Valida si el dato existe
            if (order == null)
            {
                return NotFound("El dato que ingresaste NO existe...");
            }

            // Resultado
            return Ok(order);
        }

        // Metodo POST
        //
        /// <summary>
        /// Agrega una orden...
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        /// <remarks>
        /// Sample Request:
        /// 
        ///     {
        ///         "orderId": 0,
        ///         "customerId": "JSSC",
        ///         "employeeId": 3,
        ///         "orderDate": "2022-11-29T17:59:36.887Z",
        ///         "requiredDate": "2022-11-29T17:59:36.887Z",
        ///         "shippedDate": "2022-11-29T17:59:36.887Z",
        ///         "shipVia": 2,
        ///         "freight": 0.89,
        ///         "shipName": "Envio rápidos",
        ///         "shipAddress": "Cra 98",
        ///         "shipCity": "Bogota",
        ///         "shipRegion": "Cundinamarca",
        ///         "shipPostalCode": "111051",
        ///         "shipCountry": "Colombia"
        ///         "orderDetails": [
        ///             {
        ///                 "orderId": 0,
        ///                 "productId": 7,
        ///                 "unitPrice": 0,
        ///                 "quantity": 2,
        ///                 "discount": 0
        ///             }
        ///         ]
        ///     }
        /// </remarks>
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            // Obtiene los valores del detalle de orden
            foreach (var item in order.OrderDetails)
            {
                // Variable producto
                var product = await _context.Products
                    .Where(e => e.ProductId == item.ProductId)
                    .FirstOrDefaultAsync();

                // Valida si el producto existe
                if (product == null)
                {
                    return NotFound("El producto que ingresaste NO existe...");
                }

                // Agrega la orden
                _context.Orders
                    .Add(order);

                // Guarda los cambios
                await _context
                     .SaveChangesAsync();

                // Resultado
                return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, order);
            }
            // Cierre
            return NoContent();
        }

        // Metodo PUT
        
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutOrder(int id, Order order)
        //{
        //    // Valida si la peticion es correcta
        //    if (id != order.OrderId)
        //    {
        //        return BadRequest();
        //    }

        //    // Modifica los datos de la orden
        //    _context.Entry(order).State = EntityState.Modified;

        //    // Valida si la orden existe
        //    if (!OrderExist(id))
        //    {
        //        return NotFound("El dato que ingresaste NO existe...");
        //    }
        //    else
        //    {
        //        // Obtiene los valores del detalle de la orden
        //        foreach (var item in order.OrderDetails.ToList())
        //        {
        //            // Obtiene los datos del producto
        //            var product = await _context.Products
        //                    .Where(e => e.ProductId == item.ProductId)
        //                    .FirstOrDefaultAsync();

        //            // Valida si el producto existe
        //            if (product == null)
        //            {
        //                return NotFound("El dato que ingresaste NO existe...");
        //            }

        //            // Crea variable order detail
        //            var newOrder = new OrderDetail
        //            {
        //                OrderId = order.OrderId,
        //                ProductId = item.ProductId,
        //                UnitPrice = product.UnitPrice,
        //                Quantity = item.Quantity,
        //                Discount = item.Discount
        //            };

        //            // Valida si el detalle de orden existe
        //            if (!OrderDetailExist(id, item.ProductId))
        //            {
        //                // Agrega el detalle de orden
        //                _context.OrderDetails.Add(newOrder);

        //                // Guarda los cambios
        //                await _context.SaveChangesAsync();
        //            }
        //            else
        //            {
        //                // Modifica los datos del detalle de orden
        //                _context.Entry(newOrder).State = EntityState.Modified;

        //                // Guarda los cambios
        //                await _context.SaveChangesAsync();
        //            }
        //        }
        //    }
        //    // Resultado
        //    return NoContent();
        //}

        /// <summary>
        /// Edita los datos de una orden obtenida por su ID...
        /// </summary>
        /// <param name="id"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        /// <remarks>
        /// Sample Request:
        /// 
        ///     {
        ///         "orderId": 11101,
        ///         "customerId": "JSSC",
        ///         "employeeId": 1,
        ///         "orderDate": "2022-11-29T17:59:36.887Z",
        ///         "requiredDate": "2022-11-29T17:59:36.887Z",
        ///         "shippedDate": "2022-11-29T17:59:36.887Z",
        ///         "shipVia": 1,
        ///         "freight": 1.45,
        ///         "shipName": "Envios a Colombia",
        ///         "shipAddress": "Cra 53",
        ///         "shipCity": "Bogota",
        ///         "shipRegion": "Cundinamarca",
        ///         "shipPostalCode": "111051",
        ///         "shipCountry": "Colombia"
        ///         "orderDetails": [
        ///             {
        ///                 "orderId": 11101,
        ///                 "productId": 7,
        ///                 "unitPrice": 0,
        ///                 "quantity": 3,
        ///                 "discount": 0.05
        ///             }
        ///         ]
        ///     }
        /// </remarks>
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Order order)
        {
            // Valida si la peticion es correcta
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            // Valida si la orden existe
            if (!OrderExist(id))
            {
                return NotFound("El dato que ingresaste NO existe...");
            }
            else
            {        
                // Trae la informacion de la orden de la DB
                var orderDb = await _context.Orders
                    .Where(e => e.OrderId == id)
                    .Include(e => e.OrderDetails)
                    .FirstOrDefaultAsync();

                // Valida si existe
                if (orderDb == null)
                {
                    return NotFound();
                }

                // Asigna los datos a modificar
                orderDb.CustomerId = order.CustomerId;
                orderDb.EmployeeId = order.EmployeeId;
                orderDb.OrderDate = order.OrderDate;
                orderDb.RequiredDate = order.RequiredDate;
                orderDb.ShippedDate = order.ShippedDate;
                orderDb.ShipVia = order.ShipVia;
                orderDb.Freight = order.Freight;
                orderDb.ShipName = order.ShipName;
                orderDb.ShipAddress = order.ShipAddress;
                orderDb.ShipCity = order.ShipCity;
                orderDb.ShipRegion = order.ShipRegion;
                orderDb.ShipPostalCode = order.ShipPostalCode;
                orderDb.ShipCountry = order.ShipCountry;

                // Recorre los detalles de la orden
                foreach (var item in order.OrderDetails)
                {
                    // Valida si el ID es 0
                    if (item.OrderId == 0)
                    {
                        // Asidna el ID a el detalle
                        item.OrderId = id;

                        // Agrega el detalle
                        _context.OrderDetails.Add(item);

                        // Guarda los cambios
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        // Recorre los detalles de la orden DB
                        foreach (var itemDb in orderDb.OrderDetails)
                        {
                            // Valida si existe
                            if (itemDb.ProductId == item.ProductId)
                            {
                                // Asigna los datos a modificar
                                itemDb.UnitPrice = item.UnitPrice;
                                itemDb.Quantity = item.Quantity;
                                itemDb.Discount = item.Discount;

                                // Guarda los cambios
                                await _context.SaveChangesAsync();
                            }
                        }
                    }       
                }
            }
            return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, order);
        }

        // Metodo DELETE
        /// <summary>
        /// Elimina una orden obtenida por su ID...
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            // Valida si la operacion es correcta
            if (!OrderExist(id))
            {
                return NotFound("El dato que ingresaste NO existe...");
            }

            // Crea variable resultado
            var order = _context.Orders
                .Where(e => e.OrderId == id)
                .Include(e => e.OrderDetails)
                .First();

            // Elimina los detalles
            order.OrderDetails.Clear();

            // Elimina la orden
            _context.Orders.Remove(order);

            // Guarda los cambios
            await _context.SaveChangesAsync();

            // Resultado
            return Content("El dato a sido eliminado correctamente...");
        }

        // Funcion valida id existe
        private bool OrderExist(int id)
        {
            // Valida los datos
            return (_context.Orders?
                .Any(e => e.OrderId == id))
                .GetValueOrDefault();
        }

        // Funcion valida detalle orden existe
        private bool OrderDetailExist(int order, int product)
        {
            return (_context.OrderDetails?
                .Where(e => e.OrderId == order)
                .Any(e => e.ProductId == product))
                .GetValueOrDefault();
        }

        //////////// Detalle de la Orden ////////////

        // Metodo DELETE detalle
        /// <summary>
        /// Elimina un prodúcto de una orden obtenida por el ID de la orden y el ID del producto...
        /// </summary>
        /// <param name="id"></param>
        /// <param name="productId"></param>
        /// <returns></returns>
        [HttpDelete, ActionName("DeleteDetail")]
        public async Task<IActionResult> DeleteOrderDetail(int id, int productId)
        {
            if (!OrderExist(id) || !OrderDetailExist(id, productId))
            {
                return NotFound("El dato que ingresaste es incorrecto...");
            }

            // Crea variable resultado
            var order = _context.OrderDetails
                .Where(e => e.OrderId == id && e.ProductId == productId)
                .First();

            // Elimina el dato
            _context.OrderDetails
                .Remove(order);

            // Guarda los cambios
            await _context
                .SaveChangesAsync();

            // Resultado
            return Content("El detalle ha sido eliminado correctamente...");
        }
    }
}
