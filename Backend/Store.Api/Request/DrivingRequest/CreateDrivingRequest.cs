using System.ComponentModel.DataAnnotations;

namespace Taxi.Api.Request.DrivingRequest
{
    public class CreateDrivingRequest
    {
        [Required]
        [StringLength(100)]
        public string StartAddress { get; set; }
        [Required]
        public string EndAddress { get; set; }
        
        [Required]
        public int UserId { get; set; }
       
    }
}
