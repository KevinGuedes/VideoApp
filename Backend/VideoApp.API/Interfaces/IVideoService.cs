using System.Collections.Generic;
using System.Threading.Tasks;

namespace VideoApp.API.Interfaces
{
    public interface IVideoService
    {
       IEnumerable<byte> GetVideo(string videoPath);
    }
}
