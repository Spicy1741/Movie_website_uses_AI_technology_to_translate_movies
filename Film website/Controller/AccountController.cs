using Microsoft.AspNetCore.Mvc;

namespace YourApp.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Profile()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(string email, string password)
        {
            // Add your login logic here
            // For now, just redirect back to movie index
            return RedirectToAction("Index", "Movie");
        }

        public IActionResult Logout()
        {
            // Add your logout logic here
            return RedirectToAction("Index", "Movie");
        }
    }
}