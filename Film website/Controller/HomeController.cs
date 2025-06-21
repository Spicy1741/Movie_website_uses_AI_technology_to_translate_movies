using Microsoft.AspNetCore.Mvc;

namespace YourApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            // Redirect to Movie controller for main page
            return RedirectToAction("Index", "Movie");
        }

        public IActionResult Contact()
        {
            return View();
        }
    }
}