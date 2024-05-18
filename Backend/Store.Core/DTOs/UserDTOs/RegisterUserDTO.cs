using Microsoft.AspNetCore.Http;

namespace Taxi.Core.DTOs.UserDTOs
{
    public class RegisterUserDTO
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public DateTime Birthday { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public IFormFile File { get; set; }
    }
}
