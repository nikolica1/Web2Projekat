using Taxi.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Taxi.Core.Common.Interfaces.Repositories
{
    public interface IDrivingRepository
    {
        public Task<bool> Create(Driving article);
        public Task<List<Driving>> GetUsersDrivings(int id);
        public Task<bool> Accept(int id);
        public Task<bool> DriverAccept(int DrivingId, int driverId);
        public Task<List<Driving>> GetDiviversDrivings();

        public Task<List<Driving>> GetAdminDrivings();
        public Task<bool> RateIt(int id, int rating);
        public Task<string> GetChat(int id);
        public Task<string> AddChat(int id,string text);


    }
}
