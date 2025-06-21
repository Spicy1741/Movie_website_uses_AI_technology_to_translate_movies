using System.ComponentModel.DataAnnotations;

namespace Film_website.Models.ViewModels
{
    // User Login/Registration ViewModels
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Username is required")]
        [StringLength(50)]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}
