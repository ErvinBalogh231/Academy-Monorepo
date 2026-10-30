using Academy_2024.Data;
using Academy_2024.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Academy_2024.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BadgesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BadgesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET api/<BadgesController>
        [HttpGet]
        public Task<List<Badge>> Get() => _context.Badges.ToListAsync();

        // GET api/<BadgesController>/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Badge>> Get(int id)
        {
            var badge = await _context.Badges.FirstOrDefaultAsync(badge => badge.Id == id);

            return badge == null ? NotFound() : badge;
        }
    }
}
