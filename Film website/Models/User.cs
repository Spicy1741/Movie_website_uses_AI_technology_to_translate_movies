using System.ComponentModel.DataAnnotations;

namespace Film_website.Models
{
        public class User
        {
            [Key]
            public int UserId { get; set; }

            [Required]
            [StringLength(50)]
            public string Username { get; set; }

            [Required]
            [EmailAddress]
            [StringLength(100)]
            public string Email { get; set; }

            [Required]
            [StringLength(255)]
            public string PasswordHash { get; set; }

            [Required]
            [StringLength(50)]
            public string Role { get; set; } // Values: "StandardUser", "ContentManager", "Translator"

            public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

            public DateTime? UpdatedAt { get; set; }

            public bool IsActive { get; set; } = true;

            // Navigation Properties
            public virtual ICollection<Translation> Translations { get; set; }
            public virtual ICollection<Task> AssignedTasks { get; set; }
            public virtual ICollection<Film> UploadedFilms { get; set; }
            public virtual ICollection<UserSession> UserSessions { get; set; }
            public virtual ICollection<FilmPurchase> FilmPurchases { get; set; }
            public virtual ICollection<Notification> Notifications { get; set; }
            public virtual ICollection<AuditLog> AuditLogs { get; set; }

            public User()
            {
                Translations = new HashSet<Translation>();
                AssignedTasks = new HashSet<Task>();
                UploadedFilms = new HashSet<Film>();
                UserSessions = new HashSet<UserSession>();
                FilmPurchases = new HashSet<FilmPurchase>();
                Notifications = new HashSet<Notification>();
                AuditLogs = new HashSet<AuditLog>();
            }
        }
    }
