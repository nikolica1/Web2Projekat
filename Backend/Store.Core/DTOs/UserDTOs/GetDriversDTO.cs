using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taxi.Core.DTOs.UserDTOs
{
    public class GetDriversDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public DateTime Birthday { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Picture { get; set; }
        public string Verification { get; set; }
    }
}
