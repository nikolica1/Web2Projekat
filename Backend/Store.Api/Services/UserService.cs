using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Taxi.Core.Common.Interfaces.Repositories;
using Taxi.Core.Common.Interfaces.Services;
using Taxi.Core.Common.Interfaces.UnitOfWork;
using Taxi.Core.DTOs.UserDTOs;
using Taxi.Core.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Taxi.Api.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
      
        private readonly IPictureService _pictureService;

        public UserService(IConfiguration configuration, IUnitOfWork uow, IMapper mapper, IPictureService pictureService)
        {
            _configuration = configuration;
            _uow = uow;
            _mapper = mapper;
            _pictureService = pictureService;
        }

        public async Task<string> Login(LoginUserDTO loginUser)
        {
            var user = await _uow.UserRepository.Login(loginUser.Email, loginUser.Password);

            if (user == null)
                return null;
            var token = CreateJWT(user);
            return token;
        }
        public async Task<bool> Register(RegisterUserDTO newUser)
        {
            byte[] passwordHash, passwordKey;

            using (var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(newUser.Password));

            }
            if (await _uow.UserRepository.Check(u => u.Email == newUser.Email))
                return false;

            if (await _uow.UserRepository.Check(u => u.Username == newUser.Username))
                return false;
            var user = _mapper.Map<User>(newUser);
            user.Password = passwordHash;
            user.PasswordKey = passwordKey;
            if (newUser.Role == "User")
                user.Verification = "Verified";
            else
                user.Verification = "Pending";

            var result = await _pictureService.UploadPhotoAsync(newUser.File);
            if (result.Error != null)
                return false;
          //  user.Role = "Administrator";
            user.Picture = result.SecureUrl.AbsoluteUri;
            var response = await _uow.UserRepository.Register(user);

            if (!response)
                return false;

            return true;
        }
        public async Task<bool> Update(UpdatedUserDTO updatedUser)
        {
            if (!await _uow.UserRepository.Check(u => u.Id == updatedUser.Id))
                return false;
            if (await _uow.UserRepository.Check(u => u.Email == updatedUser.Email && u.Id != updatedUser.Id))
                return false;
            if (await _uow.UserRepository.Check(u => u.Username == updatedUser.Username && u.Id != updatedUser.Id)) 
                return false;

            if (String.IsNullOrWhiteSpace(updatedUser.Newpassword) && String.IsNullOrWhiteSpace(updatedUser.Oldpassword))
            {
                if(updatedUser.File != null)
                {
                    var result = await _pictureService.UploadPhotoAsync(updatedUser.File);
                    if (result.Error != null)
                        return false;

                    updatedUser.Picture = result.SecureUrl.AbsoluteUri;
                }
                await _uow.UserRepository.Update(updatedUser);
            }
            else if (!String.IsNullOrWhiteSpace(updatedUser.Newpassword) && !String.IsNullOrWhiteSpace(updatedUser.Oldpassword))
            {
                if (await _uow.UserRepository.CheckPassword(updatedUser.Id, updatedUser.Oldpassword))
                {
                    if (updatedUser.File != null)
                    {
                        var result = await _pictureService.UploadPhotoAsync(updatedUser.File);
                        if (result.Error != null)
                            return false;

                        updatedUser.Picture = result.SecureUrl.AbsoluteUri;
                    }
                    await _uow.UserRepository.Update(updatedUser);
                }
                else
                    return false;
            }
            else
                return false;
            return true;
        }
        public async Task<bool> VerifyOrDeny(int id, string verification)
        {
            if (!await _uow.UserRepository.Check(u => u.Id == id && u.Role == "Driver"))
                return false;

            await _uow.UserRepository.VerifyOrDeny(id, verification);
            var result = await _uow.UserRepository.GetUser(id);
            string message = verification == "Verified" ? "You are verified!" : "You have been denied!!";
            return true;
        }
        public async Task<List<GetDriversDTO>> GetDriver()
        {
            var results = await _uow.UserRepository.GetDrivers();
            var returnValue = _mapper.Map<List<GetDriversDTO>>(results);
            return returnValue;
        }
        public async Task<GetUserDTO> GetUserDetails(int id)
        {
            var result = await _uow.UserRepository.GetUser(id);
            var returnValue = _mapper.Map<GetUserDTO>(result);
            return returnValue;
        }
        private string CreateJWT(User user)
        {
            var secretKey = _configuration.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(secretKey!));

            var claims = new Claim[] {
                new Claim(ClaimTypes.Name,user.Username),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Role,user.Role.ToString())
            };

            var signingCredentials = new SigningCredentials(
                    key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(10),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<float> GetRating(int driverId)
        {
            var result = await _uow.UserRepository.GetRating(driverId);
         
            return result;
        }

        public async Task<bool> Block(int driverId)
        {
            var result = await _uow.UserRepository.Block(driverId);

            return result;
        }
    }
}
