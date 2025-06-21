using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Film_website.Models
{
    public class AdminSession
    {
        [Key]
        public int SessionId { get; set; }

        [ForeignKey("Admin")]
        public int AdminId { get; set; }

        [Required]
        [StringLength(255)]
        public string SessionToken { get; set; }

        public DateTime LoginAt { get; set; } = DateTime.UtcNow;

        public DateTime? LogoutAt { get; set; }

        [StringLength(45)]
        public string IpAddress { get; set; }

        [StringLength(500)]
        public string UserAgent { get; set; }
    }
}
