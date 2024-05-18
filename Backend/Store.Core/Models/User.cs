using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taxi.Core.Models
{
    public class User
    {
        [Required]
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }
        [Required]
        [StringLength(100)]
        public string LastName { get; set; }
        [Required]
        [StringLength(100)]
        public string Username { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
        [Required]
        [StringLength(255)]
        public string Address { get; set; }
        [Required]
        public string Role { get; set; }
        [Required]
        public string Verification { get; set; }
        [Required]
        public byte[] Password { get; set; }
        [Required]
        public byte[] PasswordKey { get; set; }
        public string Picture { get; set; }

        public Boolean Block { get; set; }

        public List<Driving> Drivings { get; set; }
    }
}
