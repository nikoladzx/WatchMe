using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using WatchMe.Models;
namespace WatchMe.Models{
public class Customer: User{
    public string? City { get; set; }
    public string? Street { get; set; }

    public int? Number { get; set; }

    public int? PhoneNumber { get; set; }

    public string? AdditionalInfo { get; set; }
}
}