using Film_website.Models;
using Microsoft.EntityFrameworkCore;

namespace Film_website.Data
{
    public class FilmWebsiteDbContext : DbContext
    {
        public FilmWebsiteDbContext(DbContextOptions<FilmWebsiteDbContext> options) : base(options)
        {
        }

        // User Tables
        public DbSet<User> Users { get; set; }
        public DbSet<UserSession> UserSessions { get; set; }

        // Admin Tables
        public DbSet<Admin> Admins { get; set; }
        public DbSet<AdminSession> AdminSessions { get; set; }
        public DbSet<AdminNotification> AdminNotifications { get; set; }
        public DbSet<SystemLog> SystemLogs { get; set; }

        // Film Tables
        public DbSet<Film> Films { get; set; }
        public DbSet<FilmPurchase> FilmPurchases { get; set; }

        // Translation Tables
        public DbSet<Translation> Translations { get; set; }
        public DbSet<TranslationPricing> TranslationPricing { get; set; }
        public DbSet<AITranslationLog> AITranslationLogs { get; set; }

        // Task Tables
        public DbSet<Task> Tasks { get; set; }

        // Notification Tables
        public DbSet<Notification> Notifications { get; set; }

        // Audit Tables
        public DbSet<AuditLog> AuditLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User Configurations
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Username).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
            });

            // Admin Configurations
            modelBuilder.Entity<Admin>(entity =>
            {
                entity.HasIndex(e => e.Username).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
            });

            // Film Configurations
            modelBuilder.Entity<Film>(entity =>
            {
                entity.HasIndex(f => f.UploadedBy);
                entity.HasOne<User>()
                      .WithMany()
                      .HasForeignKey(f => f.UploadedBy)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Translation Configurations
            modelBuilder.Entity<Translation>(entity =>
            {
                entity.HasIndex(t => t.FilmId);
                entity.HasOne<Film>()
                      .WithMany()
                      .HasForeignKey(t => t.FilmId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(t => t.CreatedBy);
                entity.HasOne<User>()
                      .WithMany()
                      .HasForeignKey(t => t.CreatedBy)
                      .OnDelete(DeleteBehavior.SetNull);

                entity.HasIndex(t => t.AssignedTranslator);
                entity.HasOne<User>()
                      .WithMany()
                      .HasForeignKey(t => t.AssignedTranslator)
                      .OnDelete(DeleteBehavior.SetNull);
            });

            // Task Configurations
            modelBuilder.Entity<Task>(entity =>
            {
                entity.HasIndex(t => t.AssignedTo);
                entity.HasOne<User>()
                      .WithMany()
                      .HasForeignKey(t => t.AssignedTo)
                      .OnDelete(DeleteBehavior.SetNull);

                entity.HasIndex(t => t.TranslationId);
                entity.HasOne<Translation>()
                      .WithMany()
                      .HasForeignKey(t => t.TranslationId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Seed Data
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // Seed Admin
            modelBuilder.Entity<Admin>().HasData(
                new Admin
                {
                    AdminId = 1,
                    Username = "admin",
                    Email = "admin@cinehub.com",
                    PasswordHash = "hashed_password", // Placeholder for hashed password
                    Role = "SystemAdmin", // Replaced AdminRole.SystemAdmin
                    FullName = "System Administrator",
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                }
            );

            // Seed Translation Pricing
            modelBuilder.Entity<TranslationPricing>().HasData(
                new TranslationPricing { PricingId = 1, SourceLanguage = "en", TargetLanguage = "es", BasePrice = 5.00m, PerMinutePrice = 0.50m, IsActive = true, CreatedAt = DateTime.UtcNow },
                new TranslationPricing { PricingId = 2, SourceLanguage = "en", TargetLanguage = "fr", BasePrice = 5.00m, PerMinutePrice = 0.50m, IsActive = true, CreatedAt = DateTime.UtcNow },
                new TranslationPricing { PricingId = 3, SourceLanguage = "en", TargetLanguage = "de", BasePrice = 6.00m, PerMinutePrice = 0.60m, IsActive = true, CreatedAt = DateTime.UtcNow }
            );
        }
    }
}