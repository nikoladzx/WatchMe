using MongoExample.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using WatchMe.Models;

namespace MongoExample.Services;

public class MongoDBService {

    private readonly IMongoCollection<Customer> _customer;

    private readonly IMongoCollection<Admin> _admin;
    private readonly IMongoCollection<Product> _product;
    private readonly IMongoCollection<Basket> _basket;
    private readonly IMongoCollection<BasketItem> _basketitem;
    // private readonly IMongoCollection<Info> _info;
    private readonly IMongoCollection<Order> _order;
    private readonly IMongoCollection<CreditCard> _creditcard;
    

    public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings) {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        
    }
}