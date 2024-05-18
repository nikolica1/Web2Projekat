using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Taxi.Core.DTOs.UserDTOs;
using Taxi.Core.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Taxi.Core.Common.Interfaces.Services
{
    public interface IUserService
    {
        public Task<string> Login(LoginUserDTO loginUser);
        public Task<bool> Register(RegisterUserDTO newUser);
        public Task<bool> Update(UpdatedUserDTO updatedUser);
        public Task<bool> VerifyOrDeny(int id, string verification);
        public Task<List<GetDriversDTO>> GetDriver();
        public Task<float> GetRating(int driverId);

        public Task<bool> Block(int driverId);
        public Task<GetUserDTO> GetUserDetails(int id);
    }
}
