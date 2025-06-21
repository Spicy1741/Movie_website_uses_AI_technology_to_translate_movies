using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class Task
{
    [Key]
    public int TaskId { get; set; }

    [StringLength(50)]
    public string TaskType { get; set; } // Replaced TaskType enum

    [ForeignKey("TranslationId")]
    public int? TranslationId { get; set; }

    [ForeignKey("AssignedTo")]
    public int? AssignedTo { get; set; }

    [StringLength(50)]
    public string Status { get; set; } // Replaced TaskStatus enum

    public DateTime Deadline { get; set; }

    public DateTime? CompletedAt { get; set; }

    [StringLength(1000)]
    public string Notes { get; set; }

    public int Priority { get; set; } = 1;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}