

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WatchMe.Models
{ public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UID { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Email { get; set; }
        public required string Username { get; set; }
        public string? Password { get; set; }

    }
}