using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Film_website.Models
{
    public class AuditLog
    {
        [Key]
        public int AuditId { get; set; }

        [ForeignKey("User")]
        public int? UserId { get; set; }

        [Required]
        [StringLength(50)]
        public string ActionType { get; set; }

        [StringLength(100)]
        public string TableAffected { get; set; }

        public int? RecordId { get; set; }

        public string OldValues { get; set; }

        public string NewValues { get; set; }

        [StringLength(45)]
        public string IpAddress { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
