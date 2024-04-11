using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchMe.DTOs;
using WatchMe.Models;

namespace API.DTOs
{
    public class CreditCardDTO
    {
        public required string CardNumber {get;set;}

        public required int CVV {get;set;}

        public required string Name { get; set; }

        public required string ExpDate {get; set;}
    }
}