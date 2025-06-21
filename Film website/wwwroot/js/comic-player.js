// Global variables
let isDarkTheme = false;
let isPlaying = false;
let isMuted = false;
let currentMovieId = '';
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let userName = localStorage.getItem('userName') || 'Hero';
let currentTime = 0;
let totalTime = 155 * 60; // 2:35:00 in seconds
let playbackInterval;

// Comic book elements array
const comicWords = ['POW!', 'BAM!', 'ZAP!', 'BOOM!', 'WHAM!', 'CRACK!', 'SMASH!', 'KAPOW!', 'THWACK!', 'ZOOM!'];

// Movie data
const movieData = {
    'epic-masterpiece': {
        title: '?? EPIC MASTERPIECE ??',
        score: '9.2',
        categories: ['ACTION ??', 'ADVENTURE ?', 'EPIC ??'],
        description: '?? AN EPIC TALE OF HEROES, VILLAINS, AND LEGENDARY BATTLES! This masterpiece takes you on an incredible journey through stunning visuals and heart-pounding action that will keep you on the edge of your seat from beginning to end! ??',
        duration: '2:35:00'
    },
    'classic-legend': {
        title: '?? CLASSIC LEGEND ??',
        score: '9.0',
        categories: ['DRAMA ??', 'ROMANCE ??', 'CLASSIC ?'],
        description: '?? A timeless story that has captured hearts for generations! This legendary tale brings together romance, drama, and unforgettable characters! ??',
        duration: '2:12:00'
    },
    'award-winner': {
        title: '?? AWARD WINNER ??',
        score: '8.9',
        categories: ['DRAMA ??', 'BIOGRAPHY ??', 'HISTORY ??'],
        description: '?? A critically acclaimed masterpiece that swept the awards season! This powerful drama tells an inspiring true story! ??',
        duration: '2:28:00'
    }
};

// Initialize comic elements
function createComicElements() {
    const container = document.getElementById('comicElements');

    // Create floating comic words
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'pow-element';
        element.textContent = comicWords[Math.floor(Math.random() * comicWords.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 8 + 's';
        element.style.animationDuration = (Math.random() * 4 + 6) + 's';
        container.appendChild(element);
    }

    // Create boom elements
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.className = 'boom-element';
        element.textContent = ['BOOM!', 'BANG!', 'CRASH!'][Math.floor(Math.random() * 3)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 6 + 's';
        element.style.animationDuration = (Math.random() * 3 + 4) + 's';
        container.appendChild(element);
    }

    // Create zap elements
    for (let i = 0; i < 18; i++) {
        const element = document.createElement('div');
        element.className = 'zap-element';
        element.textContent = ['ZAP!', 'SPARK!', 'FLASH!'][Math.floor(Math.random() * 3)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 7 + 's';
        element.style.animationDuration = (Math.random() * 3 + 5) + 's';
        container.appendChild(element);
    }

    // Create star bursts
    for (let i = 0; i < 25; i++) {
        const star = document.createElement('div');
        star.className = 'star-burst';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.animationDuration = (Math.random() * 2 + 3) + 's';
        container.appendChild(star);
    }

    // Create comic bubbles
    for (let i = 0; i < 12; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'comic-bubble';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDelay = Math.random() * 9 + 's';
        bubble.style.animationDuration = (Math.random() * 4 + 7) + 's';
        container.appendChild(bubble);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    loadMovieData();
    createComicElements();
    updateUserInterface();
    initializeVideoPlayer();
});

function loadMovieData() {
    const urlParams = new URLSearchParams(window.location.search);
    currentMovieId = urlParams.get('id') || 'epic-masterpiece';

    const movie = movieData[currentMovieId];
    if (movie) {
        const movieTitle = document.getElementById('movieTitle');
        const videoTitle = document.getElementById('videoTitle');
        const movieScore = document.getElementById('movieScore');
        const movieDescription = document.getElementById('movieDescription');
        const totalTimeEl = document.getElementById('totalTime');

        if (movieTitle) movieTitle.innerHTML = movie.title;
        if (videoTitle) videoTitle.innerHTML = movie.title;
        if (movieScore) movieScore.textContent = movie.score;
        if (movieDescription) movieDescription.innerHTML = movie.description;
        if (totalTimeEl) totalTimeEl.textContent = movie.duration;

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

// Video Player Functions
function initializeVideoPlayer() {
    updateTimeDisplay();

    // Act buttons functionality
    document.querySelectorAll('.act-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const act = btn.getAttribute('data-act');
            jumpToAct(act);

            // Update active act button
            document.querySelectorAll('.act-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            createComicBurst(['??', '?', '??', '??'][act - 1]);
        });
    });

    // Progress bar click
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            currentTime = percentage * totalTime;
            updateProgress();
            updateTimeDisplay();
            createComicBurst('?');
        });
    }

    // Volume slider
    const volumeSlider = document.getElementById('volumeSlider');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value;
            updateVolumeDisplay(volume);
        });
    }
}

function togglePlay() {
    isPlaying = !isPlaying;
    const playBtn = document.getElementById('playBtn');
    const videoOverlay = document.getElementById('videoOverlay');

    if (playBtn && videoOverlay) {
        if (isPlaying) {
            playBtn.textContent = '?';
            videoOverlay.style.opacity = '0';
            startPlayback();
            createComicBurst('??');
            screenShake();
        } else {
            playBtn.textContent = '?';
            videoOverlay.style.opacity = '1';
            stopPlayback();
            createComicBurst('?');
        }
    }
}

function startPlayback() {
    playbackInterval = setInterval(() => {
        currentTime += 1;
        if (currentTime >= totalTime) {
            currentTime = totalTime;
            togglePlay(); // Stop when movie ends
            createComicBurst('??');
            alert('?? EPIC MOVIE COMPLETED! What a LEGENDARY adventure! ??');
        }
        updateProgress();
        updateTimeDisplay();
    }, 1000);
}

function stopPlayback() {
    if (playbackInterval) {
        clearInterval(playbackInterval);
    }
}

function skipBackward() {
    currentTime = Math.max(0, currentTime - 10);
    updateProgress();
    updateTimeDisplay();
    createComicBurst('?');
}

function skipForward() {
    currentTime = Math.min(totalTime, currentTime + 10);
    updateProgress();
    updateTimeDisplay();
    createComicBurst('?');
}

function jumpToAct(actNumber) {
    const actTimes = {
        '1': 0,
        '2': totalTime * 0.25,
        '3': totalTime * 0.5,
        '4': totalTime * 0.75
    };

    const actNames = {
        '1': 'OPENING SEQUENCE',
        '2': 'RISING ACTION',
        '3': 'CLIMAX BATTLE',
        '4': 'EPIC FINALE'
    };

    currentTime = actTimes[actNumber] || 0;
    updateProgress();
    updateTimeDisplay();

    alert(`?? JUMPING TO ${actNames[actNumber]}! ??`);
}

function updateProgress() {
    const percentage = (currentTime / totalTime) * 100;
    const progressFill = document.getElementById('progressFill');
    const progressHandle = document.getElementById('progressHandle');

    if (progressFill) progressFill.style.width = percentage + '%';
    if (progressHandle) progressHandle.style.left = percentage + '%';
}

function updateTimeDisplay() {
    const currentTimeEl = document.getElementById('currentTime');
    if (currentTimeEl) {
        currentTimeEl.textContent = formatTime(currentTime);
    }
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function toggleMute() {
    isMuted = !isMuted;
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeSlider = document.getElementById('volumeSlider');

    if (volumeBtn && volumeSlider) {
        if (isMuted) {
            volumeBtn.textContent = '??';
            volumeSlider.value = 0;
            createComicBurst('??');
        } else {
            volumeBtn.textContent = '??';
            volumeSlider.value = 70;
            createComicBurst('??');
        }
        updateVolumeDisplay(volumeSlider.value);
    }
}

function updateVolumeDisplay(volume) {
    const volumeBtn = document.getElementById('volumeBtn');
    if (volumeBtn) {
        if (volume == 0) {
            volumeBtn.textContent = '??';
            isMuted = true;
        } else if (volume < 50) {
            volumeBtn.textContent = '??';
            isMuted = false;
        } else {
            volumeBtn.textContent = '??';
            isMuted = false;
        }
    }
}

function toggleCaptions() {
    const ccBtn = event.target;
    ccBtn.classList.toggle('active');
    if (ccBtn.classList.contains('active')) {
        ccBtn.style.background = 'linear-gradient(45deg, #ff6b35, #ffff00)';
        ccBtn.style.color = '#000';
        createComicBurst('??');
        alert('?? HERO CAPTIONS ACTIVATED! ??');
    } else {
        ccBtn.style.background = '';
        ccBtn.style.color = '';
        createComicBurst('?');
        alert('? CAPTIONS DEACTIVATED! ?');
    }
}

function changeQuality() {
    const qualityBtn = event.target;
    const qualities = ['?? HD', '?? 4K', '?? SD'];
    const currentIndex = qualities.findIndex(q => qualityBtn.innerHTML.includes(q.split(' ')[1]));
    const nextIndex = (currentIndex + 1) % qualities.length;
    qualityBtn.innerHTML = qualities[nextIndex];
    createComicBurst('??');
    alert(`?? QUALITY CHANGED TO ${qualities[nextIndex]}! ??`);
}

function toggleFullscreen() {
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer) {
        if (!document.fullscreenElement) {
            videoPlayer.requestFullscreen().catch(err => {
                console.log('Fullscreen error:', err);
            });
            createComicBurst('??');
            alert('?? ENTERING EPIC FULLSCREEN MODE! ??');
        } else {
            document.exitFullscreen();
            createComicBurst('??');
            alert('?? EXITING FULLSCREEN MODE! ??');
        }
    }
}

// Comment Functions
function addComment() {
    const commentText = document.getElementById('newComment');
    if (commentText && commentText.value.trim() && isLoggedIn) {
        const commentsList = document.getElementById('commentsList');
        if (commentsList) {
            const newComment = document.createElement('div');
            newComment.className = 'comment-item';
            newComment.innerHTML = `
                <div class="comment-header">
                    <div class="comment-avatar">${userName.substring(0, 2).toUpperCase()}</div>
                    <div class="comment-info">
                        <div class="comment-author">${userName}</div>
                        <div class="comment-time">Just now</div>
                    </div>
                </div>
                <div class="comment-content">${commentText.value}</div>
                <div class="comment-actions-inline">
                    <button class="comment-action-btn" onclick="likeComment(this)">?? 0</button>
                    <button class="comment-action-btn" onclick="replyComment(this)">? Reply</button>
                </div>
            `;
            commentsList.insertBefore(newComment, commentsList.firstChild);
            commentText.value = '';

            // Update comment count
            const commentCount = document.querySelector('.comment-count');
            if (commentCount) {
                const currentCount = parseInt(commentCount.textContent.match(/\d+/)[0]);
                commentCount.textContent = `(${currentCount + 1})`;
            }

            createComicBurst('??');
            screenShake();
            alert('?? YOUR EPIC REVIEW HAS BEEN POSTED! ??');
        }
    } else if (!isLoggedIn) {
        const profileModal = document.getElementById('profileModal');
        if (profileModal) {
            profileModal.classList.add('active');
            createComicBurst('??');
        }
    }
}

function cancelComment() {
    const commentText = document.getElementById('newComment');
    if (commentText) {
        commentText.value = '';
    }
    createComicBurst('?');
}

function likeComment(button) {
    button.classList.toggle('liked');
    const currentLikes = parseInt(button.textContent.match(/\d+/)[0]);
    const newLikes = button.classList.contains('liked') ? currentLikes + 1 : currentLikes - 1;
    button.innerHTML = `?? ${newLikes}`;
    createComicBurst(button.classList.contains('liked') ? '??' : '??');
}

function replyComment(button) {
    const commentItem = button.closest('.comment-item');
    const author = commentItem.querySelector('.comment-author').textContent;
    const commentInput = document.getElementById('newComment');
    if (commentInput) {
        commentInput.value = `@${author} `;
        commentInput.focus();
    }
    createComicBurst('?');
}

function loadMoreComments() {
    // Simulate loading more comments
    const commentsList = document.getElementById('commentsList');
    if (commentsList) {
        const newComment = document.createElement('div');
        newComment.className = 'comment-item';
        newComment.innerHTML = `
            <div class="comment-header">
                <div class="comment-avatar">NM</div>
                <div class="comment-info">
                    <div class="comment-author">New Member</div>
                    <div class="comment-time">3 days ago</div>
                </div>
            </div>
            <div class="comment-content">?? Just discovered this EPIC movie and I'm blown away! The storytelling is INCREDIBLE! Can't believe I missed this MASTERPIECE! ??????</div>
            <div class="comment-actions-inline">
                <button class="comment-action-btn" onclick="likeComment(this)">?? 15</button>
                <button class="comment-action-btn" onclick="replyComment(this)">? Reply</button>
            </div>
        `;
        commentsList.appendChild(newComment);
        createComicBurst('?');
    }
}

// Movie Actions
function addToFavorites(button) {
    if (!isLoggedIn) {
        const profileModal = document.getElementById('profileModal');
        if (profileModal) {
            profileModal.classList.add('active');
            createComicBurst('??');
        }
        return;
    }

    if (button.textContent.includes('ADD TO')) {
        button.innerHTML = '?? ADDED TO COLLECTION! ??';
        button.style.background = 'linear-gradient(45deg, #ffd700, #ff6b35)';
        createComicBurst('??');
        screenShake();
        alert('?? MOVIE ADDED TO YOUR HERO COLLECTION! ??');
    } else {
        button.innerHTML = '?? ADD TO COLLECTION';
        button.style.background = '';
        createComicBurst('??');
        alert('?? REMOVED FROM HERO COLLECTION ??');
    }
}

function shareMovie() {
    if (navigator.share) {
        const movieTitle = document.getElementById('movieTitle');
        navigator.share({
            title: movieTitle ? movieTitle.textContent : 'Epic Movie',
            text: '?? Check out this EPIC movie on CineHub! ??',
            url: window.location.href
        }).catch(() => {
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
    createComicBurst('??');
}

function fallbackShare() {
    navigator.clipboard.writeText(window.location.href);
    alert('?? EPIC MOVIE LINK COPIED TO CLIPBOARD! Share it with your fellow heroes! ??');
}

function downloadMovie() {
    if (!isLoggedIn) {
        const profileModal = document.getElementById('profileModal');
        if (profileModal) {
            profileModal.classList.add('active');
            createComicBurst('??');
        }
        return;
    }
    createComicBurst('?');
    screenShake();
    alert('? EPIC DOWNLOAD STARTED! Check your downloads folder for your LEGENDARY movie! ?');
}

// Navigation Functions
function goBackToDetails() {
    createComicBurst('?');
    setTimeout(() => {
        window.location.href = `/Movie/Details?id=${currentMovieId}`;
    }, 300);
}

function toggleSideNav() {
    const sideNav = document.getElementById('sideNav');
    const overlay = document.getElementById('sideNavOverlay');

    if (sideNav && overlay) {
        sideNav.classList.toggle('open');
        overlay.classList.toggle('active');
        createComicBurst('??');
    }
}

function closeSideNav() {
    const sideNav = document.getElementById('sideNav');
    const overlay = document.getElementById('sideNavOverlay');

    if (sideNav && overlay) {
        sideNav.classList.remove('open');
        overlay.classList.remove('active');
    }
}

// Close side nav when clicking overlay
document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('sideNavOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeSideNav);
    }
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

function toggleSearch() {
    const searchContainer = document.getElementById('searchContainer');
    if (searchContainer) {
        searchContainer.classList.toggle('active');
        createComicBurst('??');
    }
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme', isDarkTheme);

    const themeBtn = document.querySelector('.theme-btn');
    if (themeBtn) {
        themeBtn.textContent = isDarkTheme ? '??' : '??';
    }

    // Update side nav theme text
    const themeNavItem = document.querySelector('.side-nav-item[onclick="toggleTheme()"] .side-nav-text');
    if (themeNavItem) {
        themeNavItem.textContent = isDarkTheme ? 'Light Mode' : 'Dark Mode';
    }

    createComicBurst(isDarkTheme ? '??' : '??');
}

function toggleProfile() {
    if (isLoggedIn) {
        // Show user profile if logged in
        const modal = document.getElementById('profileModal');
        if (modal) {
            const profileInfo = modal.querySelector('.profile-info h3');
            if (profileInfo) profileInfo.textContent = `Hello ${userName}`;
            modal.classList.add('active');
            createComicBurst('??');
        }
    } else {
        // Redirect to home page for login
        createComicBurst('??');
        setTimeout(() => {
            window.location.href = '/Account/Login';
        }, 300);
    }
}

// Profile actions
function changeAvatar() {
    createComicBurst('??');
    alert('?? HERO AVATAR CHANGE ACTIVATED! ??');
    closeModal('profileModal');
}

function changePassword() {
    createComicBurst('??');
    alert('?? SECRET CODE CHANGE ACTIVATED! ??');
    closeModal('profileModal');
}

function logout() {
    isLoggedIn = false;
    userName = 'Hero';
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');

    closeModal('profileModal');
    createComicBurst('??');

    // Redirect to home page
    setTimeout(() => {
        window.location.href = '/Movie';
    }, 500);
}

function showRecent() {
    createComicBurst('??');
    alert('? RECENT HERO ACTIVITY PANEL ACTIVATED! ?');
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

// Screen shake effect
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
    }
});

// Keyboard shortcuts for video player
document.addEventListener('keydown', function (e) {
    switch (e.code) {
        case 'Space':
            e.preventDefault();
            togglePlay();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            skipBackward();
            break;
        case 'ArrowRight':
            e.preventDefault();
            skipForward();
            break;
        case 'KeyM':
            e.preventDefault();
            toggleMute();
            break;
        case 'KeyF':
            e.preventDefault();
            toggleFullscreen();
            break;
        case 'Escape':
            closeSideNav();
            break;
    }
});

// Close side nav on window resize
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        closeSideNav();
    }
});

// Cleanup when leaving page
window.addEventListener('beforeunload', function () {
    if (playbackInterval) {
        clearInterval(playbackInterval);
    }
});

// Add random comic elements during playback
setInterval(() => {
    if (isPlaying && Math.random() > 0.8) { // 20% chance every interval when playing
        const container = document.getElementById('comicElements');
        if (container) {
            const randomWord = comicWords[Math.floor(Math.random() * comicWords.length)];

            const element = document.createElement('div');
            element.className = 'pow-element';
            element.textContent = randomWord;
            element.style.left = Math.random() * 100 + '%';
            element.style.animationDuration = '4s';
            container.appendChild(element);

            // Remove after animation
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }, 4000);
        }
    }
}, 2000);

// Initialize everything when page loads
window.addEventListener('load', function () {
    // Add initial comic burst
    setTimeout(() => {
        createComicBurst('??');
    }, 500);

    setTimeout(() => {
        createComicBurst('??');
    }, 1000);

    setTimeout(() => {
        createComicBurst('??');
    }, 1500);
});