using AutoMapper;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Taxi.Api.Request.UserRequest;

using Taxi.Api.Response.UserResponse;
using Taxi.Core.Common.Interfaces.Services;

using Taxi.Core.DTOs.UserDTOs;
using System.Threading.Channels;

namespace Taxi.Api.Controllers
{
    [Authorize]
    public class UserController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginUserRequest loginUser)
        {
            var login = _mapper.Map<LoginUserDTO>(loginUser);
            var response = await _userService.Login(login);

            if (response == null)
                return BadRequest("Invalid credentials");
            return Ok(response);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromForm] RegisterUserRequest newUser)
        {
            if (newUser.Birthday.Date > DateTime.Now.Date)
                return BadRequest("Date is older than current date");

            var register = _mapper.Map<RegisterUserDTO>(newUser);
            if (!await _userService.Register(register))
                return BadRequest("Invalid input");
            return Ok();
        }


        [HttpGet("details/{id}")]
        [Authorize(Roles = "User,Driver,Administrator")]
        public async Task<IActionResult> Details(int id)
        {
            if (id < 1)
                return BadRequest("Invalid ID provided");
            var result = await _userService.GetUserDetails(id);
            if (result == null)
                return BadRequest("User not found");
            var user = _mapper.Map<GetUserResponse>(result);
            return Ok(user);
        }

        [HttpPatch("update")]
        [Authorize(Roles = "User, Driver, Administrator")]
        public async Task<IActionResult> Update([FromForm] UpdateUserRequest updated)
        {

            if (updated.Birthday.Date > DateTime.Now.Date)
                return BadRequest("Date is older than current date");

            var user = _mapper.Map<UpdatedUserDTO>(updated);
            if (!await _userService.Update(user))
                return BadRequest("Invalid inputs");
            return Ok();
        }

        [HttpPatch("verify/{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> VerifyOrDeny(int id,VerifyOrDenyUserRequest verification)
        {
            if (id <= 0)
                return BadRequest("Invalid user id");
            if (!await _userService.VerifyOrDeny(id, verification.Action))
                return BadRequest("No users found with this id");
            return Ok();
        }

        [HttpGet("driver")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetDrivers()
        {
            var result = await _userService.GetDriver();
            if (result != null && result.Count == 0)
                return Ok(new List<GetDriversResponse>());
            var Driver = _mapper.Map<List<GetDriversResponse>>(result);
            return Ok(Driver);
        }


        [HttpGet("rating/{driverId}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetRating(int driverId)
        {
            var result = await _userService.GetRating(driverId);
        
                return Ok(result);
        }

        [HttpGet("block/{driverId}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> Block(int driverId)
        {
            var result = await _userService.Block(driverId);

            return Ok(result);
        }
    }
}
