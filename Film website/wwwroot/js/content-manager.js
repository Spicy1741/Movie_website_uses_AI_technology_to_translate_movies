// Global variables
let currentMovieToDelete = null;
const comicWords = ['POW!', 'BAM!', 'ZAP!', 'BOOM!', 'WHAM!', 'CRACK!', 'SMASH!', 'KAPOW!', 'THWACK!', 'ZOOM!'];

// Create comic elements
function createComicElements() {
    const container = document.getElementById('comicElements');

    for (let i = 0; i < 10; i++) {
        const element = document.createElement('div');
        element.className = 'pow-element';
        element.textContent = comicWords[Math.floor(Math.random() * comicWords.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 8 + 's';
        element.style.animationDuration = (Math.random() * 4 + 6) + 's';
        container.appendChild(element);
    }

    for (let i = 0; i < 8; i++) {
        const element = document.createElement('div');
        element.className = 'boom-element';
        element.textContent = ['BOOM!', 'BANG!', 'CRASH!'][Math.floor(Math.random() * 3)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 6 + 's';
        element.style.animationDuration = (Math.random() * 3 + 4) + 's';
        container.appendChild(element);
    }

    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.className = 'star-burst';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.animationDuration = (Math.random() * 2 + 3) + 's';
        container.appendChild(star);
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
        if (document.body.contains(burst)) {
            document.body.removeChild(burst);
        }
    }, 600);
}

// Navigation functions
function hideAllSections() {
    document.getElementById('addMovieSection').style.display = 'none';
    document.getElementById('deleteMovieSection').style.display = 'none';
    const reportSection = document.getElementById('reportSection');
    const commentSection = document.getElementById('commentSection');
    const contactSection = document.getElementById('contactSection');

    if (reportSection) reportSection.style.display = 'none';
    if (commentSection) commentSection.style.display = 'none';
    if (contactSection) contactSection.style.display = 'none';
}

function updateActiveNav(targetElement) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    targetElement.closest('.nav-item').classList.add('active');
}

function showAddMovie() {
    hideAllSections();
    document.getElementById('addMovieSection').style.display = 'block';
    document.getElementById('pageTitle').innerHTML = '🎬 Content Manager: Adding Movie 🎬';
    updateActiveNav(event.target);
    createComicBurst('➕');
}

function showDeleteManager() {
    hideAllSections();
    document.getElementById('deleteMovieSection').style.display = 'block';
    document.getElementById('pageTitle').innerHTML = '🗑️ Content Manager: Delete Movie 🗑️';
    updateActiveNav(event.target);
    createComicBurst('🗑️');
}

// Movie functions
function updatePreview() {
    const movieName = document.getElementById('movieName').value;
    const movieType = document.getElementById('movieType').value;
    const movieSummary = document.getElementById('movieSummary').value;
    const previewContent = document.getElementById('previewContent');

    if (movieName || movieType || movieSummary) {
        previewContent.innerHTML = `
            <div class="movie-preview-card">
                <h4>${movieName || 'Untitled Epic Movie'}</h4>
                <p class="preview-type">${movieType ? getTypeEmoji(movieType) + ' ' + movieType.toUpperCase() : 'Unknown Type'}</p>
                <p class="preview-summary">${movieSummary || 'No summary yet...'}</p>
            </div>
        `;
    } else {
        previewContent.innerHTML = `
            <div class="preview-placeholder">
                <span>⚡ Your EPIC movie preview will appear here! ⚡</span>
            </div>
        `;
    }
}

function getTypeEmoji(type) {
    const emojis = {
        'action': '💥', 'drama': '🎭', 'comedy': '😂', 'thriller': '⚡',
        'romance': '💕', 'sci-fi': '🚀', 'horror': '👻'
    };
    return emojis[type] || '🎬';
}

// Delete functions
function editMovie(movieId) {
    createComicBurst('✏️');
    alert(`✏️ EDITING ${movieId.toUpperCase()}! Feature coming soon! ✏️`);
}

function deleteMovie(movieId) {
    currentMovieToDelete = movieId;
    document.getElementById('deleteModal').style.display = 'flex';
    createComicBurst('⚠️');
}

function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
    currentMovieToDelete = null;
    createComicBurst('❌');
}

function confirmDelete() {
    if (currentMovieToDelete) {
        const rows = document.querySelectorAll('#moviesTableBody tr');
        rows.forEach(row => {
            const movieCell = row.cells[0].textContent.toLowerCase();
            if (movieCell.includes(currentMovieToDelete.replace('-', ' '))) {
                row.style.animation = 'comicExplosion 0.6s ease-out';
                setTimeout(() => row.remove(), 600);
            }
        });

        createComicBurst('💥');
        setTimeout(() => createComicBurst('🗑️'), 300);
        alert(`💥 ${currentMovieToDelete.toUpperCase()} HAS BEEN DELETED FROM THE HERO DATABASE! 💥`);
        closeDeleteModal();
    }
}

// Header functions
function showNotifications() {
    createComicBurst('🔔');
    alert('🔔 HERO NOTIFICATIONS: No new alerts from the Hero Database! 🔔');
}

function showUserProfile() {
    createComicBurst('👤');
    alert('👤 HERO PROFILE: Content Manager Supreme! 👤');
}

// Event listeners
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal')) {
        closeDeleteModal();
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeDeleteModal();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    createComicElements();
    updatePreview();

    document.getElementById('addMovieSection').style.display = 'block';

    ['movieName', 'movieType', 'movieSummary'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', updatePreview);
        }
    });

    setTimeout(() => createComicBurst('🎬'), 500);
});

// Add explosion CSS
const explosionStyle = document.createElement('style');
explosionStyle.textContent = `
    @keyframes comicExplosion {
        0% { transform: scale(1) rotate(0deg); opacity: 1; }
        50% { transform: scale(1.5) rotate(180deg); opacity: 0.7; }
        100% { transform: scale(2) rotate(360deg); opacity: 0; }
    }
    .comic-explosion { animation: comicExplosion 0.6s ease-out; }
`;
document.head.appendChild(explosionStyle);