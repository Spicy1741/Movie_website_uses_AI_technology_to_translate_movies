using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Film_website.Models
{
    public class AITranslationLog
    {
        [Key]
        public int LogId { get; set; }

        [ForeignKey("Translation")]
        public int TranslationId { get; set; }

        [Required]
        [StringLength(50)]
        public string AIServiceUsed { get; set; }

        public string InputText { get; set; }

        public string AIOutput { get; set; }

        [Column(TypeName = "decimal(5,4)")]
        public decimal? ConfidenceScore { get; set; }

        public int ProcessedAt { get; set; }

        public int ProcessingTimeMs { get; set; }

        [StringLength(50)]
        public string ModelVersion { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
