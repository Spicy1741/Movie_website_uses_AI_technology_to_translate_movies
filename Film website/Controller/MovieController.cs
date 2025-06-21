using Microsoft.AspNetCore.Mvc;

namespace YourApp.Controllers
{
    public class MovieController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Details(string id)
        {
            ViewBag.MovieId = id;
            return View();
        }

        public IActionResult Player(string id)
        {
            ViewBag.MovieId = id;
            return View();
        }
    }
}