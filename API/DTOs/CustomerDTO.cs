        
        using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchMe.DTOs;
using WatchMe.Models;

namespace API.DTOs
{
    public class CustomerDTO
    {
        public required string Email { get; set; }

        public string? Username { get; set; }
        public string? Name { get; set; }

        public string? Surname { get; set; }

        public string? City { get; set; }
        public string? Street { get; set; }

        public int? Number { get; set; }

        public int? PhoneNumber { get; set; }

        public string? AdditionalInfo { get; set; }
        public string? Password { get; set; }
        
    }
}
       