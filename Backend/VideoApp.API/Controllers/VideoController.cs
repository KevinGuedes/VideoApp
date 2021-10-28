using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace VideoApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VideoController : ControllerBase
    {
        private const string VIDEO_PATH = @"C:";

        [HttpGet]
        public IActionResult GetVideoFile()
        {
            var fileInfo = new FileInfo(VIDEO_PATH);

            return PhysicalFile(VIDEO_PATH, $"video/{fileInfo.Extension.Replace(".", "")}", "videoDoBackEnd");
        }

        [HttpGet("direct")]
        public IActionResult GetVideoFileDirect()
            => PhysicalFile(VIDEO_PATH, $"video/webm", "videoDoBackEnd");
    }
}
