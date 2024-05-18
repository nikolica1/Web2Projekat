using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taxi.Core.DTOs.DrivingDTOs
{
    public class GetUsersDrivingsDTO
    {
        public int Id { get; set; }
        public string StartAddress { get; set; }
        public string EndAddress { get; set; }
        public float Price { get; set; }

        public bool Accepted { get; set; }
        public int DriverId { get; set; }
        public int UserId { get; set; }
        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

    }
}
