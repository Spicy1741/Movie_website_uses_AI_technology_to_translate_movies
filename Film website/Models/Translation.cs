using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Film_website.Models
{
    public class Translation
    {
        [Key]
        public int TranslationId { get; set; }

        [ForeignKey("Film")]
        public int FilmId { get; set; }

        [Required]
        [StringLength(10)]
        public string SourceLanguage { get; set; }

        [Required]
        [StringLength(10)]
        public string TargetLanguage { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "Pending"; // Values: "Pending", "InProgress", "UnderReview", "Completed", "Rejected"

        [ForeignKey("CreatedBy")]
        public int? CreatedBy { get; set; }

        [ForeignKey("AssignedTranslator")]
        public int? AssignedTranslator { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public DateTime? CompletedAt { get; set; }

        [StringLength(1000)]
        public string ReviewerNotes { get; set; }
    }
}
