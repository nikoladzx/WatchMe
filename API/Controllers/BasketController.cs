using WatchMe.DTOs;
using WatchMe.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using MongoDB.Driver;
using System.Security.Claims;

namespace WatchMe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BasketController : Controller
    {
        private readonly IMongoCollection<Customer> _customersCollection;

        private readonly IMongoCollection<Product> _productsCollection;
        private readonly IMongoCollection<Basket> _basketsCollection;

        private readonly IMongoCollection<BasketItem> _basketitemsCollection;
        public BasketController(IMongoDatabase mongoDatabase)
        {
            _customersCollection = mongoDatabase.GetCollection<Customer>("Customers");
            _productsCollection = mongoDatabase.GetCollection<Product>("Products");
            _basketsCollection = mongoDatabase.GetCollection<Basket>("Baskets");
            _basketitemsCollection = mongoDatabase.GetCollection<BasketItem>("BasketItems");
        }
      //  [Authorize]
        [HttpGet]
        public async Task<ActionResult<BasketDTO>> GetBasket()
        {
            string username = HttpContext.User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name");
            var customer = await _customersCollection.Find(x=> x.Username == username).FirstOrDefaultAsync();
            
            if (customer == null) return BadRequest("greska");
            var basket = await _basketsCollection
                .Find(x => x.BuyerId == customer.Username)
                .FirstOrDefaultAsync();
            var id =Guid.NewGuid();
            // if (basket == null) { 
            //     Basket b = new Basket {
            //         BuyerId = user.Username
            //     };
            //      _basketsCollection.InsertOne(b);
            //  }
            return new BasketDTO
            {
                
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDTO
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
       // [Authorize]
        [HttpDelete("/deleteall")]
        public async Task<ActionResult> DeleteAllItems()
        {
            string username = HttpContext.User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name");
            var customer = await _customersCollection.Find(x=> x.Username == username).FirstOrDefaultAsync();
            
            if (customer == null) return BadRequest("greska");
            var basket = await _basketsCollection
                .Find(x=> x.BuyerId ==customer.Username)
                .FirstOrDefaultAsync();
            if (basket == null) { return BadRequest("Basket can not be deleted because it doesn't exist"); }
            
            List<BasketItem> lista = new List<BasketItem>();
            var filter = Builders<Basket>.Filter.Eq((u) => u.BuyerId, username);
            var update = Builders<Basket>.Update.Set(u => u.Items, lista);
            var result = await _basketsCollection.FindOneAndUpdateAsync(filter, update);
            return Ok(basket);
            
        }
       // [Authorize]
        [HttpPost("additem")]
        public async Task<ActionResult<BasketDTO>> AddItem(string model, int quantity)
        {
            string username = HttpContext.User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name");
            var customer = await _customersCollection.Find(x=> x.Username == username).FirstOrDefaultAsync();
            
            if (customer == null) return BadRequest("greska");
            var basket = await _basketsCollection
                .Find(x=> x.BuyerId ==customer.Username)
                .FirstOrDefaultAsync();

            if (basket == null) {
                basket = new Basket {
                    BuyerId=customer.Username,
                    Items=new List<BasketItem>()
                };
            }
            var product = await _productsCollection.Find(x=> x.Name==model).FirstOrDefaultAsync();
             BasketItem item = new BasketItem{
                
                Product= product,
                Quantity = quantity,
                Basket = basket
            };
            
            
            if (basket.Items.Find(item=>item.Product.Name == model)== null)
            {var filter = Builders<Basket>.Filter.Eq((u) => u.BuyerId, username);
            var update = Builders<Basket>.Update.Push(u => u.Items, item);
            var result = await _basketsCollection.FindOneAndUpdateAsync(filter, update);
            return new BasketDTO
            {
                
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDTO
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
            }
            // var existingItem = basket.Items.FirstOrDefault(item => item.Product == product);
            {

            var indeks = basket.Items.FindIndex(x=>x.Product.Name==model);
            var filter2 = Builders<Basket>.Filter.Eq((m) => m.BuyerId, username ) & Builders<Basket>.Filter.Eq((m) => m.Items[indeks].Product, product ) ;
            var update2 = Builders<Basket>.Update.Inc((m) => m.Items[indeks].Quantity, quantity);
            var result2 = await _basketsCollection.FindOneAndUpdateAsync(filter2, update2);
            
            return new BasketDTO
            {
                
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDTO
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }}
    
        
       // [Authorize]
        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromBasket(string model, int quantity)
        {
            string username = HttpContext.User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name");
            var customer = await _customersCollection.Find(x=> x.Username == username).FirstOrDefaultAsync();
            
            if (customer == null) return BadRequest("greska");
            var basket = await _basketsCollection
                .Find(x=> x.BuyerId ==customer.Username)
                .FirstOrDefaultAsync();

            if (basket == null) {
                return BadRequest("greska");
            }
            var product = await _productsCollection.Find(x=> x.Name==model).FirstOrDefaultAsync();
             BasketItem item = new BasketItem{
                // ProductId=productId,
                Product= product,
                Quantity = quantity,
                Basket = basket
            };
             var indeks = basket.Items.FindIndex(x=>x.Product.Name==model);
            
            if (quantity == 0)
            {
            List<BasketItem> lista = new List<BasketItem>();
            for (int i=0; i< basket.Items.Count;i++)
            {
                if (i==indeks) continue;
                lista.Add(basket.Items[i]);
            }
            {var filter = Builders<Basket>.Filter.Eq((u) => u.BuyerId, username);
            var update = Builders<Basket>.Update.Set(u => u.Items, lista);
            var result = await _basketsCollection.FindOneAndUpdateAsync(filter, update);
            return Ok(result);
            }
            }
            // var existingItem = basket.Items.FirstOrDefault(item => item.Product == product);
            {

           
            var filter2 = Builders<Basket>.Filter.Eq((m) => m.BuyerId, username ) & Builders<Basket>.Filter.Eq((m) => m.Items[indeks].Product, product ) ;
            var update2 = Builders<Basket>.Update.Inc((m) => m.Items[indeks].Quantity, -quantity);
            var result2 = await _basketsCollection.FindOneAndUpdateAsync(filter2, update2);
            
            return Ok(result2);
        }}}}
    
