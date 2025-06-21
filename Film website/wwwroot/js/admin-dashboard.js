// Global variables
let currentSection = 'dashboard';
let isDarkTheme = false;
const comicWords = ['POW!', 'BAM!', 'ZAP!', 'BOOM!', 'WHAM!', 'ADMIN!', 'HERO!', 'EPIC!'];

// Initialize comic elements
function createComicElements() {
    const container = document.getElementById('comicElements');

    // Create floating comic words
    for (let i = 0; i < 10; i++) {
        const element = document.createElement('div');
        element.className = 'pow-element';
        element.textContent = comicWords[Math.floor(Math.random() * comicWords.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 8 + 's';
        element.style.animationDuration = (Math.random() * 4 + 6) + 's';
        container.appendChild(element);
    }

    // Create admin-specific elements
    for (let i = 0; i < 5; i++) {
        const element = document.createElement('div');
        element.className = 'admin-element';
        element.textContent = ['ADMIN!', 'CONTROL!', 'POWER!'][Math.floor(Math.random() * 3)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 6 + 's';
        container.appendChild(element);
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

// Section navigation
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');

    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

    currentSection = sectionId;
    createComicBurst('⚡');
}

// Menu item click handlers
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = item.getAttribute('data-section');
        showSection(sectionId);
    });
});

// Admin functions
function addNewMovie() {
    createComicBurst('🎬');
    alert('🎬 NEW EPIC MOVIE CREATION ACTIVATED! 🎬');
}

function addNewSeries() {
    createComicBurst('📺');
    alert('📺 NEW HERO SERIES CREATION ACTIVATED! 📺');
}

function addSubtitle() {
    createComicBurst('💬');
    alert('💬 SUBTITLE COMMAND CENTER ACTIVATED! 💬');
}

function addPhoto() {
    createComicBurst('📸');
    alert('📸 PHOTO VAULT ACCESS GRANTED! 📸');
}

function manageUsers() {
    createComicBurst('👥');
    alert('👥 USER HERO MANAGEMENT ACTIVATED! 👥');
}

function toggleNotifications() {
    createComicBurst('🔔');
    alert('🔔 HERO ALERT SYSTEM ACTIVATED! 🔔');
}

function toggleProfile() {
    const modal = document.getElementById('profileModal');
    modal.classList.toggle('active');
    createComicBurst('👨‍💼');
}

function logout() {
    createComicBurst('🚪');
    if (confirm('🚪 EXIT ADMIN COMMAND CENTER? 🚪')) {
        alert('👋 ADMIN SESSION TERMINATED! 👋');
        window.location.href = '/';
    }
}

function showQuickActions() {
    createComicBurst('⚡');
    alert('⚡ QUICK ACTION MENU ACTIVATED! ⚡');
}

// Profile functions
function editProfile() {
    createComicBurst('✏️');
    alert('✏️ ADMIN PROFILE EDITOR ACTIVATED! ✏️');
}

function changePassword() {
    createComicBurst('🔒');
    alert('🔒 SECURITY CODE CHANGE INITIATED! 🔒');
}

function viewSettings() {
    createComicBurst('⚙️');
    alert('⚙️ ADMIN SETTINGS PANEL ACTIVATED! ⚙️');
}

// Modal close functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    createComicElements();

    setTimeout(() => {
        createComicBurst('🛡️');
    }, 500);
});