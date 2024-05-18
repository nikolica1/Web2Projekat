using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Docker.DotNet.Models;

namespace Taxi.Core.Models
{
    public class Driving
    {
        [Required]
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string StartAddress { get; set; }
        [Required]
        [StringLength(255)]
        public string EndAddress { get; set; }
        [Required]
         public float Price { get; set; }
        [Required]
        public DateTime StartTime { get; set; }
        [Required]
        public DateTime EndTime { get; set; }
        [Required]
        public int DriverId { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        public bool Accepted { get; set; }

        public float Rating { get; set; }

        public string Chat { get; set; }
    }
}
