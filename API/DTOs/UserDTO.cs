using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchMe.DTOs;
using WatchMe.Models;

namespace API.DTOs
{
    public class UserDTO
    {
        public required string Email { get; set; }

        public required string Token { get; set; }
        
        public string? Role {get; set;}

        public List<Order> Orders {get;set;} = new List<Order>();
    }
}