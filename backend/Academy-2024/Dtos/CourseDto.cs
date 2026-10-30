using System.ComponentModel.DataAnnotations;

namespace Academy_2024.Dtos
{
    public class CourseDto
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;
    }
}
