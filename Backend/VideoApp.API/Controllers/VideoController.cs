using Microsoft.AspNetCore.Mvc;
using System.Linq;
using VideoApp.API.Interfaces;

namespace VideoApp.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VideoController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetVideoFile([FromServices] IVideoService videoService)
            => File(videoService.GetVideo(@"C:").ToArray(), "video/mp4", "videoDoBackEnd");   
    }
}
