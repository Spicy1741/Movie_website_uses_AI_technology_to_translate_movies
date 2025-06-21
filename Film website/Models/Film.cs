using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Film_website.Models
{
    public class Film
    {
        [Key]
        public int FilmId { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        [StringLength(100)]
        public string Director { get; set; }

        [StringLength(50)]
        public string Genre { get; set; }

        [StringLength(1000)]
        public string Description { get; set; }

        public int DurationMinutes { get; set; }

        [StringLength(500)]
        public string FilePath { get; set; }

        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public bool IsActive { get; set; } = true;

        // Foreign Key
        [ForeignKey("UploadedBy")]
        public int UploadedBy { get; set; }
    }
}
