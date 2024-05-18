using AutoMapper;

using Taxi.Api.Request.DrivingRequest;


using Taxi.Core.DTOs.DrivingDTOs;
using Taxi.Core.Models;

namespace Taxi.Api.Mapper
{
    public class DrivingsMappingProfile : Profile
    {
        public DrivingsMappingProfile()
        {
           
            CreateMap<CreateDrivingRequest, CreateDrivingDTO>();
            CreateMap<CreateDrivingDTO, Driving>();

        

           

         
           
            CreateMap<Driving, GetUsersDrivingsDTO>();
         
        }

    }
}
