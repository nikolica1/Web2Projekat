using System.ComponentModel.DataAnnotations;

namespace Taxi.Api.Request.UserRequest
{
    public class RegisterUserRequest
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [RegularExpression("^(User|Driver)$", ErrorMessage = "Role must be either 'User' or 'Driver'.")]
        public string Role { get; set; }
        [Required]
        public IFormFile File { get; set; }
    }
}
