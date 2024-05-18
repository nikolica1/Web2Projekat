using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taxi.Core.Common.Interfaces.Services
{
    public interface IPictureService
    {
        public Task<ImageUploadResult> UploadPhotoAsync(IFormFile picture);

    }
}
