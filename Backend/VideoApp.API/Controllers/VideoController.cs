using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace VideoApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VideoController : ControllerBase
    {
        private const string VIDEO_NAME = "videoFromBackEnd";
        private readonly string _videoPath;
        private readonly string _mimeType;

        public VideoController(IConfiguration configuration)
        {
            _videoPath = configuration.GetValue<string>("VideoPath");
            var fileInfo = new FileInfo(_videoPath);
            _mimeType = fileInfo.Extension[(fileInfo.Extension.IndexOf(".") + 1)..];
        }

        [HttpGet]
        public IActionResult GetVideoFileDirect()
            => PhysicalFile(_videoPath, $"video/{_mimeType}", fileDownloadName: VIDEO_NAME);

        [HttpGet("stream")]
        public IActionResult GetVideoStream()
            => PhysicalFile(_videoPath, "application/octet-stream", fileDownloadName: VIDEO_NAME, enableRangeProcessing: true);
    }
}
