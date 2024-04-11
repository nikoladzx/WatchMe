
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WatchMe.Models
{
    public enum Status {rejected, pending, completed}
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public required string UserId {get;set;}

        public  int TotalPrice { get; set; }


        public  Status Status { get; set; }

        public List<BasketItem> BasketItems {get;set;} = new List<BasketItem>();

    }
}