using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WatchMe.Models
{
    public class Basket
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public required string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();

       
            


        
        

    }
}
