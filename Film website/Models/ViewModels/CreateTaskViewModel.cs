using System.ComponentModel.DataAnnotations;

namespace Film_website.Models.ViewModels
{
    public class CreateTaskViewModel
    {
        [Required]
        [StringLength(50)]
        public string TaskType { get; set; } // Replaced TaskType enum

        public int? TranslationId { get; set; }

        public int? AssignedTo { get; set; }

        [Required]
        public DateTime Deadline { get; set; }

        [StringLength(1000)]
        public string Notes { get; set; }

        [Range(1, 5)]
        public int Priority { get; set; } = 1;
    }
}
