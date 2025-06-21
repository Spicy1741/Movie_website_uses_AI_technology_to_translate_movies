// Global variables
let currentFile = null;
let originalText = '';
let translatedText = '';
let sourceLanguage = 'en';
let targetLanguage = 'es';

// Comic book elements array
const comicWords = ['TRANSLATE!', 'EPIC!', 'BOOM!', 'POW!', 'ZAP!', 'HERO!', 'LEGEND!', 'SUBTITLE!'];

// Language mappings
const languageNames = {
    'en': '🇺🇸 ENGLISH',
    'es': '🇪🇸 SPANISH',
    'fr': '🇫🇷 FRENCH',
    'de': '🇩🇪 GERMAN',
    'it': '🇮🇹 ITALIAN',
    'pt': '🇵🇹 PORTUGUESE',
    'zh': '🇨🇳 CHINESE',
    'ja': '🇯🇵 JAPANESE',
    'ko': '🇰🇷 KOREAN'
};

// Initialize comic elements
function createComicElements() {
    const container = document.getElementById('comicElements');

    // Create floating comic words
    for (let i = 0; i < 12; i++) {
        const element = document.createElement('div');
        element.className = 'pow-element';
        element.textContent = comicWords[Math.floor(Math.random() * comicWords.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 8 + 's';
        element.style.animationDuration = (Math.random() * 4 + 6) + 's';
        container.appendChild(element);
    }

    // Create translator-specific elements
    for (let i = 0; i < 6; i++) {
        const element = document.createElement('div');
        element.className = 'translator-element';
        element.textContent = ['TRANSLATE!', 'SUBTITLE!', 'EPIC!'][Math.floor(Math.random() * 3)];
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

// File handling
function setupFileHandling() {
    const fileInput = document.getElementById('movieFileInput');
    const dropZone = document.getElementById('fileDropZone');
    const fileInfo = document.getElementById('fileInfo');

    // File input change
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }

    // Drag and drop
    if (dropZone) {
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFile(files[0]);
            }
        });
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    currentFile = file;
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileSize').textContent = formatFileSize(file.size);
    document.getElementById('fileInfo').style.display = 'block';

    // Read file content
    const reader = new FileReader();
    reader.onload = function (e) {
        const content = e.target.result;
        document.getElementById('originalText').value = content;
        originalText = content;
    };
    reader.readAsText(file);

    createComicBurst('📁');
    alert('🎬 EPIC SUBTITLE FILE LOADED! Ready for translation! 🎬');
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Translation functions
function swapLanguages() {
    const source = document.getElementById('sourceLanguage');
    const target = document.getElementById('targetLanguage');

    const temp = source.value;
    source.value = target.value;
    target.value = temp;

    createComicBurst('🔄');
    alert('🔄 LANGUAGES SWAPPED! Ready for reverse translation! 🔄');
}

function clearTranslation() {
    document.getElementById('originalText').value = '';
    document.getElementById('translatedText').value = '';
    document.getElementById('fileInfo').style.display = 'none';
    currentFile = null;

    createComicBurst('🗑️');
    alert('🗑️ ALL CONTENT CLEARED! Ready for new epic translation! 🗑️');
}

function downloadTranslation() {
    const translatedContent = document.getElementById('translatedText').value;
    if (!translatedContent.trim()) {
        createComicBurst('❓');
        alert('🤔 NO TRANSLATION TO DOWNLOAD! Please translate first! 🤔');
        return;
    }

    const targetLang = document.getElementById('targetLanguage').value;
    const baseName = currentFile ? currentFile.name.split('.')[0] : 'subtitle';
    const filename = `${baseName}_${targetLang}.srt`;

    const blob = new Blob([translatedContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    createComicBurst('⬇️');
    screenShake();
    alert('⬇️ EPIC TRANSLATION DOWNLOADED! 🎉');
}

// Notes functions
function clearNotes() {
    document.getElementById('translationNotes').value = '';
    createComicBurst('🗑️');
    alert('🗑️ NOTES CLEARED! 🗑️');
}

// Admin notes panel
function showAdminNotes() {
    const panel = document.getElementById('adminNotesPanel');
    panel.classList.add('active');
    createComicBurst('📝');
}

function hideAdminNotes() {
    const panel = document.getElementById('adminNotesPanel');
    panel.classList.remove('active');
    createComicBurst('❌');
}

// Navigation functions
function toggleNotifications() {
    createComicBurst('🔔');
    alert('🔔 EPIC NOTIFICATIONS ACTIVATED! 🔔');
}

function toggleProfile() {
    const modal = document.getElementById('profileModal');
    modal.classList.toggle('active');
    createComicBurst('👨‍💻');
}

function showQuickActions() {
    createComicBurst('🚀');
    alert('🚀 QUICK ACTIONS ACTIVATED! 🚀');
}

// Profile functions
function editProfile() {
    createComicBurst('✏️');
    alert('✏️ PROFILE EDITOR ACTIVATED! ✏️');
    closeModal('profileModal');
}

function changePassword() {
    createComicBurst('🔒');
    alert('🔒 PASSWORD CHANGE ACTIVATED! 🔒');
    closeModal('profileModal');
}

function viewSettings() {
    createComicBurst('⚙️');
    alert('⚙️ SETTINGS PANEL ACTIVATED! ⚙️');
    closeModal('profileModal');
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

    @keyframes comicExplosion {
        0% { 
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
        }
        50% { 
            transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
            opacity: 0.7;
        }
        100% { 
            transform: translate(-50%, -50%) scale(2) rotate(360deg);
            opacity: 0;
        }
    }

    .comic-explosion {
        animation: comicExplosion 0.6s ease-out;
    }
`;
document.head.appendChild(shakeStyle);

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function () {
    createComicElements();
    setupFileHandling();

    // Add initial comic burst
    setTimeout(() => {
        createComicBurst('🌐');
    }, 500);

    setTimeout(() => {
        createComicBurst('💬');
    }, 1000);
});