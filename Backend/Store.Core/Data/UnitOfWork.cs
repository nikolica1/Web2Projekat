using Taxi.Core.Common.Interfaces.Repositories;
using Taxi.Core.Common.Interfaces.UnitOfWork;
using Taxi.Core.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Taxi.Core.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TaxiDataContext _context;

        public UnitOfWork(TaxiDataContext context)
        {
            _context = context;
        }

        public IUserRepository UserRepository => new UserRepository(_context);
        public IDrivingRepository DrivingRepository => new DrivingRepository(_context);
       
        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
