using WatchMe.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using WatchMe.DTOs;
using API.DTOs;
using System.Web;
using System.Security.Claims;


namespace WatchMe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IMongoCollection<Admin> _adminsCollection;
        public AdminController(IMongoDatabase mongoDatabase)
        {
            _adminsCollection = mongoDatabase.GetCollection<Admin>("Admins");
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Admin>> Get(string username)
        {
            //var x = System.Web.HttpContext.Current.User.Identity.Name;
            //var email = HttpContext.User.FindFirstValue("user");
            var admin = await _adminsCollection.Find(x=> x.Username == username).FirstOrDefaultAsync();

            if (admin == null)
            {
                return BadRequest("Admin with that username doesn't exist");
            }

            return Ok(admin);
        }

       
        [HttpPost]
        public async Task<ActionResult<Admin>> CreateAdmin(RegisterDTO login)
        {
            var admin = await _adminsCollection
                    .Find(admin => login.Username == admin.Username || login.Email == admin.Email)
                    .FirstOrDefaultAsync();
            if (admin != null)
                return BadRequest("Admin with that username or email already exist!");
            var newAdmin = new Admin {
                Name="",
                Username=login.Username,
                Surname="",
                Email=login.Email,
                Password=login.Password
            };

            await _adminsCollection.InsertOneAsync(newAdmin);
            return Ok(newAdmin);
        }
    }}

