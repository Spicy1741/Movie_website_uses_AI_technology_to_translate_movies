using Film_website.Models;
using Film_website.Models.ViewModels;
using Film_website.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Film_website.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UserService> _logger;

        public UserService(IUserRepository userRepository, ILogger<UserService> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        public async Task<IdentityResult> RegisterUserAsync(RegisterViewModel model)
        {
            var user = new User
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                EmailConfirmed = true
            };

            var result = await _userRepository.CreateUserAsync(user, model.Password);

            if (result.Succeeded)
            {
                // Mặc định gán role "User" cho người đăng ký mới
                await _userRepository.AddToRoleAsync(user, "User");
                _logger.LogInformation($"Người dùng {model.Email} đăng ký thành công");
            }

            return result;
        }

        public async Task<SignInResult> LoginUserAsync(LoginViewModel model)
        {
            var result = await _userRepository.PasswordSignInAsync(model.Email, model.Password, model.RememberMe);

            if (result.Succeeded)
            {
                _logger.LogInformation($"Người dùng {model.Email} đăng nhập thành công");
            }

            return result;
        }

        public async Task LogoutUserAsync()
        {
            await _userRepository.SignOutAsync();
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _userRepository.FindByEmailAsync(email);
        }

        public async Task<IList<string>> GetUserRolesAsync(User user)
        {
            return await _userRepository.GetRolesAsync(user);
        }
    }
}