using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Film_website.Models
{
    public class FilmPurchase
    {
        [Key]
        public int PurchaseId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [ForeignKey("Film")]
        public int FilmId { get; set; }

        [ForeignKey("Translation")]
        public int? TranslationId { get; set; }

        [ForeignKey("Payment")]
        public int PaymentId { get; set; }

        [Column(TypeName = "decimal(8,2)")]
        public decimal PricePaid { get; set; }

        public DateTime PurchasedAt { get; set; } = DateTime.UtcNow;

        public DateTime? AccessExpiresAt { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
