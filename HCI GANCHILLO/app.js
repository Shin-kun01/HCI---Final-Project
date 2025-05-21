
document.addEventListener('DOMContentLoaded', function() {
    // Initialize global UI elements and functionality
    initHeaderInteractions();
    enhanceFormElements();
    setupGlobalEventListeners();
    
    // Initialize image slider on homepage if present
    if (document.getElementById('hero-slider')) {
        // Already initialized in slider.js
    }
    
    // Check URL for specific routes to initialize relevant scripts
    const currentPath = window.location.pathname;
    
    if (currentPath.startsWith('/product/')) {
        // Product page specific initializations
        // Most are handled in product.js
    } else if (currentPath === '/cart') {
        // Cart page specific initializations
        // Most are handled in cart.js
    } else if (currentPath === '/checkout') {
        // Checkout page specific initializations
        // Most are handled in checkout.js
    }
});

/**
 * Initializes header interactions (mobile menu, search, etc.)
 */
function initHeaderInteractions() {
    // Handle search functionality
    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                // In a real app, this would redirect to a search results page
                alert(`Searching for: ${query}`);
                // window.location.href = `/search?q=${encodeURIComponent(query)}`;
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // Smooth scroll to top when logo is clicked
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            // Only if we're already on the homepage
            if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
}

/**
 * Enhances form elements with better UI/UX
 */
function enhanceFormElements() {
    // Focus effect on inputs
    document.querySelectorAll('input, textarea').forEach(input => {
        // Skip inputs that already have event listeners or special handling
        if (input.classList.contains('quantity-input') || 
            input.classList.contains('cart-quantity-input')) {
            return;
        }
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Newsletter form submissions
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = this.querySelector('input');
            const value = input.value.trim();
            const isEmail = input.type === 'email' || input.placeholder.toLowerCase().includes('email');
            
            if (!value) {
                alert(isEmail ? 'Please enter your email address.' : 'Please enter your phone number.');
                return;
            }
            
            // Simple validation
            if (isEmail && !validateEmail(value)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real app, this would make an AJAX call to subscribe
            alert(`Thank you for subscribing${isEmail ? ' to our newsletter' : ' for SMS updates'}!`);
            input.value = '';
        });
    });
}

/**
 * Sets up global event listeners
 */
function setupGlobalEventListeners() {
    // Add to cart button listeners for product listings
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        // Skip buttons that already have event handlers (from other scripts)
        if (button.onclick) return;
        
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            
            if (!productId) {
                console.error('Product ID not found for add to cart button');
                return;
            }
            
            // For simple add to cart without options, use default options
            addToCart(productId, 'Default', 'One Size', 1);
            
            // Show confirmation message
            showQuickConfirmation(this, 'Added to cart!');
        });
    });
    
    // Handle back buttons
    document.querySelectorAll('.back-link, .btn-back').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.back();
        });
    });
    
    // Setup fading notifications
    document.addEventListener('showNotification', function(e) {
        showNotification(e.detail.message, e.detail.type);
    });
}

/**
 * Validates an email address format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Shows a temporary notification on the button
 * @param {HTMLElement} button - The button element
 * @param {string} message - The message to display
 */
function showQuickConfirmation(button, message) {
    const originalText = button.textContent;
    const originalWidth = button.offsetWidth;
    
    // Set minimum width to prevent resizing
    button.style.minWidth = `${originalWidth}px`;
    
    // Change text and add success class
    button.textContent = message;
    button.classList.add('btn-success');
    
    // Reset after delay
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('btn-success');
        button.style.minWidth = '';
    }, 2000);
}

/**
 * Shows a notification toast message
 * @param {string} message - The message to display
 * @param {string} type - The notification type (success, error, info)
 */
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification container if it doesn't exist
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .notification {
                padding: 12px 20px;
                border-radius: 4px;
                color: white;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
                transform: translateX(100%);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            
            .notification.show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .notification.success {
                background-color: #6a994e;
            }
            
            .notification.error {
                background-color: #bc4749;
            }
            
            .notification.info {
                background-color: #1976d2;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to container
    container.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

