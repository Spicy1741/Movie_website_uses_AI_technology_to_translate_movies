using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Film_website.Models
{
    public class UserSession
    {
        [Key]
        public int SessionId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

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
