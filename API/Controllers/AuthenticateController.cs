using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using WatchMe.Models;
using API.DTOs;
using API.Services;
using MongoDB.Driver;
using WatchMe.DTOs;

namespace WatchMe.Controllers
{

[ApiController]
[Route("api/[controller]")]
 
    public class AuthenticateController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly IMongoCollection<Customer> _customerCollection;

        private readonly IMongoCollection<Admin> _adminsCollection;

        public AuthenticateController(IConfiguration configuration, IUserService userService, IWebHostEnvironment hostEnvironment, IMongoDatabase mongoDatabase)
        {
            _configuration = configuration;
            _userService= userService;
            this._hostEnvironment= hostEnvironment;
             _customerCollection = mongoDatabase.GetCollection<Customer>("Customers");
             _adminsCollection = mongoDatabase.GetCollection<Admin>("Admins");

        
        }
        private string CreateToken(User u, string role)
        {
            List<Claim> claims = new List<Claim>
            {
                
               new Claim(ClaimTypes.NameIdentifier, u.UID),
               new Claim(ClaimTypes.Name, u.Username),
               new Claim(ClaimTypes.Role, role),
               new Claim(ClaimTypes.Expiration, DateTime.Now.AddMinutes(120).ToString())
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("JWTSettings:TokenKey").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    
    
    [HttpPost]
    [Route("Login")]
    public async Task<ActionResult<UserDTO>> Login([FromBody]LoginDTO s)
    {
        
        Customer c=await _customerCollection.Find(x => x.Username == s.Username && x.Password==s.Password).FirstOrDefaultAsync();
        if (c == null) {
            Admin a = await _adminsCollection.Find(x => x.Username == s.Username && x.Password==s.Password).FirstOrDefaultAsync();
            if (a==null){
                return BadRequest("User with that combination of username and password doesn't exist admin=0");
            } 
            var adm = new Admin {Username=a.Username};
            var role1="Admin";
            
            adm.UID= a.UID;
            //adm.Username= a.Username;
            string token1= CreateToken(adm, role1);

                 return new UserDTO{
            Email=a.Email,
            Token=token1};;}
        var cust = new Customer{Username=c.Username};

        var role= "Customer";
        cust.UID = c.UID;
        //cust.Username=c.Username;
        string token= CreateToken(cust, role);
        return new UserDTO{
            Email=c.Email,
            Token=token};
    }

    [HttpGet]
    [Route("getcurrentuser")]
            public async Task<ActionResult<UserDTO>> GetCurrentUser(){
            
            string username = HttpContext.User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name");
            if (username == null)
                return BadRequest("No one is logged in");
            var customer = await _customerCollection.Find(x=> x.Username == username).FirstOrDefaultAsync();
            var admin = await _adminsCollection.Find(x=> x.Username == username).FirstOrDefaultAsync();
            string token ="";
            string role = "";
            if (customer != null) 
            {
                 token= CreateToken(customer, "Customer");
                 role="Customer";
            }
             if (admin != null) 
            {
                 token= CreateToken(admin, "Admin");
                 role = "Admin";
            }
            if (customer == null && admin == null)
                return BadRequest("niko nije ulogovan");
            //string token1= CreateToken(adm, role1);
            return new UserDTO{
                Email=username,
                Role=role,
                Token=token
            };
    }
 
        }

}
