using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Film_website.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            ViewBag.Message = "Chào mừng đến trang quản trị";
            return View();
        }

        public IActionResult Dashboard()
        {
            return View();
        }

        public IActionResult Translator()
        {
            ViewData["Title"] = "AI Translator - CineHub Admin";
            return View();
        }
    }
}
