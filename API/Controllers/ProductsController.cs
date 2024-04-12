
using WatchMe.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using MongoDB.Bson;
using Microsoft.AspNetCore.Authorization;

namespace WatchMe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IMongoCollection<Product> _productsCollection;
        public ProductsController(IMongoDatabase mongoDatabase)
        {
            _productsCollection = mongoDatabase.GetCollection<Product>("Products");
        }

        

        [HttpGet("get/{model}")]
        public async Task<ActionResult<Product>> Getname(string model)
        {


            return Ok(await _productsCollection.Find(x => x.Name == model).FirstOrDefaultAsync());
        }

    [HttpGet("Get")]
    public async Task<ActionResult<List<Product>>> Get([FromQuery] int? pricemin, [FromQuery] int? pricemax,
    [FromQuery] string? type, [FromQuery] string? brand, [FromQuery] string? name, [FromQuery] string? orderBy)
{
    var filterBuilder = Builders<Product>.Filter;
    var sortBuilder = Builders<Product>.Sort;

    var filter = filterBuilder.Empty; // Start with an empty filter

    if (pricemin.HasValue)
        filter &= filterBuilder.Gte(p => p.Price, pricemin.Value);

    if (pricemax.HasValue)
        filter &= filterBuilder.Lte(p => p.Price, pricemax.Value);

    if (!string.IsNullOrWhiteSpace(type))
        filter &= filterBuilder.Eq(p => p.Type, type);

    if (!string.IsNullOrWhiteSpace(brand))
        filter &= filterBuilder.Eq(p => p.Brand, brand);

    if (!string.IsNullOrWhiteSpace(name))
        filter &= filterBuilder.Or(
            filterBuilder.Regex(p => p.Name, new BsonRegularExpression(name, "i")),
            filterBuilder.Regex(p => p.Brand, new BsonRegularExpression(name, "i")));

    var query = _productsCollection.Find(filter);

    switch (orderBy)
    {
        case "Price Low-To-High":
            query = query.Sort(sortBuilder.Ascending(p => p.Price));
            break;
        case "Price High-To-Low":
            query = query.Sort(sortBuilder.Descending(p => p.Price));
            break;
        default:
            query = query.Sort(sortBuilder.Ascending(p => p.Name));
            break;
    }

    var result = await query.ToListAsync();

    return Ok(result);
}

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(ProductDTO productDTO)
        {
            var product = await _productsCollection
                    .Find(product => productDTO.Name == product.Name)
                    .FirstOrDefaultAsync();
            if (product != null)
                return BadRequest("That model of the watch already exists!");
            var newProduct = new Product {
                Name=string.IsNullOrWhiteSpace(productDTO.Name) ? "" : productDTO.Name,
                Brand=string.IsNullOrWhiteSpace(productDTO.Brand) ? "" : productDTO.Brand,
                Type=string.IsNullOrWhiteSpace(productDTO.Type) ? "" : productDTO.Type,
                Description=string.IsNullOrWhiteSpace(productDTO.Description) ? "" : productDTO.Description,
                PictureUrl=string.IsNullOrWhiteSpace(productDTO.PictureUrl) ? "" : productDTO.PictureUrl,
               // PictureUrl=productDTO.PictureUrl ? productDTO.PictureUrl : "",
                Price=productDTO.Price > 0 ? productDTO.Price : 0,
                QuantityInStock=productDTO.QuantityInStock > 0 ? productDTO.QuantityInStock : 0
            };
            await _productsCollection.InsertOneAsync(newProduct);
            return Ok(newProduct);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("edit")]
        public async Task<ActionResult<Product>> EditProduct(string name, int? quantity, int? price)
        {
            var product = await _productsCollection
                    .Find(product => name == product.Name)
                    .FirstOrDefaultAsync();
            if (product == null)
                return BadRequest("That model of the watch doesnt exist!");
            
            Product pr1 = new Product {
                Id=product.Id,
                Name=product.Name,
                Price=price ?? product.Price,
                PictureUrl=product.PictureUrl,
                QuantityInStock=quantity ?? product.QuantityInStock,
                Brand=product.Brand,
                Type=product.Brand,
                Description=product.Description

            };
            await _productsCollection.ReplaceOneAsync(x=> x.Name==name, pr1);


            return Ok(pr1);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete")]
        public async Task<ActionResult<Product>> DeleteProduct(string name)
        {
            // var product = await _productsCollection
            //         .Find(product => name == product.Name)
            //         .FirstOrDefaultAsync();
            // if (product == null)
            //     return BadRequest("That model of the watch doesnt exist!");
            var x=await _productsCollection.DeleteOneAsync(x => x.Name == name);

            //_context.Update(product);
            return Ok(x);
        }
        }
    }


