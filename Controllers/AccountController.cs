using Film_website.Models;
using Film_website.Models.ViewModels;
using Film_website.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

public class AccountController : Controller
{
    private readonly UserService _userService;
    private readonly ILogger<AccountController> _logger;

    public AccountController(UserService userService, ILogger<AccountController> logger)
    {
        _userService = userService;
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Register()
    {
        if (User.Identity?.IsAuthenticated == true)
        {
            return RedirectToAction("Index", "Movie");
        }
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(RegisterViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var result = await _userService.RegisterUserAsync(model);

        if (result.Succeeded)
        {
            TempData["SuccessMessage"] = "Đăng ký thành công! Vui lòng đăng nhập.";
            return RedirectToAction("Login");
        }

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(string.Empty, error.Description);
        }

        return View(model);
    }

    [HttpGet]
    public IActionResult Login()
    {
        if (User.Identity?.IsAuthenticated == true)
        {
            return RedirectToAction("Index", "Movie");
        }
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var result = await _userService.LoginUserAsync(model);

        if (result.Succeeded)
        {
            var user = await _userService.GetUserByEmailOrUserNameAsync(model.EmailOrUserName);
            if (user != null)
            {
                var roles = await _userService.GetUserRolesAsync(user);

                // Chuyển hướng dựa trên role
                if (roles.Contains("Admin"))
                {
                    return RedirectToAction("Index", "Admin");
                }
                else
                {
                    return RedirectToAction("Index", "Movie");
                }
            }
        }

        ModelState.AddModelError(string.Empty, "Email/tên người dùng hoặc mật khẩu không đúng.");
        return View(model);
    }

    [HttpPost]
    [Authorize]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Logout()
    {
        await _userService.LogoutUserAsync();
        return RedirectToAction("Index", "Movie");
    }

    [Authorize]
    public async Task<IActionResult> Profile()
    {
        var user = await _userService.GetUserByEmailOrUserNameAsync(User.Identity!.Name!);
        if (user == null)
        {
            return NotFound();
        }

        return View(user);
    }
}