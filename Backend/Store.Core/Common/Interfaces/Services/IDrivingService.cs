
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taxi.Core.DTOs.DrivingDTOs;

namespace Taxi.Core.Common.Interfaces.Services
{
    public interface IDrivingService
    {
        public Task<bool> Create(CreateDrivingDTO newDriving);
        public Task<List<GetUsersDrivingsDTO>> GetUsersDrivings(int id);
       public Task<bool> Accept(int id);
        public Task<bool> DriverAccept(int DrivingId,int driverId);
        public Task<List<GetUsersDrivingsDTO>> GetDiviversDrivings();
        public Task<List<GetUsersDrivingsDTO>> GetAdminDrivings();
        public Task<bool> RateIt(int id, int rating);

        public Task<string> GetChat(int id);

        public Task<string> AddChat(int id, string text);






    }
}
