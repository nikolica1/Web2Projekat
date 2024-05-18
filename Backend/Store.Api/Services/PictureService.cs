using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Taxi.Core.Common.Interfaces.Services;

namespace Taxi.Api.Services
{
    public class PictureService : IPictureService
    {
        private readonly Cloudinary cloudinary;
        public PictureService(IConfiguration config)
        {
            Account account = new Account(
                config.GetSection("CloudinarySettings:CloudName").Value,
                config.GetSection("CloudinarySettings:ApiKey").Value,
                config.GetSection("CloudinarySettings:ApiSecret").Value);
            cloudinary = new Cloudinary(account);
        }

        public async Task<ImageUploadResult> UploadPhotoAsync(IFormFile picture)
        {
            var uploadResult = new ImageUploadResult();
            if (picture.Length > 0)
            {
                using var stream = picture.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(picture.FileName, stream),
                    Transformation = new Transformation()
                        .Height(500).Width(800)
                };
                uploadResult = await cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;
        }
    }
}
