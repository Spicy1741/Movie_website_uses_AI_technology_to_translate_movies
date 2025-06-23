using Film_website.Models;
using Microsoft.AspNetCore.Identity;

namespace Film_website.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<IdentityResult> CreateUserAsync(User user, string password);
        Task<User?> FindByEmailAsync(string email);
        Task<SignInResult> PasswordSignInAsync(string email, string password, bool rememberMe);
        Task SignOutAsync();
        Task<IdentityResult> AddToRoleAsync(User user, string role);
        Task<IList<string>> GetRolesAsync(User user);
    }
}