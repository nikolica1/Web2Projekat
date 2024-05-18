using Microsoft.EntityFrameworkCore;
using Taxi.Core.Common.Interfaces.Repositories;
using Taxi.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Docker.DotNet.Models;

namespace Taxi.Core.Data.Repositories
{
    public class DrivingRepository : IDrivingRepository
    {
        private readonly TaxiDataContext _data;

        public DrivingRepository(TaxiDataContext data)
        {
            _data = data;
        }

        public async Task<List<Driving>> GetUsersDrivings(int id)
        {
            return await _data.Drivings.Where(a => a.UserId == id).ToListAsync();
        }
        public async Task<bool> Create(Driving driving)
        {
            Driving driving1 = await _data.Drivings.FirstOrDefaultAsync(o => o.UserId == driving.UserId &&
            o.Accepted == true && o.StartTime > DateTime.Now && o.DriverId == -1);

            Driving driving2 = await _data.Drivings.FirstOrDefaultAsync(o => o.UserId == driving.UserId &&
          o.Accepted == true && o.EndTime > DateTime.Now && o.DriverId != -1);

            if (driving1 == null && driving2==null)
            {
                _data.Drivings.Add(driving);
                await _data.SaveChangesAsync();
                return true;

            }
            return false;


        }
        

        public async Task<bool> Accept(int id){
            
            Driving driving = await _data.Drivings.FirstOrDefaultAsync(o => o.Id == id);


            Driving driving1 = await _data.Drivings.FirstOrDefaultAsync(o => o.UserId == driving.UserId &&
          o.Accepted == true && o.StartTime > DateTime.Now && o.DriverId == -1);

            Driving driving2 = await _data.Drivings.FirstOrDefaultAsync(o => o.UserId == driving.UserId &&
       o.Accepted == true && o.EndTime > DateTime.Now && o.DriverId != -1);
           

                if (driving1 == null && driving2 == null)
                {
                    driving.Accepted = true;
                    await _data.SaveChangesAsync();
                    return true;
                }
            

            return false;
        }
        public async Task<bool> DriverAccept(int DrivingId, int driverId)
        {
            var user = await _data.Users.SingleOrDefaultAsync(x => x.Id == driverId);
            if (user.Block == false)
            {
                Driving driving = await _data.Drivings.FirstOrDefaultAsync(o => o.Id == DrivingId);

                Driving driving2 = await _data.Drivings.FirstOrDefaultAsync(o => o.DriverId == driverId &&
      o.Accepted == true && o.EndTime > DateTime.Now );

                if (driving2 == null)
                {

                    if (driving != null)
                    {
                        driving.DriverId = driverId;
                        Random random = new Random();
                        int randomMinutes = random.Next(30, 40);
                        driving.EndTime = DateTime.Now.AddHours(0).AddMinutes(randomMinutes);
                        await _data.SaveChangesAsync();
                        return true;
                    }
                }
            }
            return false;
        }

        public async Task<List<Driving>> GetDiviversDrivings()
        {
             return await _data.Drivings.Where(a => a.Accepted == true).ToListAsync();
        }
        public async Task<List<Driving>> GetAdminDrivings()
        {
            return await _data.Drivings.ToListAsync();
        }

        public async Task<bool> RateIt(int id, int rating)
        {
            Driving driving = await _data.Drivings.FirstOrDefaultAsync(o => o.Id == id);

            Driving driving1 = await _data.Drivings.FirstOrDefaultAsync(o => o.UserId == driving.UserId &&
         o.Accepted == true && o.StartTime > DateTime.Now && o.DriverId == -1);

            Driving driving2 = await _data.Drivings.FirstOrDefaultAsync(o => o.UserId == driving.UserId &&
       o.Accepted == true && o.EndTime > DateTime.Now && o.DriverId != -1);


            if (driving1 == null && driving2 == null)
            {
                if (driving != null)
                {
                    driving.Rating = rating;
                    await _data.SaveChangesAsync();
                    return true;
                }
            }
            return false;
        }

        public async Task<string> GetChat(int id)
        {
            Driving driving = await _data.Drivings.FirstOrDefaultAsync(o => o.Id == id);

            return driving.Chat;

        }

        public async  Task<string> AddChat(int id, string text)
        {
            Driving driving = await _data.Drivings.FirstOrDefaultAsync(o => o.Id == id);

            driving.Chat += text;
            await _data.SaveChangesAsync();

            return driving.Chat.ToString(); 
        }
    }
}
