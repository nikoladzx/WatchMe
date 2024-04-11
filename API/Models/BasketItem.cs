using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WatchMe.Models
{
    public class BasketItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public int Quantity { get; set; }

        public int ProductId { get; set; }

        public required Product Product { get; set; }

        public required Basket Basket {get; set;}
    }
}