using Academy_2024.Dtos;
using Academy_2024.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Academy_2024.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        // GET api/<UsersController>
        [HttpGet]
        public async Task<IEnumerable<UserDto>> Get()
        {
            return await _userService.GetAllAsync();
        }

        // GET api/<UsersController>/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<UserDto>> Get(int id)
        {
            var user = await _userService.GetByIdAsync(id);

            return user == null ? NotFound() : user;
        }

        // GET api/<UsersController>/me
        [HttpGet("me")]
        public async Task<ActionResult<UserDto>> GetLoggedInUser()
        {
            // The JWT handler maps "sub" to NameIdentifier by default
            var id = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            if (!int.TryParse(id, out var userId))
            {
                return Unauthorized();
            }

            var user = await _userService.GetByIdAsync(userId);

            return user == null ? NotFound() : user;
        }

        // POST api/<UsersController>
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Post([FromBody] UserDto data)
        {
            if (string.IsNullOrEmpty(data.Password))
            {
                ModelState.AddModelError(nameof(UserDto.Password), "The Password field is required.");
                return ValidationProblem(ModelState);
            }

            if (await _userService.GetByEmailAsync(data.Email!) is not null)
            {
                return Conflict("A user with this email already exists.");
            }

            await _userService.CreateAsync(data);

            return NoContent();
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] UserDto data)
        {
            var existing = await _userService.GetByEmailAsync(data.Email!);
            if (existing is not null && existing.Id != id)
            {
                return Conflict("A user with this email already exists.");
            }

            var user = await _userService.UpdateAsync(id, data);

            return user == null ? NotFound() : NoContent();
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            return await _userService.DeleteAsync(id) ? NoContent() : NotFound();
        }
    }
}
