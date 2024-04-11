using WatchMe.Models;

namespace WatchMe.DTOs
{
    public class BasketItemDTO
    {

        public int ProductId { get; set; }
        public int? Price { get; set; }

        public required string Name { get; set; }
        public required string PictureUrl { get; set; }
        public required string Brand { get; set; }

        public required string Type { get; set; }
        public int? Quantity { get; set; }


    }
}
