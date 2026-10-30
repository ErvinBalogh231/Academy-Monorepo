using Academy_2024.Data;
using Academy_2024.Models;
using Microsoft.EntityFrameworkCore;

namespace Academy_2024.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly ApplicationDbContext _context;

        public CourseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<List<Course>> GetAllAsync() => _context.Courses.ToListAsync();

        public Task<Course?> GetByIdAsync(int id) => _context.Courses.FirstOrDefaultAsync(course => course.Id == id);

        public async Task CreateAsync(Course data)
        {
            await _context.Courses.AddAsync(data);
            await _context.SaveChangesAsync();
        }

        public Task UpdateAsync() => _context.SaveChangesAsync();

        public async Task<bool> DeleteAsync(int id)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(course => course.Id == id);
            if (course != null)
            {
                _context.Courses.Remove(course);
                await _context.SaveChangesAsync();

                return true;
            }

            return false;
        }
    }
}
