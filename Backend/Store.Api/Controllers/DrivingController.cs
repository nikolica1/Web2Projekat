using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Taxi.Api.Request.DrivingRequest;
using Taxi.Api.Request.UserRequest;


using Taxi.Api.Response.UserResponse;
using Taxi.Api.Services;
using Taxi.Core.Common.Interfaces.Services;

using Taxi.Core.DTOs.DrivingDTOs;

namespace Taxi.Api.Controllers
{
    public class DrivingController : BaseController
    {
        private readonly IDrivingService _drivingService;
        private readonly IMapper _mapper;

        public DrivingController(IDrivingService drivingService, IMapper mapper) 
        {
            _drivingService = drivingService;
            _mapper = mapper;
        }

        [HttpPost("create")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Create([FromForm] CreateDrivingRequest newDriving)
        {
            var driving = _mapper.Map<CreateDrivingDTO>(newDriving);
            var result = await _drivingService.Create(driving);
              
            return Ok(result);
        }
        [HttpGet("user/{id}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetUsersDrivings(int id)
        {
            var result = await _drivingService.GetUsersDrivings(id);
            return Ok(result);
        }

    

        [HttpGet("accept/{id}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Accept(int id)
        {
            var result = await _drivingService.Accept(id);
            return Ok(result);
        }
        [HttpGet("accept/{drivingId}/{driverId}")]
        [Authorize(Roles = "Driver")]
        public async Task<IActionResult> DriverAccept(int drivingId,int driverId)
        {
            var result = await _drivingService.DriverAccept(drivingId, driverId);
            return Ok(result);
        }

        [HttpGet("driver")]
        [Authorize(Roles = "Driver")]
        public async Task<IActionResult> GetDiviversDrivings()
        {
            var result = await _drivingService.GetDiviversDrivings();
            return Ok(result);
        }

        [HttpGet("admin")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetAdminDrivings()
        {
            var result = await _drivingService.GetAdminDrivings();
            return Ok(result);
        }


        [HttpGet("rate/{id}/{rating}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> RateIt(int id,int rating)
        {

            var result = await _drivingService.RateIt(id,rating);
            return Ok(result);
        }

        [HttpGet("chat/{id}")]
        [Authorize(Roles = "User, Driver")]
        public async Task<IActionResult> GetChat(int id)
        {
            var result = await _drivingService.GetChat(id);
            return Ok(result);
        }

        [HttpGet("addchat/{id}/{text}")]
        [Authorize(Roles = "User, Driver")]
        public async Task<IActionResult> AddChat(int id, string text)
        {
            var result = await _drivingService.AddChat(id,text);
            return Ok(result);
        }



    }
}
