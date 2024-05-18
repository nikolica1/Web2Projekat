using System.ComponentModel.DataAnnotations;

namespace Taxi.Api.Request.UserRequest
{
    public class LoginUserRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
