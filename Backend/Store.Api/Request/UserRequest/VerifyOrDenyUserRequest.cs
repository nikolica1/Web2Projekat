using System.ComponentModel.DataAnnotations;

namespace Taxi.Api.Request.UserRequest
{
    public class VerifyOrDenyUserRequest
    {
        [RegularExpression("^(Verified|Denied)$", ErrorMessage = "Action must be either 'Verified' or 'Denied'.")]
        public string Action { get; set; }
    }
}
