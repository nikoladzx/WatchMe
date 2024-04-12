
using WatchMe.DTOs;
using WatchMe.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using API.DTOs;
using MongoDB.Driver;
using System.Security.Claims;

namespace WatchMe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : Controller
    {
         private readonly IMongoCollection<Customer> _customersCollection;

        private readonly IMongoCollection<Order> _ordersCollection;
        private readonly IMongoCollection<Basket> _basketsCollection;
        public OrderController(IMongoDatabase mongoDatabase)
        {
            _customersCollection = mongoDatabase.GetCollection<Customer>("Customers");
            _ordersCollection = mongoDatabase.GetCollection<Order>("Orders");
            _basketsCollection = mongoDatabase.GetCollection<Basket>("Baskets");
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<Order>> GetOrders()
        {
            string username = HttpContext.User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name");
            if (username == null)
            {
                return BadRequest("user with that username doesnt exist");
            }
            var customer = await _customersCollection
                .Find(x=> x.Username == username)
                .FirstOrDefaultAsync();
            
            if (customer == null) 
                return BadRequest("Customer thats logged in doesnt exist");

            var orders = await _ordersCollection
                .Find(x=> x.UserId == customer.Username)
                .ToListAsync();

            return Ok(orders);
            

        }

        [Authorize]
        [HttpPost("addorder")]
        public async Task<ActionResult<Order>> AddOrder()
        {
            string username = HttpContext.User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name");
            if (username == null)
            {
                return BadRequest("user with that username doesnt exist");
            }
            var customer = await _customersCollection.Find(x=> x.Username == username).FirstOrDefaultAsync();
            if (customer == null) 
                return BadRequest("Customer thats logged in doesnt exist");

            var basket = await _basketsCollection
                        .Find(b => b.BuyerId == customer.Username)
                        .FirstOrDefaultAsync();
            // var products = basket.foreach (var item in collection)
            // {
                var order = new Order
                {
                UserId = customer.Username,
                Status=0, 
                TotalPrice=0
                };
                for (int i =0; i< basket?.Items.Count; i++)
                {
                order.BasketItems.Add(basket.Items[i]);
                order.TotalPrice+=basket.Items[i].Product.Price*basket.Items[i].Quantity;
                }
            if (order == null) 
                return BadRequest("order doesnt exist");
            // }
            await _ordersCollection.InsertOneAsync(order);
           return Ok("Uspesno dodat order");
            
        }

    }
}
