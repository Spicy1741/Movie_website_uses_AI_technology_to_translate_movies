using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Film_website.Models
{
    public class TranslationPricing
    {
        [Key]
        public int PricingId { get; set; }

        [Required]
        [StringLength(10)]
        public string SourceLanguage { get; set; }

        [Required]
        [StringLength(10)]
        public string TargetLanguage { get; set; }

        [Column(TypeName = "decimal(8,2)")]
        public decimal BasePrice { get; set; }

        [Column(TypeName = "decimal(5,2)")]
        public decimal PerMinutePrice { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }
    }
}
