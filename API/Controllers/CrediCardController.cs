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
    public class CreditCardController : Controller
    {
         private readonly IMongoCollection<Customer> _customersCollection;

        private readonly IMongoCollection<CreditCard> _creditcardsCollection;
        public CreditCardController(IMongoDatabase mongoDatabase)
        {
            _customersCollection = mongoDatabase.GetCollection<Customer>("Customers");
            _creditcardsCollection = mongoDatabase.GetCollection<CreditCard>("CreditCards");
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<CreditCard>> GetCreditCard()
        {
            string username = HttpContext.User
                .FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name");
            if (username == null)
                return BadRequest("no one is logged in");
            
            var customer = await _customersCollection
                .Find(x=> x.Username == username)
                .FirstOrDefaultAsync();
            
            if (customer == null) 
                return BadRequest("Admin is logged in");
            var card = await _creditcardsCollection
                        .Find(x=> x.UserId == customer.Username)
                        .FirstOrDefaultAsync();
            if (card == null) 
                {
                    CreditCard kartica = new CreditCard
                        {
                        
                        UserId=username,
                        CVV=1,
                        CardNumber="",
                        Name="",
                        ExpDate=""
                        };
                }
                return Ok(card);
            

        }
        [Authorize]
        [HttpPut("/creditcard/update")]
        public async Task<ActionResult<CreditCard>> UpdateCard(CreditCardDTO creditCardDTO)
        {
           string username = HttpContext.User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name");
           if (username == null)
            {
                return BadRequest("No one is logged in");
            }
            var customer = await _customersCollection
                .Find(x=> x.Username == username)
                .FirstOrDefaultAsync();
            
           // if (customer == null) return BadRequest("greska");
            var card = await _creditcardsCollection
                        .Find(x=> x.UserId == customer.Username)
                        .FirstOrDefaultAsync();
            if (card == null) 
                return BadRequest("Credit card doesn't exist");

            CreditCard kartica = new CreditCard{
            Id=card.Id,
            UserId=card.UserId,
            CVV=creditCardDTO.CVV,
            CardNumber=creditCardDTO.CardNumber,
            Name=creditCardDTO.Name,
            ExpDate=creditCardDTO.ExpDate
            };

            
            await _creditcardsCollection.ReplaceOneAsync(card => card.UserId==customer.Username, kartica);
            return Ok(creditCardDTO);
            

        }

    }
}
