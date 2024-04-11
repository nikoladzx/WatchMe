using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchMe.DTOs;

namespace API.DTOs
{
    public class RegisterDTO : LoginDTO
    {
        public required string Email { get; set; }
    }
}