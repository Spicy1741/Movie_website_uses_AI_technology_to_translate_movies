// Admin Dashboard JavaScript

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeDashboard();
    createComicElements();
    setupEventListeners();
});

// Dashboard initialization
function initializeDashboard() {
    console.log('Admin Dashboard initialized');

    // Set active menu item
    const currentSection = 'dashboard'; // Default section
    setActiveMenuItem(currentSection);

    // Show dashboard section by default
    showSection('dashboard');
}

// Set active menu item
function setActiveMenuItem(sectionName) {
    // Remove active class from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to current menu item
    const currentMenuItem = document.querySelector(`[data-section="${sectionName}"]`);
    if (currentMenuItem) {
        currentMenuItem.classList.add('active');
    }
}

// Show specific section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show current section
    const currentSection = document.getElementById(sectionName);
    if (currentSection) {
        currentSection.classList.add('active');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Menu item clicks
    document.querySelectorAll('.menu-item[data-section]').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            setActiveMenuItem(section);
            showSection(section);
        });
    });

    // Close modal when clicking outside
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });

    // ESC key to close modal
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Create floating comic elements
function createComicElements() {
    const comicContainer = document.getElementById('comicElements');
    if (!comicContainer) return;

    const elements = ['💥', '⚡', '🌟', '💫', '🎬', '🎭', '🎪', '🎨'];

    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 20}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: float ${Math.random() * 10 + 15}s infinite linear;
            pointer-events: none;
            z-index: 0;
        `;
        comicContainer.appendChild(element);
    }

    // Add CSS animation for floating elements
    if (!document.getElementById('comic-animations')) {
        const style = document.createElement('style');
        style.id = 'comic-animations';
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Navigation functions
function toggleNotifications() {
    showNotification('🔔 No new notifications!', 'info');
}

function toggleProfile() {
    const modal = document.getElementById('profileModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('show');
    });
}

// Quick actions
function addNewMovie() {
    showNotification('🎬 Add Movie feature coming soon!', 'info');
}

function addNewSeries() {
    showNotification('📺 Add Series feature coming soon!', 'info');
}

function addSubtitle() {
    showNotification('💬 Add Subtitle feature coming soon!', 'info');
}

function addPhoto() {
    showNotification('📸 Add Photo feature coming soon!', 'info');
}

function manageUsers() {
    showNotification('👥 User Management feature coming soon!', 'info');
}

// FAB actions
function showQuickActions() {
    const actions = [
        { text: '➕ Add Movie', action: addNewMovie },
        { text: '📺 Add Series', action: addNewSeries },
        { text: '💬 Add Subtitle', action: addSubtitle },
        { text: '🌐 AI Translator', action: () => window.location.href = '/Admin/Translator' }
    ];

    showActionMenu(actions);
}

function showActionMenu(actions) {
    // Remove existing action menu
    const existingMenu = document.getElementById('actionMenu');
    if (existingMenu) {
        existingMenu.remove();
    }

    // Create action menu
    const menu = document.createElement('div');
    menu.id = 'actionMenu';
    menu.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 2rem;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        border: 2px solid #667eea;
        border-radius: 10px;
        padding: 1rem;
        z-index: 1001;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        animation: slideUp 0.3s ease;
    `;

    actions.forEach(action => {
        const button = document.createElement('button');
        button.textContent = action.text;
        button.onclick = () => {
            action.action();
            menu.remove();
        };
        button.style.cssText = `
            display: block;
            width: 100%;
            background: transparent;
            border: none;
            color: #fff;
            padding: 0.8rem;
            text-align: left;
            cursor: pointer;
            border-radius: 5px;
            margin-bottom: 0.5rem;
            transition: all 0.3s ease;
        `;
        button.onmouseover = () => {
            button.style.background = 'rgba(102, 126, 234, 0.2)';
        };
        button.onmouseout = () => {
            button.style.background = 'transparent';
        };
        menu.appendChild(button);
    });

    document.body.appendChild(menu);

    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && !document.querySelector('.fab').contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);

    // Add slideUp animation
    if (!document.getElementById('action-menu-animations')) {
        const style = document.createElement('style');
        style.id = 'action-menu-animations';
        style.textContent = `
            @keyframes slideUp {
                from {
                    transform: translateY(20px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Profile functions
function editProfile() {
    showNotification('✏️ Edit Profile feature coming soon!', 'info');
    closeModal();
}

function changePassword() {
    showNotification('🔒 Change Password feature coming soon!', 'info');
    closeModal();
}

function viewSettings() {
    showNotification('⚙️ Settings feature coming soon!', 'info');
    closeModal();
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.admin-notification');
    existingNotifications.forEach(notif => notif.remove());

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'admin-notification';
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;

    // Style notification
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        font-weight: 500;
    `;

    // Style close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: transparent;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s ease;
    `;

    closeBtn.onmouseover = () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    };

    closeBtn.onmouseout = () => {
        closeBtn.style.background = 'transparent';
    };

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);

    // Add notification animations if not exists
    if (!document.getElementById('notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Table row interactions
document.addEventListener('DOMContentLoaded', function () {
    // Add click handlers for mini buttons
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('mini-btn')) {
            if (e.target.classList.contains('edit')) {
                showNotification('✏️ Edit feature coming soon!', 'info');
            } else if (e.target.classList.contains('delete')) {
                if (confirm('Are you sure you want to delete this item?')) {
                    showNotification('🗑️ Item deleted successfully!', 'success');
                }
            } else if (e.target.classList.contains('translate')) {
                showNotification('🌐 Redirecting to AI Translator...', 'info');
                setTimeout(() => {
                    window.location.href = '/Admin/Translator';
                }, 1000);
            }
        }
    });
});

// Stats animation on load
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-info h3');

    statNumbers.forEach(stat => {
        const finalNumber = parseInt(stat.textContent.replace(/,/g, ''));
        let currentNumber = 0;
        const increment = finalNumber / 50;

        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                stat.textContent = finalNumber.toLocaleString();
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentNumber).toLocaleString();
            }
        }, 50);
    });
}

// Call stats animation when dashboard loads
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(animateStats, 500);
});

// Card hover effects
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.stat-card, .content-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Search functionality (placeholder)
function searchContent(query) {
    showNotification(`🔍 Searching for: "${query}"`, 'info');
    // Implement actual search logic here
}

// Export data functionality (placeholder)
function exportData(type) {
    showNotification(`📊 Exporting ${type} data...`, 'info');
    // Implement actual export logic here
}

// Refresh data functionality
function refreshData() {
    showNotification('🔄 Refreshing dashboard data...', 'info');

    // Simulate data refresh
    setTimeout(() => {
        showNotification('✅ Dashboard data refreshed successfully!', 'success');
        animateStats();
    }, 2000);
}

// Dark/Light theme toggle (if needed in future)
function toggleTheme() {
    showNotification('🌙 Theme toggle feature coming soon!', 'info');
}

// Utility functions
function formatFileSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('vi-VN');
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Console welcome message
console.log(`
🎬 ====================================== 🎬
    CINEHUB ADMIN DASHBOARD LOADED
🎬 ====================================== 🎬
`);

// Add some interactive easter eggs
let clickCount = 0;
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('logo-circle')) {
        clickCount++;
        if (clickCount === 5) {
            showNotification('🎉 Easter egg found! You are a true admin hero!', 'success');
            clickCount = 0;
        }
    }
});

// Performance monitoring
function logPerformance() {
    if (window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Dashboard loaded in ${loadTime}ms`);
    }
}

window.addEventListener('load', logPerformance);