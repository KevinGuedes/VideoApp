using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using VideoApp.API.Interfaces;

namespace VideoApp.API.Services
{
    public class VideoService : IVideoService
    {
        public IEnumerable<byte> GetVideo(string videoPath)
            => File.ReadAllBytes(videoPath).AsEnumerable();
    }
}
