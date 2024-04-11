
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchMe.Models
{
    public class ProductDTO
    {

        public required string Name { get; set; } 

        public required string Description { get; set; }

        public int Price { get; set; }

        public required string PictureUrl { get; set; }

        public required int QuantityInStock { get; set; }

        public required string Brand { get; set; } 

        public required string Type { get; set; }

    }
}