// Global variables
let isDarkTheme = false;
let currentMovieId = '';
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let userName = localStorage.getItem('userName') || 'Hero';

// Comic book elements array
const comicWords = ['POW!', 'BAM!', 'ZAP!', 'BOOM!', 'WHAM!', 'CRACK!', 'SMASH!', 'KAPOW!', 'THWACK!', 'ZOOM!'];

// Movie data with comic book theme
const movieData = {
    'epic-masterpiece': {
        title: '🦸 EPIC MASTERPIECE 🦸',
        score: '9.2',
        categories: ['ACTION 💥', 'ADVENTURE ⚡', 'EPIC 🌟', 'HERO 🦸'],
        summary: 'The ultimate superhero saga! Watch as our legendary hero faces the greatest threat the universe has ever known! With mind-blowing action sequences, heart-stopping moments, and epic battles that will leave you speechless! This is the movie event of the century!',
        poster: '🦸 EPIC HERO POSTER 🦸'
    },
    'classic-legend': {
        title: '🌟 CLASSIC LEGEND 🌟',
        score: '9.0',
        categories: ['DRAMA 🎭', 'ROMANCE 💕', 'CLASSIC ⭐', 'LEGEND 🏆'],
        summary: 'A timeless story that has captured hearts for generations! This legendary tale brings together romance, drama, and unforgettable characters in a beautifully crafted narrative that will make you laugh, cry, and cheer!',
        poster: '🌟 LEGENDARY POSTER 🌟'
    },
    'award-winner': {
        title: '🏆 AWARD WINNER 🏆',
        score: '8.9',
        categories: ['DRAMA 🎭', 'BIOGRAPHY 📖', 'HISTORY 📚', 'AWARD 🏆'],
        summary: 'The critically acclaimed masterpiece that swept the awards season! This powerful drama tells an inspiring true story with exceptional performances and masterful direction that will move you to tears!',
        poster: '🏆 AWARD WINNING POSTER 🏆'
    },
    'action-thriller': {
        title: '💥 ACTION THRILLER 💥',
        score: '8.7',
        categories: ['ACTION 💥', 'THRILLER ⚡', 'CRIME 🕵️', 'INTENSE 🔥'],
        summary: 'Heart-pounding action meets psychological thriller in this edge-of-your-seat experience! Fast-paced sequences and mind-bending plot twists make this a must-watch adventure!',
        poster: '💥 THRILLER POSTER 💥'
    },
    'drama-story': {
        title: '🎭 DRAMA SAGA 🎭',
        score: '8.5',
        categories: ['DRAMA 🎭', 'FAMILY 👨‍👩‍👧‍👦', 'EMOTION 💗', 'TOUCHING 😢'],
        summary: 'A deeply moving story about family, love, and redemption. This emotional drama explores the complexities of human relationships with sensitivity and grace.',
        poster: '🎭 EMOTIONAL POSTER 🎭'
    },
    'comedy-hit': {
        title: '😂 COMEDY BLAST 😂',
        score: '8.3',
        categories: ['COMEDY 😂', 'ROMANCE 💕', 'FUN 🎉', 'LAUGHS 🤣'],
        summary: 'Laugh out loud with this hilarious comedy that brings joy and warmth to your heart! Perfect blend of humor and romance that will leave you smiling for days!',
        poster: '😂 FUNNY POSTER 😂'
    },
    'thriller-mystery': {
        title: '⚡ THRILLER MYSTERY ⚡',
        score: '8.8',
        categories: ['THRILLER ⚡', 'MYSTERY 🔍', 'SUSPENSE 😨', 'TWIST 🌀'],
        summary: 'A mind-bending thriller that will keep you guessing until the very end! Full of unexpected twists and shocking revelations that will blow your mind!',
        poster: '⚡ MYSTERY POSTER ⚡'
    }
};

// Initialize comic elements
function createComicElements() {
    const container = document.getElementById('comicElements');

    // Create floating comic words
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.className = 'pow-element';
        element.textContent = comicWords[Math.floor(Math.random() * comicWords.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 8 + 's';
        element.style.animationDuration = (Math.random() * 4 + 6) + 's';
        container.appendChild(element);
    }

    // Create boom elements
    for (let i = 0; i < 10; i++) {
        const element = document.createElement('div');
        element.className = 'boom-element';
        element.textContent = ['BOOM!', 'BANG!', 'CRASH!'][Math.floor(Math.random() * 3)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 6 + 's';
        element.style.animationDuration = (Math.random() * 3 + 4) + 's';
        container.appendChild(element);
    }

    // Create zap elements  
    for (let i = 0; i < 12; i++) {
        const element = document.createElement('div');
        element.className = 'zap-element';
        element.textContent = ['ZAP!', 'SPARK!', 'FLASH!'][Math.floor(Math.random() * 3)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 7 + 's';
        element.style.animationDuration = (Math.random() * 3 + 5) + 's';
        container.appendChild(element);
    }

    // Create star bursts
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'star-burst';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.animationDuration = (Math.random() * 2 + 3) + 's';
        container.appendChild(star);
    }

    // Create comic bubbles
    for (let i = 0; i < 8; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'comic-bubble';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDelay = Math.random() * 9 + 's';
        bubble.style.animationDuration = (Math.random() * 4 + 7) + 's';
        container.appendChild(bubble);
    }
}

// Create comic burst effect
function createComicBurst(emoji) {
    const burst = document.createElement('div');
    burst.style.position = 'fixed';
    burst.style.top = '50%';
    burst.style.left = '50%';
    burst.style.transform = 'translate(-50%, -50%)';
    burst.style.fontSize = '3rem';
    burst.style.zIndex = '9999';
    burst.style.pointerEvents = 'none';
    burst.textContent = emoji;
    burst.className = 'comic-explosion';
    document.body.appendChild(burst);

    setTimeout(() => {
        document.body.removeChild(burst);
    }, 600);
}

// Side Navigation functionality
function toggleSideNav() {
    const sideNav = document.getElementById('sideNav');
    const overlay = document.getElementById('sideNavOverlay');

    sideNav.classList.toggle('open');
    overlay.classList.toggle('active');
    createComicBurst('💥');
}

function closeSideNav() {
    const sideNav = document.getElementById('sideNav');
    const overlay = document.getElementById('sideNavOverlay');

    sideNav.classList.remove('open');
    overlay.classList.remove('active');
}

// Close side nav when clicking overlay
document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('sideNavOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeSideNav);
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    loadMovieDetails();
    createComicElements();
    updateUserInterface();
});

function updateUserInterface() {
    // Update side nav user name
    const sideNavName = document.getElementById('sideNavName');
    if (sideNavName) {
        sideNavName.textContent = `Welcome, ${userName}!`;
    }

    // Update profile button if logged in
    if (isLoggedIn) {
        const profileBtn = document.querySelector('.profile-btn');
        if (profileBtn) {
            profileBtn.style.background = 'linear-gradient(135deg, #ff6b35 0%, #ffff00 100%)';
            profileBtn.style.color = '#000';
        }
    }
}

// Load movie details based on URL parameter
function loadMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    currentMovieId = urlParams.get('id') || 'epic-masterpiece';

    const movie = movieData[currentMovieId];
    if (movie) {
        const movieTitle = document.getElementById('movieTitle');
        const movieScore = document.getElementById('movieScore');
        const movieSummary = document.getElementById('movieSummary');
        const posterPlaceholder = document.getElementById('posterPlaceholder');

        if (movieTitle) movieTitle.innerHTML = `🎭 ${movie.title} 🎭`;
        if (movieScore) movieScore.textContent = movie.score;
        if (movieSummary) movieSummary.textContent = movie.summary;
        if (posterPlaceholder) posterPlaceholder.innerHTML = movie.poster;

        // Update categories
        const categoriesContainer = document.getElementById('movieCategories');
        if (categoriesContainer) {
            categoriesContainer.innerHTML = '';
            movie.categories.forEach(category => {
                const tag = document.createElement('span');
                tag.className = 'category-tag';
                tag.innerHTML = category;
                categoriesContainer.appendChild(tag);
            });
        }
    }
}

// Navigation functions
function goHome() {
    createComicBurst('🏠');
    setTimeout(() => {
        window.location.href = '/Movie';
    }, 300);
}

function goToMoviePage(movieId) {
    createComicBurst('🎬');
    setTimeout(() => {
        window.location.href = `/Movie/Details?id=${movieId}`;
    }, 300);
}

function toggleSearch() {
    const searchContainer = document.getElementById('searchContainer');
    if (searchContainer) {
        searchContainer.classList.toggle('active');
        createComicBurst('🔍');
    }
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme', isDarkTheme);

    const themeBtn = document.querySelector('.theme-btn');
    if (themeBtn) {
        themeBtn.textContent = isDarkTheme ? '☀️' : '🌙';
    }

    // Update side nav theme text
    const themeNavItem = document.querySelector('.side-nav-item[onclick="toggleTheme()"] .side-nav-text');
    if (themeNavItem) {
        themeNavItem.textContent = isDarkTheme ? 'Light Mode' : 'Dark Mode';
    }

    createComicBurst(isDarkTheme ? '🌙' : '☀️');
}

function toggleProfile() {
    if (isLoggedIn) {
        // Show user profile if logged in
        const modal = document.getElementById('profileModal');
        if (modal) {
            const profileInfo = modal.querySelector('.profile-info h3');
            if (profileInfo) profileInfo.textContent = `Hello ${userName}`;
            modal.classList.add('active');
            createComicBurst('👤');
        }
    } else {
        // Redirect to home page for login
        createComicBurst('🔐');
        setTimeout(() => {
            window.location.href = '/Account/Login';
        }, 300);
    }
}

// Movie actions
function addToFavorites(button) {
    if (button.textContent.includes('ADD TO HERO')) {
        button.innerHTML = '💥 ADDED TO COLLECTION! 💥';
        button.style.background = 'linear-gradient(45deg, #ffd700, #ff6b35)';
        createComicBurst('❤️');
        screenShake();
        alert('🦸 MOVIE ADDED TO YOUR HERO COLLECTION! 🦸');
    } else {
        button.innerHTML = '💥 ADD TO HERO COLLECTION';
        button.style.background = '';
        createComicBurst('💔');
        alert('💔 REMOVED FROM HERO COLLECTION 💔');
    }
}

function ignoreMovie() {
    createComicBurst('❌');
    alert('🙈 MOVIE IGNORED! It has been banished from your recommendations! 🙈');
}

function watchMovie() {
    createComicBurst('🎬');
    screenShake();
    setTimeout(() => {
        createComicBurst('🍿');
    }, 200);
    setTimeout(() => {
        // Navigate to movie player page
        window.location.href = `/Movie/Player?id=${currentMovieId}`;
    }, 600);
}

function rateMovie() {
    createComicBurst('⭐');
    const rating = prompt('🌟 RATE THIS EPIC MOVIE (1-10): 🌟');
    if (rating && rating >= 1 && rating <= 10) {
        createComicBurst('🎉');
        alert(`💥 YOU RATED THIS EPIC MOVIE: ${rating}/10! 💥`);
        if (rating >= 9) {
            screenShake();
            setTimeout(() => createComicBurst('🏆'), 200);
        }
    }
}

// Trailer controls
function playAct(actNumber) {
    const actEmojis = { 1: '💥', 2: '⚡', 3: '🔥', 4: '🌟' };
    const actNames = { 1: 'OPENING SEQUENCE', 2: 'RISING ACTION', 3: 'CLIMAX BATTLE', 4: 'EPIC FINALE' };

    createComicBurst(actEmojis[actNumber]);

    // Update trailer placeholder
    const trailerPlaceholder = document.getElementById('trailerPlaceholder');
    if (trailerPlaceholder) {
        trailerPlaceholder.innerHTML = `🎬 PLAYING ACT ${actNumber}: ${actNames[actNumber]} 🎬`;
    }

    // Add visual feedback
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    alert(`🎬 NOW PLAYING: ACT ${actNumber} - ${actNames[actNumber]}! 🎬`);
}

// Comment functions
function addComment() {
    const commentText = document.getElementById('newComment');
    if (commentText && commentText.value.trim()) {
        const commentsList = document.getElementById('commentsList');
        if (commentsList) {
            const newComment = document.createElement('div');
            newComment.className = 'comment-item';
            newComment.innerHTML = `
                <div class="comment-avatar">YOU</div>
                <div class="comment-content">${commentText.value}</div>
            `;
            commentsList.insertBefore(newComment, commentsList.firstChild);
            commentText.value = '';
            createComicBurst('💬');
            alert('💥 YOUR EPIC REVIEW HAS BEEN POSTED! 💥');
        }
    } else {
        createComicBurst('❓');
        alert('🤔 PLEASE WRITE YOUR EPIC THOUGHTS FIRST! 🤔');
    }
}

// Profile actions
function changeAvatar() {
    createComicBurst('📸');
    alert('🦸 HERO AVATAR CHANGE ACTIVATED! 🦸');
    closeModal('profileModal');
}

function changePassword() {
    createComicBurst('🔒');
    alert('🔐 SECRET CODE CHANGE ACTIVATED! 🔐');
    closeModal('profileModal');
}

function logout() {
    isLoggedIn = false;
    userName = 'Hero';
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');

    closeModal('profileModal');
    createComicBurst('🚪');

    // Redirect to home page
    setTimeout(() => {
        window.location.href = '/Movie';
    }, 500);
}

// Recent activity
function showRecent() {
    createComicBurst('📊');
    alert('⚡ RECENT HERO ACTIVITY PANEL ACTIVATED! ⚡');
    closeSideNav();
}

// Modal close functionality
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Screen shake effect for dramatic moments
function screenShake() {
    document.body.style.animation = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.animation = 'screenShake 0.5s ease-in-out';
}

// Add CSS for screen shake
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes screenShake {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        10% { transform: translate(-2px, -1px) rotate(-1deg); }
        20% { transform: translate(-1px, 1px) rotate(1deg); }
        30% { transform: translate(2px, -1px) rotate(0deg); }
        40% { transform: translate(1px, 2px) rotate(1deg); }
        50% { transform: translate(-1px, 1px) rotate(-1deg); }
        60% { transform: translate(-2px, -1px) rotate(0deg); }
        70% { transform: translate(2px, -2px) rotate(-1deg); }
        80% { transform: translate(-1px, 1px) rotate(1deg); }
        90% { transform: translate(1px, -1px) rotate(0deg); }
    }
`;
document.head.appendChild(shakeStyle);

// Add comic sound effects (visual feedback)
function addComicSoundEffect(element, sound) {
    const soundDiv = document.createElement('div');
    soundDiv.textContent = sound;
    soundDiv.style.position = 'absolute';
    soundDiv.style.top = '-30px';
    soundDiv.style.left = '50%';
    soundDiv.style.transform = 'translateX(-50%)';
    soundDiv.style.color = '#ff6b35';
    soundDiv.style.fontWeight = 'bold';
    soundDiv.style.fontSize = '1.2rem';
    soundDiv.style.textShadow = '2px 2px 0 #000';
    soundDiv.style.animation = 'powEffect 0.5s ease-out';
    soundDiv.style.pointerEvents = 'none';
    soundDiv.style.zIndex = '1000';

    element.style.position = 'relative';
    element.appendChild(soundDiv);

    setTimeout(() => {
        if (soundDiv.parentNode) {
            soundDiv.parentNode.removeChild(soundDiv);
        }
    }, 500);
}

// Add sound effects to buttons
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-primary')) {
        addComicSoundEffect(e.target, 'POW!');
    } else if (e.target.classList.contains('btn-secondary')) {
        addComicSoundEffect(e.target, 'ZAP!');
    } else if (e.target.classList.contains('control-btn')) {
        addComicSoundEffect(e.target, 'BOOM!');
    } else if (e.target.classList.contains('fab')) {
        addComicSoundEffect(e.target, 'WHAM!');
    } else if (e.target.classList.contains('recommendation-item')) {
        addComicSoundEffect(e.target, 'CLICK!');
    }
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
        // Close any open modals
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// Add parallax effect to comic elements
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const comicElements = document.querySelectorAll('.comic-elements > *');

    comicElements.forEach((element, index) => {
        const speed = 0.5 + (index % 3) * 0.1;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add random comic elements periodically
setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance every interval
        const container = document.getElementById('comicElements');
        if (container) {
            const randomWord = comicWords[Math.floor(Math.random() * comicWords.length)];

            const element = document.createElement('div');
            element.className = 'pow-element';
            element.textContent = randomWord;
            element.style.left = Math.random() * 100 + '%';
            element.style.animationDuration = '6s';
            container.appendChild(element);

            // Remove after animation
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }, 6000);
        }
    }
}, 3000);

// Add hover effects to comment items
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.comment-item').forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px) rotate(1deg)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
});

// Initialize everything when page loads
window.addEventListener('load', function () {
    // Add initial comic burst
    setTimeout(() => {
        createComicBurst('🎬');
    }, 500);

    // Add epic movie intro effect
    setTimeout(() => {
        createComicBurst('🦸');
    }, 1000);

    setTimeout(() => {
        createComicBurst('✨');
    }, 1500);
});