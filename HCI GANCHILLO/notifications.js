/**
 * Notifications Module for Ganchillo
 * Handles toast notifications and the notification center
 */

// Storage key for notifications
const NOTIFICATIONS_KEY = 'ganchillo_notifications';

class NotificationManager {
    constructor() {
        this.notifications = this.loadNotifications();
        this.unreadCount = this.getUnreadCount();
        this.setupListeners();
        this.updateUI();
    }
    
    // Load notifications from storage
    loadNotifications() {
        const notificationData = localStorage.getItem(NOTIFICATIONS_KEY);
        return notificationData ? JSON.parse(notificationData) : [];
    }
    
    // Save notifications to storage
    saveNotifications() {
        localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(this.notifications));
    }
    
    // Add a new notification
    addNotification(notification) {
        const newNotification = {
            id: Date.now(),
            title: notification.title,
            message: notification.message,
            type: notification.type || 'info',
            read: false,
            timestamp: new Date().toISOString()
        };
        
        this.notifications.unshift(newNotification);
        this.unreadCount++;
        this.saveNotifications();
        this.updateUI();
    }
    
    // Mark a notification as read
    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification && !notification.read) {
            notification.read = true;
            this.unreadCount--;
            this.saveNotifications();
            this.updateUI();
        }
    }
    
    // Mark all notifications as read
    markAllAsRead() {
        let updated = false;
        
        this.notifications.forEach(notification => {
            if (!notification.read) {
                notification.read = true;
                updated = true;
            }
        });
        
        if (updated) {
            this.unreadCount = 0;
            this.saveNotifications();
            this.updateUI();
        }
    }
    
    // Delete a notification
    deleteNotification(notificationId) {
        const index = this.notifications.findIndex(n => n.id === notificationId);
        if (index !== -1) {
            if (!this.notifications[index].read) {
                this.unreadCount--;
            }
            this.notifications.splice(index, 1);
            this.saveNotifications();
            this.updateUI();
        }
    }
    
    // Get unread notifications count
    getUnreadCount() {
        return this.notifications.filter(n => !n.read).length;
    }
    
    // Show a toast notification
    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let icon = '';
        switch (type) {
            case 'success':
                icon = '<i class="fas fa-check"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-times"></i>';
                break;
            case 'info':
                icon = '<i class="fas fa-info"></i>';
                break;
            default:
                icon = '<i class="fas fa-bell"></i>';
        }
        
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <p class="toast-message">${message}</p>
            </div>
            <button class="toast-close">&times;</button>
        `;
        
        container.appendChild(toast);
        
        // Trigger reflow to enable transition
        toast.offsetHeight;
        
        // Show toast
        toast.classList.add('show');
        
        // Set up close button
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 300);
        });
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (container.contains(toast)) {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (container.contains(toast)) {
                        container.removeChild(toast);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Format relative time for notification timestamps
    formatRelativeTime(timestamp) {
        const now = new Date();
        const date = new Date(timestamp);
        const secondsAgo = Math.floor((now - date) / 1000);
        
        if (secondsAgo < 60) {
            return 'Just now';
        } else if (secondsAgo < 3600) {
            const minutes = Math.floor(secondsAgo / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (secondsAgo < 86400) {
            const hours = Math.floor(secondsAgo / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (secondsAgo < 604800) {
            const days = Math.floor(secondsAgo / 86400);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else {
            // Format as date
            return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        }
    }
    
    // Update notification UI
    updateUI() {
        // Update indicator
        const indicator = document.querySelector('.notification-indicator');
        if (indicator) {
            if (this.unreadCount > 0) {
                indicator.classList.add('has-notifications');
            } else {
                indicator.classList.remove('has-notifications');
            }
        }
        
        // Update notification list
        const notificationList = document.querySelector('.notification-list');
        if (!notificationList) return;
        
        if (this.notifications.length === 0) {
            notificationList.innerHTML = `
                <div class="empty-notifications">
                    <i class="far fa-bell-slash"></i>
                    <p>No notifications yet</p>
                </div>
            `;
            return;
        }
        
        let notificationsHTML = '';
        
        this.notifications.forEach(notification => {
            const relativeTime = this.formatRelativeTime(notification.timestamp);
            
            notificationsHTML += `
                <div class="notification-item ${notification.read ? 'read' : ''}" data-id="${notification.id}">
                    <div class="notification-icon">
                        ${this.getNotificationIcon(notification.type)}
                    </div>
                    <div class="notification-content">
                        <div class="notification-title">${notification.title}</div>
                        <div class="notification-text">${notification.message}</div>
                        <div class="notification-time">${relativeTime}</div>
                    </div>
                </div>
            `;
        });
        
        notificationList.innerHTML = notificationsHTML;
        
        // Add click handlers to mark as read
        const notificationItems = notificationList.querySelectorAll('.notification-item');
        notificationItems.forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                this.markAsRead(id);
            });
        });
    }
    
    // Get appropriate icon for notification type
    getNotificationIcon(type) {
        switch (type) {
            case 'success':
                return '<i class="fas fa-check"></i>';
            case 'error':
                return '<i class="fas fa-exclamation-circle"></i>';
            case 'warning':
                return '<i class="fas fa-exclamation-triangle"></i>';
            case 'cart':
                return '<i class="fas fa-shopping-cart"></i>';
            case 'wishlist':
                return '<i class="fas fa-heart"></i>';
            case 'order':
                return '<i class="fas fa-box"></i>';
            default:
                return '<i class="fas fa-bell"></i>';
        }
    }
    
    // Setup event listeners
    setupListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            // Mark all as read button
            const markAllReadBtn = document.querySelector('.mark-all-read');
            if (markAllReadBtn) {
                markAllReadBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.markAllAsRead();
                });
            }
        });
    }
}

// Initialize notification manager
const notificationManager = new NotificationManager();

// Add showNotification to window for global access
window.showNotification = (message, type = 'success') => {
    notificationManager.showToast(message, type);
    
    // For certain types, also add to notification center
    if (['success', 'info', 'warning', 'error', 'cart', 'wishlist', 'order'].includes(type)) {
        let title = 'Notification';
        
        switch (type) {
            case 'success':
                title = 'Success';
                break;
            case 'error':
                title = 'Error';
                break;
            case 'warning':
                title = 'Warning';
                break;
            case 'cart':
                title = 'Shopping Cart';
                break;
            case 'wishlist':
                title = 'Wishlist';
                break;
            case 'order':
                title = 'Order';
                break;
        }
        
        notificationManager.addNotification({
            title,
            message,
            type
        });
    }
};