using AutoMapper;
using System;
using Taxi.Core.Common.Interfaces.Services;
using Taxi.Core.Common.Interfaces.UnitOfWork;

using Taxi.Core.DTOs.DrivingDTOs;
using Taxi.Core.Models;

namespace Taxi.Api.Services
{
    public class DrivingService : IDrivingService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
       

        public DrivingService(IUnitOfWork uow, IMapper mapper) 
        {
            _uow = uow;
            _mapper = mapper;
           
        }

        public async Task<bool> Create(CreateDrivingDTO newDriving)
        {
            if (!await _uow.UserRepository.Check(u => u.Id == newDriving.UserId && u.Role == "User"))
                return false;
            var driving = _mapper.Map<Driving>(newDriving);
            
            driving.DriverId = -1;
            driving.Chat ="";
            Random random = new Random();
            driving.Price = random.Next(300, 600);
            int randomMinutes = random.Next(10, 20);
            driving.StartTime= DateTime.Now.AddHours(0).AddMinutes(randomMinutes);
            return await _uow.DrivingRepository.Create(driving);
        }
        public async Task<List<GetUsersDrivingsDTO>> GetUsersDrivings(int id)
        {

            var result = await _uow.DrivingRepository.GetUsersDrivings(id);
            var drivinds = _mapper.Map<List<GetUsersDrivingsDTO>>(result);
            return drivinds;

        }
        public async Task<bool> Accept(int id)
        {
            return await _uow.DrivingRepository.Accept(id);
            
        }
        public async Task<bool> DriverAccept(int DrivingId, int driverId)
        {
           bool result= await _uow.DrivingRepository.DriverAccept(DrivingId, driverId);
            return result;
        }
        public async Task<List<GetUsersDrivingsDTO>> GetDiviversDrivings()
        {
            var result = await _uow.DrivingRepository.GetDiviversDrivings();
            var drivinds = _mapper.Map<List<GetUsersDrivingsDTO>>(result);
            return drivinds;
        }
        public async Task<List<GetUsersDrivingsDTO>> GetAdminDrivings()
        {
            var result = await _uow.DrivingRepository.GetAdminDrivings();
            var drivinds = _mapper.Map<List<GetUsersDrivingsDTO>>(result);
            return drivinds;
        }

        public async Task<bool> RateIt(int id, int rating)
        {
            return await _uow.DrivingRepository.RateIt( id,  rating);
             
        }

        public async Task<string> GetChat(int id)
        {
            return await _uow.DrivingRepository.GetChat(id);
        }

        public async Task<string> AddChat(int id, string text)
        {
            return await _uow.DrivingRepository.AddChat(id,text);
        }
    }
}
