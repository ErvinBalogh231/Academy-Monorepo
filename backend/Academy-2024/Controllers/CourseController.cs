using Academy_2024.Dtos;
using Academy_2024.Models;
using Academy_2024.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Academy_2024.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CourseController : ControllerBase
    {
        private readonly ICourseRepository _courseRepository;

        public CourseController(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        // GET: api/<CourseController>
        [HttpGet]
        public async Task<IEnumerable<CourseDto>> Get()
        {
            var courses = await _courseRepository.GetAllAsync();

            return courses.Select(MapToDto);
        }

        // GET api/<CourseController>/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<CourseDto>> Get(int id)
        {
            var course = await _courseRepository.GetByIdAsync(id);

            return course == null ? NotFound() : MapToDto(course);
        }

        // POST api/<CourseController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CourseDto toCreate)
        {
            await _courseRepository.CreateAsync(new Course { Title = toCreate.Title });

            return NoContent();
        }

        // PUT api/<CourseController>/5
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] CourseDto updateTo)
        {
            var course = await _courseRepository.GetByIdAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            course.Title = updateTo.Title;
            await _courseRepository.UpdateAsync();

            return NoContent();
        }

        // DELETE api/<CourseController>/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            return await _courseRepository.DeleteAsync(id) ? NoContent() : NotFound();
        }

        private static CourseDto MapToDto(Course course) => new()
            {
                Id = course.Id,
                Title = course.Title
            };
    }
}
