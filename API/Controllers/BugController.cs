using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity.Validation;

namespace WatchMe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BugController : ControllerBase
    {
        [HttpGet("validation-error")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }
        [HttpGet("badrequest-error")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails { Title = "This is a bad request"});
        }

        [HttpGet("unathorized-error")]
        public ActionResult GetUnathorized()
        {
            return Unauthorized();
        }
        [HttpGet("Server-error")]
        public ActionResult GetServerError()
        {
           
            return StatusCode(500, "server error");
        }
    }
}
