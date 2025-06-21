using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Film_website.Models
{
    public class SystemLog
    {
        [Key]
        public int LogId { get; set; }

        [ForeignKey("Admin")]
        public int? AdminId { get; set; }

        [Required]
        [StringLength(50)]
        public string LogLevel { get; set; }

        [Required]
        [StringLength(200)]
        public string Message { get; set; }

        public string Details { get; set; }

        [StringLength(100)]
        public string Source { get; set; }

        [StringLength(45)]
        public string IpAddress { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public virtual Admin Admin { get; set; }
    }
}
