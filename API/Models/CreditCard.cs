
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WatchMe.Models
{
    public class CreditCard
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public required string UserId {get; set;}

        public string? CardNumber {get;set;}

        public int? CVV {get;set;}

        public string? Name { get; set; }

        public string? ExpDate {get; set;}


    }
}