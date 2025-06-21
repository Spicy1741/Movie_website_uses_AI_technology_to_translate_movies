// Global variables
let currentSection = 'home';
let isDarkTheme = false;
let favoriteMovies = [];
let recentActivity = [];
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let userName = localStorage.getItem('userName') || 'User';

// Side Navigation functionality
function toggleSideNav() {
    const sideNav = document.getElementById('sideNav');
    const overlay = document.getElementById('sideNavOverlay');

    sideNav.classList.toggle('open');
    overlay.classList.toggle('active');
}

function closeSideNav() {
    const sideNav = document.getElementById('sideNav');
    const overlay = document.getElementById('sideNavOverlay');

    sideNav.classList.remove('open');
    overlay.classList.remove('active');
}

// Close side nav when clicking overlay
document.getElementById('sideNavOverlay').addEventListener('click', closeSideNav);

// Side navigation item click handlers
document.querySelectorAll('.side-nav-item[data-section]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = item.getAttribute('data-section');
        showSection(sectionId);
        closeSideNav();

        // Update active state in side nav
        document.querySelectorAll('.side-nav-item').forEach(navItem => {
            navItem.classList.remove('active');
        });
        item.classList.add('active');
    });
});

// Check login status on page load
function checkLoginStatus() {
    if (!isLoggedIn) {
        // Show auth modal on first visit
        setTimeout(() => {
            document.getElementById('authModal').classList.add('active');
        }, 1000);
    } else {
        // Update UI for logged in user
        updateUserInterface();
    }
}

function updateUserInterface() {
    // Update profile button to show user avatar
    const profileBtn = document.querySelector('.profile-btn');
    if (isLoggedIn) {
        profileBtn.innerHTML = '👤';
        profileBtn.style.background = 'linear-gradient(45deg, #1976d2, #ffd700)';
        profileBtn.style.color = '#fff';
    }

    // Update side nav user name
    const sideNavName = document.getElementById('sideNavName');
    if (sideNavName) {
        sideNavName.textContent = `Welcome, ${userName}`;
    }
}

// Navigation functionality
function goToMoviePage(movieId) {
    // Navigate to movie details page using ASP.NET Core routing
    window.location.href = `/Movie/Details?id=${movieId}`;
}

function watchMovie(movieId) {
    // Navigate to movie details page for watching
    window.location.href = `/Movie/Details?id=${movieId}`;
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    document.getElementById(sectionId).classList.add('active');

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[href="#${sectionId}"]`).classList.add('active');

    currentSection = sectionId;
}

// Add event listeners to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('href').substring(1);
        showSection(targetSection);
    });
});

// Search functionality
function toggleSearch() {
    const searchContainer = document.getElementById('searchContainer');
    searchContainer.classList.toggle('active');
}

// Theme toggle
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme', isDarkTheme);

    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.textContent = isDarkTheme ? '☀️' : '🌙';

    // Update side nav theme text
    const themeNavItem = document.querySelector('.side-nav-item[onclick="toggleTheme()"] .side-nav-text');
    if (themeNavItem) {
        themeNavItem.textContent = isDarkTheme ? 'Light Theme' : 'Dark Theme';
    }
}

// Add event listener after DOM loads
document.addEventListener('DOMContentLoaded', function () {
    createFloatingDust();
    checkLoginStatus();
    updateUserInterface();
});

// Auth modal functions
function showLoginForm() {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));

    event.target.classList.add('active');
    document.querySelector('.login-form').classList.add('active');
}

function showRegisterForm() {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));

    event.target.classList.add('active');
    document.querySelector('.register-form').classList.add('active');
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const username = form.querySelector('input[type="text"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (username && password) {
        // Simulate successful login
        isLoggedIn = true;
        userName = username;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', username);

        updateUserInterface();
        closeModal('authModal');
    }
}

// Handle registration
function handleRegister(event) {
    event.preventDefault();
    const form = event.target;
    const username = form.querySelector('input[type="text"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const email = form.querySelector('input[type="email"]').value;

    if (username && password && phone && email) {
        // Simulate successful registration
        isLoggedIn = true;
        userName = username;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', username);

        updateUserInterface();
        closeModal('authModal');
    }
}

// Profile actions
function changeAvatar() {
    alert('Change avatar functionality');
    closeModal('profileModal');
}

function changePassword() {
    alert('Change password functionality');
    closeModal('profileModal');
}

function logout() {
    isLoggedIn = false;
    userName = 'User';
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');

    // Reset profile button
    const profileBtn = document.querySelector('.profile-btn');
    profileBtn.innerHTML = '👤';
    profileBtn.style.background = '';
    profileBtn.style.color = '';

    // Reset side nav name
    const sideNavName = document.getElementById('sideNavName');
    if (sideNavName) {
        sideNavName.textContent = 'Welcome, User';
    }

    closeModal('profileModal');

    // Show login modal after logout
    setTimeout(() => {
        document.getElementById('authModal').classList.add('active');
    }, 500);
}

// Favorites functionality
function addToFavorites(button) {
    const movieCard = button.closest('.movie-card');
    const movieTitle = movieCard.querySelector('h3').textContent;

    if (button.textContent === '♡') {
        button.textContent = '♥';
        button.classList.add('favorited');
        favoriteMovies.push(movieTitle);

        // Add to favorites grid
        const favoritesGrid = document.getElementById('favoritesGrid');
        const newFavorite = document.createElement('div');
        newFavorite.className = 'movie-card favorite-item';
        newFavorite.innerHTML = `
            <div class="movie-poster">
                <div class="poster-placeholder">${movieTitle}</div>
            </div>
        `;
        favoritesGrid.appendChild(newFavorite);
    } else {
        button.textContent = '♡';
        button.classList.remove('favorited');
        favoriteMovies = favoriteMovies.filter(title => title !== movieTitle);
    }
}

// Recent activity
function showRecent() {
    const modal = document.getElementById('recentModal');
    modal.classList.add('active');

    // Populate recent movies
    const recentMoviesTable = document.getElementById('recentMoviesTable');
    recentMoviesTable.innerHTML = `
        <tr><td>Epic Masterpiece</td><td>2h 30m</td><td>2 hours ago</td></tr>
        <tr><td>Classic Legend</td><td>1h 45m</td><td>1 day ago</td></tr>
        <tr><td>Award Winner</td><td>2h 15m</td><td>3 days ago</td></tr>
    `;

    // Populate recent comments
    const recentCommentsList = document.getElementById('recentCommentsList');
    recentCommentsList.innerHTML = `
        <div class="comment-item">
            <div class="comment-avatar">You</div>
            <div class="comment-content">Great movie! Loved the cinematography.</div>
        </div>
        <div class="comment-item">
            <div class="comment-avatar">You</div>
            <div class="comment-content">Classic storytelling at its finest.</div>
        </div>
    `;
}

// Contact form
function submitContact(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Modal close functionality
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Search functionality
document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const movieCards = document.querySelectorAll('.movie-card');

    movieCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const isVisible = title.includes(searchTerm);
        card.style.display = isVisible ? 'block' : 'none';
    });
});

// Filter functionality
document.getElementById('categoryFilter').addEventListener('change', function () {
    const selectedCategory = this.value;
    const movieCards = document.querySelectorAll('.movie-card[data-category]');

    movieCards.forEach(card => {
        if (!selectedCategory || card.dataset.category === selectedCategory) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Add movie card click animations
document.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.cursor = 'pointer';
    });

    card.addEventListener('click', function (e) {
        // Only trigger if not clicking on buttons
        if (!e.target.closest('button')) {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 200);
        }
    });
});

// Initialize floating marble dust animation
function createFloatingDust() {
    const dustContainer = document.createElement('div');
    dustContainer.className = 'floating-dust';
    document.body.appendChild(dustContainer);

    // Create marble dust particles
    for (let i = 0; i < 80; i++) {
        const dust = document.createElement('div');
        dust.className = 'dust-particle';
        dust.style.left = Math.random() * 100 + '%';
        dust.style.animationDelay = Math.random() * 5 + 's';
        dust.style.animationDuration = (Math.random() * 4 + 3) + 's';
        dust.style.opacity = Math.random() * 0.8 + 0.2;
        dustContainer.appendChild(dust);
    }

    // Create larger glowing particles
    for (let i = 0; i < 30; i++) {
        const glow = document.createElement('div');
        glow.className = 'glow-particle';
        glow.style.left = Math.random() * 100 + '%';
        glow.style.animationDelay = Math.random() * 6 + 's';
        glow.style.animationDuration = (Math.random() * 5 + 4) + 's';
        dustContainer.appendChild(glow);
    }

    // Create floating sparkles
    for (let i = 0; i < 25; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-particle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 4 + 's';
        sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        dustContainer.appendChild(sparkle);
    }
}

// Profile functions
function editProfile() {
    alert('Edit Profile clicked');
}

function notificationSettings() {
    alert('Notification Settings clicked');
}

function privacySettings() {
    alert('Privacy Settings clicked');
}

function billingSettings() {
    alert('Billing Settings clicked');
}

// Profile modal
function toggleProfile() {
    if (isLoggedIn) {
        // Show user profile if logged in
        const modal = document.getElementById('profileModal');
        const profileInfo = modal.querySelector('.profile-info h3');
        profileInfo.textContent = `Hello ${userName}`;
        modal.classList.add('active');
    } else {
        // Show login modal if not logged in
        document.getElementById('authModal').classList.add('active');
    }
}

// Close side nav on window resize
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        closeSideNav();
    }
});

// Keyboard navigation for side nav
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeSideNav();
    }
});