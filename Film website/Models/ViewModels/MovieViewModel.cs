using System.ComponentModel.DataAnnotations;
using Film_website.Models;
namespace Film_website.Models.ViewModels
{
    public class MovieViewModel
    {
        public int FilmId { get; set; }
        public string Title { get; set; }
        public string Director { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public int DurationMinutes { get; set; }
        public DateTime UploadedAt { get; set; }
        public string UploaderName { get; set; }
        public List<TranslationInfo> AvailableTranslations { get; set; } = new List<TranslationInfo>();
    }

}
