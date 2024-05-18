using Microsoft.EntityFrameworkCore;
using Taxi.Core.Common.Interfaces.Repositories;
using Taxi.Core.DTOs.UserDTOs;
using Taxi.Core.Helper;
using Taxi.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics.CodeAnalysis;
using Docker.DotNet.Models;

namespace Taxi.Core.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly TaxiDataContext _data;
        private readonly Authentication _authentication;


        public UserRepository(TaxiDataContext data)
        {
            _authentication = new Authentication();
            _data = data;

        }

        public async Task<User> Login(string email, string password)
        {
            var user = await _data.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null || user.PasswordKey == null)
                return null!;
            if (user.Verification != "Verified")
                return null;
            if (!_authentication.MatchPasswordHash(password, user.Password!, user.PasswordKey))
                return null!;

            return user;
        }

        public async Task<bool> Register(User user)
        {
            try
            {
                _data.Users.Add(user);
                await _data.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<User> Update(UpdatedUserDTO updatedUser)
        {
            var user = await _data.Users.SingleOrDefaultAsync(x => x.Id == updatedUser.Id);

            if (!String.IsNullOrWhiteSpace(updatedUser.Newpassword))
            {
                byte[] passwordHash, passwordKey;

                using (var hmac = new HMACSHA512())
                {
                    passwordKey = hmac.Key;
                    passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(updatedUser.Newpassword));
                    user.Password = passwordHash;
                    user.PasswordKey = passwordKey;
                }
            }

            user.Username = updatedUser.Username;
            user.FirstName = updatedUser.FirstName;
            user.LastName = updatedUser.LastName;
            user.Email = updatedUser.Email;
            user.Address = updatedUser.Address;
            user.Birthday = updatedUser.Birthday;
            if (updatedUser.File != null)
                user.Picture = updatedUser.Picture;
            await _data.SaveChangesAsync();
            return user;
        }

        public async Task<bool> CheckPassword(int id, string password)
        {
            var user = await _data.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null || user.PasswordKey == null)
                return false;
            if (!_authentication.MatchPasswordHash(password, user.Password!, user.PasswordKey))
                return false;
            return true;
        }

        public async Task<User> VerifyOrDeny(int userId, string status)
        {
            var user = await _data.Users.SingleOrDefaultAsync(x => x.Id == userId);
            user.Verification = status;
            await _data.SaveChangesAsync();
            return user;
        }

  

        public async Task<bool> Check(Expression<Func<User, bool>> predicate)
        {
            return await _data.Users.AnyAsync(predicate);
        }
        //moyzda find za ova dva
        public async Task AddProfilePictureToUser(string email, string picture)
        {
            var user = await _data.Users.SingleOrDefaultAsync(x => x.Email == email);
            user.Picture = picture;
            await _data.SaveChangesAsync();
        }
        public async Task UpdateUserProfilePicture(int id, string picture)
        {
            var user = await _data.Users.SingleOrDefaultAsync(x => x.Id == id);
            user.Picture = picture;
            await _data.SaveChangesAsync();
        }
        public async Task<List<User>> GetDrivers()
        {
            var drivers = await _data.Users.Where(u => u.Role == "Driver").ToListAsync();
            return drivers;
        }
        public async Task<User> GetUser(int id)
        {
            var user = await _data.Users.SingleOrDefaultAsync(x => x.Id == id);
            return user;
        }

        public async Task<float> GetRating(int driverId)
        {
            List<Driving> drivings = await _data.Drivings.Where(o => o.DriverId == driverId  && o.Rating>0 && o.Rating<5.1 ).ToListAsync();

           
            float suma = drivings.Sum(d => d.Rating);


            float avg = drivings.Count > 0 ? (float)suma / drivings.Count : 0;



            return avg;
        }

        public async Task<bool> Block(int driverId)
        {
            var user = await _data.Users.SingleOrDefaultAsync(x => x.Id == driverId);
            bool tmp = user.Block;
            user.Block = !tmp;
            await _data.SaveChangesAsync();
            return true;
        }
    }
}
