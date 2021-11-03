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

        //[HttpGet("stream-async")]
        //public async Task GetVideoStreamAsync()
        //{
        //    Stream iStream = null;
        //    byte[] buffer = new Byte[16 * 131072];
        //    int length;
        //    long dataToRead;

        //    try
        //    {
        //        iStream = new FileStream(_videoPath, FileMode.Open, FileAccess.Read, FileShare.Read);
        //        dataToRead = iStream.Length;
        //        int startbyte = 0;

        //        Response.Headers["Accept-Ranges"] = "bytes";
        //        Response.ContentType = "application/octet-stream";

        //        if (!String.IsNullOrEmpty(Request.Headers["Range"]))
        //        {
        //            string[] range = Request.Headers["Range"].ToString().Split(new char[] { '=', '-' });
        //            startbyte = Int32.Parse(range[1]);
        //            iStream.Seek(startbyte, SeekOrigin.Begin);

        //            Response.StatusCode = 206;
        //            Response.Headers["Content-Range"] = String.Format(" bytes {0}-{1}/{2}", startbyte, dataToRead - 1, dataToRead);
        //        }

        //        var outputStream = this.Response.Body;

        //        while (dataToRead > 0)
        //        {
        //            if (HttpContext.RequestAborted.IsCancellationRequested == false)
        //            {
        //                length = await iStream.ReadAsync(buffer, 0, buffer.Length);
        //                await outputStream.WriteAsync(buffer, 0, buffer.Length);
        //                outputStream.Flush();

        //                buffer = new Byte[buffer.Length];
        //                dataToRead -= buffer.Length;
        //            }
        //            else
        //                dataToRead = -1;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex.Message);
        //    }
        //    finally
        //    {
        //        if (iStream != null)
        //            iStream.Close();
        //    }
        //}

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
