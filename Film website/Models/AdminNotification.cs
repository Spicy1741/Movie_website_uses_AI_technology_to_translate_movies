using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Film_website.Models
{
    public class AdminNotification
    {
        [Key]
        public int NotificationId { get; set; }

        [ForeignKey("Admin")]
        public int AdminId { get; set; }

        [Required]
        [StringLength(50)]
        public string NotificationType { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        [Required]
        public string Message { get; set; }

        public bool IsRead { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? ReadAt { get; set; }

        [StringLength(50)]
        public string ReferenceType { get; set; }

        public int? ReferenceId { get; set; }

        // Navigation Properties
        public virtual Admin Admin { get; set; }
    }
}
