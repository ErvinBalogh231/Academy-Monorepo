using Academy_2024.Models;

namespace Academy_2024.Repositories
{
    public interface ICourseRepository
    {
        Task CreateAsync(Course data);

        Task<bool> DeleteAsync(int id);

        Task<List<Course>> GetAllAsync();

        Task<Course?> GetByIdAsync(int id);

        Task UpdateAsync();
    }
}
