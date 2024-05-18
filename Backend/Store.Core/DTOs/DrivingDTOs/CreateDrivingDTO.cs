using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taxi.Core.DTOs.DrivingDTOs
{
    public class CreateDrivingDTO { 
        public string StartAddress { get; set; }
        public string EndAddress { get; set; }
        public int UserId { get; set; }
    }
}
