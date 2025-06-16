// Global variables
let isDarkTheme = false;
let currentMovieId = '';
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let userName = localStorage.getItem('userName') || 'User';

// Movie data
const movieData = {
    'epic-masterpiece': {
        title: 'Epic Masterpiece',
        score: '9.2',
        categories: ['Action', 'Adventure', 'Drama'],
        summary: 'An epic tale of adventure, courage, and determination. This masterpiece takes you on a journey through stunning visuals and compelling storytelling that will keep you on the edge of your seat from beginning to end.',
        poster: 'Epic Masterpiece Poster'
    },
    'classic-legend': {
        title: 'Classic Legend',
        score: '9.0',
        categories: ['Drama', 'Romance', 'Classic'],
        summary: 'A timeless story that has captivated audiences for generations. This classic legend brings together romance, drama, and unforgettable characters in a beautifully crafted narrative.',
        poster: 'Classic Legend Poster'
    },
    'award-winner': {
        title: 'Award Winner',
        score: '8.9',
        categories: ['Drama', 'Biography', 'History'],
        summary: 'A critically acclaimed masterpiece that swept the awards season. This powerful drama tells an inspiring true story with exceptional performances and masterful direction.',
        poster: 'Award Winner Poster'
    },
    'action-thriller': {
        title: 'Action Thriller',
        score: '8.7',
        categories: ['Action', 'Thriller', 'Crime'],
        summary: 'Heart-pounding action meets psychological thriller in this edge-of-your-seat experience. Fast-paced sequences and mind-bending plot twists make this a must-watch.',
        poster: 'Action Thriller Poster'
    },
    'drama-story': {
        title: 'Drama Story',
        score: '8.5',
        categories: ['Drama', 'Family', 'Emotion'],
        summary: 'A deeply moving story about family, love, and redemption. This emotional drama explores the complexities of human relationships with sensitivity and grace.',
        poster: 'Drama Story Poster'
    },
    'comedy-hit': {
        title: 'Comedy Hit',
        score: '8.3',
        categories: ['Comedy', 'Romance', 'Feel-Good'],
        summary: 'Laugh out loud with this hilarious comedy that brings joy and warmth to your heart. Perfect blend of humor and romance that will leave you smiling.',
        poster: 'Comedy Hit Poster'
    },
    'thriller-mystery': {
        title: 'Thriller Mystery',
        score: '8.8',
        categories: ['Thriller', 'Mystery', 'Suspense'],
        summary: 'A mind-bending thriller that will keep you guessing until the very end. Mystery and suspense combine in this gripping tale of intrigue.',
        poster: 'Thriller Mystery Poster'
    },
    'action-adventure': {
        title: 'Action Adventure',
        score: '8.4',
        categories: ['Action', 'Adventure', 'Fantasy'],
        summary: 'An action-packed adventure through fantastical worlds. Epic battles and heroic journeys await in this thrilling escapade.',
        poster: 'Action Adventure Poster'
    },
    'drama-romance': {
        title: 'Drama Romance',
        score: '8.6',
        categories: ['Drama', 'Romance', 'Love'],
        summary: 'A heartwarming romance that explores the depths of love and connection. Beautiful storytelling meets passionate performances.',
        poster: 'Drama Romance Poster'
    }
};

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

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    loadMovieDetails();
    createFloatingDust();
    updateUserInterface();
});

function updateUserInterface() {
    // Update side nav user name
    const sideNavName = document.getElementById('sideNavName');
    if (sideNavName) {
        sideNavName.textContent = `Welcome, ${userName}`;
    }

    // Update profile button if logged in
    if (isLoggedIn) {
        const profileBtn = document.querySelector('.profile-btn');
        profileBtn.style.background = 'linear-gradient(45deg, #1976d2, #ffd700)';
        profileBtn.style.color = '#fff';
    }
}

// Load movie details based on URL parameter
function loadMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    currentMovieId = urlParams.get('id') || 'epic-masterpiece';

    const movie = movieData[currentMovieId];
    if (movie) {
        document.getElementById('movieTitle').textContent = movie.title;
        document.getElementById('movieScore').textContent = movie.score;
        document.getElementById('movieSummary').textContent = movie.summary;
        document.getElementById('posterPlaceholder').textContent = movie.poster;

        // Update categories
        const categoriesContainer = document.getElementById('movieCategories');
        categoriesContainer.innerHTML = '';
        movie.categories.forEach(category => {
            const tag = document.createElement('span');
            tag.className = 'category-tag';
            tag.textContent = category;
            categoriesContainer.appendChild(tag);
        });

        // Update page title
        document.title = `${movie.title} - CineHub`;
    }
}

// Navigation functions
function goHome() {
    window.location.href = '/Home/Index';
}

function toggleSearch() {
    const searchContainer = document.getElementById('searchContainer');
    searchContainer.classList.toggle('active');
}

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

function toggleProfile() {
    if (isLoggedIn) {
        // Show user profile if logged in
        const modal = document.getElementById('profileModal');
        const profileInfo = modal.querySelector('.profile-info h3');
        profileInfo.textContent = `Hello ${userName}`;
        modal.classList.add('active');
    } else {
        // Redirect to home page for login
        window.location.href = '/Home/Index';
    }
}

// Movie actions
function addToFavorites(button) {
    if (button.textContent === 'Favorite') {
        button.textContent = '♥ Favorited';
        button.style.background = 'linear-gradient(45deg, #ffd700, #1976d2)';
        alert('Added to favorites!');

        // Store in localStorage
        let favorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
        if (!favorites.includes(currentMovieId)) {
            favorites.push(currentMovieId);
            localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
        }
    } else {
        button.textContent = 'Favorite';
        button.style.background = '';
        alert('Removed from favorites!');

        // Remove from localStorage
        let favorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
        favorites = favorites.filter(id => id !== currentMovieId);
        localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
    }
}

function ignoreMovie() {
    alert('Movie ignored. It will not appear in your recommendations.');

    // Store ignored movies in localStorage
    let ignoredMovies = JSON.parse(localStorage.getItem('ignoredMovies') || '[]');
    if (!ignoredMovies.includes(currentMovieId)) {
        ignoredMovies.push(currentMovieId);
        localStorage.setItem('ignoredMovies', JSON.stringify(ignoredMovies));
    }
}

function watchMovie() {
    // Start watching movie immediately - could redirect to Watch action
    alert(`Starting to watch: ${movieData[currentMovieId]?.title || 'Unknown Movie'}`);

    // Store watch history
    let watchHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]');
    const watchEntry = {
        movieId: currentMovieId,
        title: movieData[currentMovieId]?.title,
        timestamp: new Date().toISOString()
    };

    // Remove existing entry if present and add to beginning
    watchHistory = watchHistory.filter(entry => entry.movieId !== currentMovieId);
    watchHistory.unshift(watchEntry);

    // Keep only last 50 entries
    watchHistory = watchHistory.slice(0, 50);
    localStorage.setItem('watchHistory', JSON.stringify(watchHistory));

    // In a real app, this would redirect to a video player
    // window.location.href = `/Movie/Watch?id=${currentMovieId}`;
}

function rateMovie() {
    const rating = prompt('Rate this movie (1-10):');
    if (rating && rating >= 1 && rating <= 10) {
        alert(`You rated this movie: ${rating}/10`);

        // Store rating in localStorage
        let movieRatings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
        movieRatings[currentMovieId] = {
            rating: parseFloat(rating),
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('movieRatings', JSON.stringify(movieRatings));
    } else if (rating !== null) {
        alert('Please enter a valid rating between 1 and 10.');
    }
}

// Comment functions
function addComment() {
    const commentText = document.getElementById('newComment').value.trim();
    if (commentText) {
        const commentsList = document.getElementById('commentsList');
        const newComment = document.createElement('div');
        newComment.className = 'comment-item';
        newComment.innerHTML = `
            <div class="comment-avatar">${userName}</div>
            <div class="comment-content">${commentText}</div>
        `;
        commentsList.appendChild(newComment);
        document.getElementById('newComment').value = '';

        // Store comment in localStorage
        let movieComments = JSON.parse(localStorage.getItem('movieComments') || '{}');
        if (!movieComments[currentMovieId]) {
            movieComments[currentMovieId] = [];
        }
        movieComments[currentMovieId].push({
            user: userName,
            comment: commentText,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('movieComments', JSON.stringify(movieComments));

        alert('Comment added successfully!');
    } else {
        alert('Please enter a comment before posting.');
    }
}

// Profile actions
function changeAvatar() {
    alert('Change avatar functionality - This would open an avatar selection dialog');
    closeModal('profileModal');
}

function changePassword() {
    alert('Change password functionality - This would open a password change form');
    closeModal('profileModal');
}

function logout() {
    isLoggedIn = false;
    userName = 'User';
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');

    closeModal('profileModal');

    // Redirect to home page
    window.location.href = '/Home/Index';
}

// Recent activity
function showRecent() {
    alert('Recent activity functionality - This would show your viewing history and recent comments');
    closeSideNav();
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

// Load user's favorite status for current movie
function loadFavoriteStatus() {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
    const favoriteBtn = document.querySelector('.movie-actions-detail .btn-primary');

    if (favorites.includes(currentMovieId) && favoriteBtn && favoriteBtn.textContent === 'Favorite') {
        favoriteBtn.textContent = '♥ Favorited';
        favoriteBtn.style.background = 'linear-gradient(45deg, #ffd700, #1976d2)';
    }
}

// Load user's comments for current movie
function loadUserComments() {
    const movieComments = JSON.parse(localStorage.getItem('movieComments') || '{}');
    const userComments = movieComments[currentMovieId] || [];

    if (userComments.length > 0) {
        const commentsList = document.getElementById('commentsList');
        userComments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment-item';
            commentElement.innerHTML = `
                <div class="comment-avatar">${comment.user}</div>
                <div class="comment-content">${comment.comment}</div>
            `;
            commentsList.appendChild(commentElement);
        });
    }
}

// Enhanced initialization
document.addEventListener('DOMContentLoaded', function () {
    loadMovieDetails();
    loadFavoriteStatus();
    loadUserComments();
    createFloatingDust();
    updateUserInterface();
});

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

// Enhanced search functionality for movie details page
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value.trim()) {
        const searchTerm = searchInput.value.trim();
        // Redirect to home page with search parameter
        window.location.href = `/Home/Index?search=${encodeURIComponent(searchTerm)}`;
    }
}

// Add enter key support for search
document.getElementById('searchInput')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});