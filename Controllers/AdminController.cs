using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Film_website.Models;
using Film_website.Services;
using System.Threading.Tasks;

namespace Film_website.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly MovieService _movieService;

        public AdminController(MovieService movieService)
        {
            _movieService = movieService;
        }

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

        public async Task<IActionResult> ManageMovies()
        {
            var movies = await _movieService.GetAllMoviesAsync();
            return View(movies);
        }

        [HttpGet]
        public IActionResult AddMovie()
        {
            return View(new Movie());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddMovie(Movie movie, IFormFile movieFile, IFormFile thumbnailFile)
        {
            if (!ModelState.IsValid)
            {
                // Ghi log các lỗi ModelState để debug
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                TempData["Error"] = "Invalid input: " + string.Join("; ", errors);
                return View(movie);
            }

            try
            {
                await _movieService.AddMovieAsync(movie, movieFile, thumbnailFile);
                TempData["Success"] = "Movie added successfully!";
                return RedirectToAction("ManageMovies");
            }
            catch (Exception ex)
            {
                TempData["Error"] = $"Error adding movie: {ex.Message}";
                return View(movie);
            }
        }

        [HttpGet]
        public async Task<IActionResult> EditMovie(int id)
        {
            var movie = await _movieService.GetMovieByIdAsync(id);
            if (movie == null)
                return NotFound();
            return View(movie);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditMovie(Movie movie, IFormFile movieFile, IFormFile thumbnailFile)
        {
            if (ModelState.IsValid)
            {
                await _movieService.UpdateMovieAsync(movie, movieFile, thumbnailFile);
                TempData["Success"] = "Movie updated successfully!";
                return RedirectToAction("ManageMovies");
            }
            return View(movie);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            await _movieService.DeleteMovieAsync(id);
            TempData["Success"] = "Movie deleted successfully!";
            return RedirectToAction("ManageMovies");
        }

        public async Task<IActionResult> ViewMovie(int id)
        {
            var movie = await _movieService.GetMovieByIdAsync(id);
            if (movie == null)
                return NotFound();
            return View(movie);
        }
    }
}