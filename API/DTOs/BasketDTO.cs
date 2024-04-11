using System.Collections.Generic;

namespace WatchMe.DTOs
{
    public class BasketDTO
    {
        public Guid Id { get; set; }
        public required string BuyerId { get; set; }
        
        public required List<BasketItemDTO> Items { get; set; }
    }
}
