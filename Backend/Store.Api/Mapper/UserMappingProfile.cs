using AutoMapper;
using Taxi.Api.Request.UserRequest;
using Taxi.Api.Response.UserResponse;
using Taxi.Core.DTOs.UserDTOs;
using Taxi.Core.Models;

namespace Taxi.Api.Mapper
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile() 
        {
            CreateMap<LoginUserRequest, LoginUserDTO>();

            CreateMap<RegisterUserRequest, RegisterUserDTO>();
            CreateMap<RegisterUserDTO, User>()
                .ForMember(dest => dest.Password, opt => opt.Ignore())
                .ForMember(dest => dest.PasswordKey, opt => opt.Ignore());

            CreateMap<UpdateUserRequest, UpdatedUserDTO>();
            CreateMap<UpdatedUserDTO,User>()    
                .ForMember(dest => dest.Password, opt => opt.Ignore())
                .ForMember(dest => dest.PasswordKey, opt => opt.Ignore());
            CreateMap<User, GetDriversDTO>();
            CreateMap<User, GetUserDTO>();
            CreateMap<GetUserDTO, GetUserResponse>();
            CreateMap<GetDriversDTO, GetDriversResponse>();
        }
    }
}
