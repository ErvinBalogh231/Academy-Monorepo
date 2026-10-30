using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Academy_2024.Dtos
{
    public class UserDto
    {
        [Key]
        public int Id { get; set; }

        [StringLength(10)]
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        // Only accepted on input (required on create, optional on update), never sent back
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Password { get; set; }
    }
}
