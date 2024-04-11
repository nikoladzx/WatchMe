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
        
        // [Authorize]
        // [HttpPut("Update")]
        // public async Task<ActionResult<UserInfoDTO>> UpdateInfo(UserInfoDTO userInfoDTO)
        // {
            
        //     var user = await _userManager.FindByNameAsync(User.Identity.Name);
        //     if (user == null) return BadRequest("greska");
        //     var info = await _context.Infos
        //         .FirstOrDefaultAsync(x => x.UserId == user.Id);

        //     info.Name=userInfoDTO.Name;
        //     info.City=userInfoDTO.City;
        //     info.Surname=userInfoDTO.Surname;
        //     info.Street=userInfoDTO.Street;
        //     info.Number=userInfoDTO.Number;
        //     info.PhoneNumber=userInfoDTO.PhoneNumber;
        //     info.AdditionalInfo=userInfoDTO.AdditionalInfo;

        //     user.Email=userInfoDTO.Email;
        //     user.NormalizedEmail=userInfoDTO.Email.ToUpper();
        //     user.UserName=userInfoDTO.Username;
        //     user.NormalizedUserName=userInfoDTO.Username.ToUpper();
        //     var infodto = new UserInfoDTO
        //     {
        //         Email=userInfoDTO.Email,
        //         Username=userInfoDTO.Username,
        //         Name=userInfoDTO.Name,
        //         Surname=userInfoDTO.Surname,
        //         City=userInfoDTO.City,
        //         Street=userInfoDTO.Street,
        //         Number=userInfoDTO.Number,
        //         PhoneNumber=userInfoDTO.PhoneNumber,
        //         AdditionalInfo=userInfoDTO.AdditionalInfo


        //     };
        //     _context.Update(info);
        //     _context.Update(user);
        //     await _context.SaveChangesAsync();
            

        //     if (info == null) {
        //         return BadRequest("greska");
        //     }

        //     //info.Where(i => i.Name == userInfoDTO.Name ?? i.Name);

        //     return Ok(infodto);
        // }
    }}

