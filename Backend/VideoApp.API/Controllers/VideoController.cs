using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace VideoApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VideoController : ControllerBase
    {
        private const string VIDEO_NAME = "videoFromBackEnd";
        private readonly string _videoPath;
        private readonly string _savePath;
        private readonly string _mimeType;

        public VideoController(IConfiguration configuration)
        {
            _videoPath = configuration.GetValue<string>("VideoPath");
            _savePath = configuration.GetValue<string>("SavePath");
            var fileInfo = new FileInfo(_videoPath);
            _mimeType = fileInfo.Extension[(fileInfo.Extension.IndexOf(".") + 1)..];
        }

        [HttpGet]
        public IActionResult GetVideoFileDirect()
            => PhysicalFile(_videoPath, $"video/{_mimeType}", fileDownloadName: VIDEO_NAME);

        [HttpGet("stream")]
        public IActionResult GetVideoStream()
            => PhysicalFile(_videoPath, "application/octet-stream", fileDownloadName: VIDEO_NAME, enableRangeProcessing: true);

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> UploadVideo()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files[0];

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(_savePath, $"{fileName}");
                    using var stream = new FileStream(fullPath, FileMode.Create);
                    file.CopyTo(stream);

                    return Ok();
                }
                else
                    return BadRequest();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
