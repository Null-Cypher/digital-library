using Microsoft.AspNetCore.Mvc;

namespace OpenShelf.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            status = "ok",
            service = "OpenShelf API",
            database = "SQL Server"
        });
    }
}
