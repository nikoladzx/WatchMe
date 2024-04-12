using WatchMe.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using WatchMe.DTOs;
using API.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace WatchMe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly IMongoCollection<Customer> _customersCollection;
        private readonly IMongoCollection<CreditCard> _creditcardsCollection;

        private readonly IMongoCollection<Basket> _basketsCollection;

        private readonly IMongoCollection<Order> _ordersCollection;
        private readonly IMongoCollection<Admin> _adminsCollection;

        public CustomerController(IMongoDatabase mongoDatabase)
        {
            _customersCollection = mongoDatabase.GetCollection<Customer>("Customers");
            _creditcardsCollection = mongoDatabase.GetCollection<CreditCard>("CreditCards");
            _basketsCollection = mongoDatabase.GetCollection<Basket>("Baskets");
             _ordersCollection = mongoDatabase.GetCollection<Order>("Orders");
              _adminsCollection = mongoDatabase.GetCollection<Admin>("Admins");
        }

        
        [HttpGet()]
        public async Task<ActionResult<Customer>> Get()
        {
            string username = HttpContext.User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name");
            if (username == null)
                return BadRequest("No one is logged in");
            var customer = await _customersCollection.Find(x=> x.Username == username).FirstOrDefaultAsync();
            
            if (customer == null) 
                return BadRequest("Admin is logged in");

            return Ok(customer);
        }

       
        [HttpPost]
        public async Task<ActionResult<CustomerDTO>> CreateCustomer(RegisterDTO login)
        {   
            var admin = await _adminsCollection
                .Find(adm => login.Username == adm.Username || login.Email == adm.Email)
                .FirstOrDefaultAsync();
            var customer = await _customersCollection
                    .Find(cust => login.Username == cust.Username || login.Email == cust.Email)
                    .FirstOrDefaultAsync();
            if (customer != null)
                return BadRequest("Customer with that username or email already exist!");
            var newCustomer = new Customer {
                Name="",
                Username=login.Username,
                Surname="",
                Email=login.Email,
                Password=login.Password,
                City = "",
                Number = 0,
                Street = "",
                PhoneNumber = 0,
                AdditionalInfo = ""
            };
                 CreditCard cc = new CreditCard {
                 UserId = login.Username
             };
             Basket b = new Basket {
                 BuyerId = login.Username
             };
             //Order o = new Order {
             //    UserId = login.Username
             //};


            await _customersCollection.InsertOneAsync(newCustomer);
             await _creditcardsCollection.InsertOneAsync(cc);
            // await _ordersCollection.InsertOneAsync(o);
             await _basketsCollection.InsertOneAsync(b);
            return Ok("Registracija uspesna!");
        }

        [Authorize]
        [HttpPut("Update")]
        public async Task<ActionResult<Customer>> UpdateInfo(Customer customerDTO)
        {
            
            var x = await _customersCollection.ReplaceOneAsync(x=> x.UID==customerDTO.UID, customerDTO);
            if (x == null)
            {
                return BadRequest("User thats tried to be updated doesnt even exist");
            }
            return Ok(customerDTO);
        }
    }}

