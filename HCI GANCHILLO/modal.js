/**
 * Modal Component for Ganchillo
 * Creates, manages, and animates modal dialogs with various configurations
 */

class ModalManager {
    constructor() {
        this.setupGlobalEvents();
    }
    
    // Open a modal
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return null;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus the first input if present
        const firstInput = modal.querySelector('input, textarea, select, button:not(.close-modal)');
        if (firstInput) {
            setTimeout(() => {
                firstInput.focus();
            }, 100);
        }
        
        return modal;
    }
    
    // Close a modal
    closeModal(modal) {
        if (typeof modal === 'string') {
            modal = document.getElementById(modal);
        }
        
        if (!modal) return;
        
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // Close all open modals
    closeAllModals() {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            this.closeModal(modal);
        });
    }
    
    // Create a modal dynamically
    createModal(options = {}) {
        const { id, title, content, footer, size } = options;
        
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'modal';
        if (id) modal.id = id;
        
        // Add size class if specified
        if (size) {
            modal.classList.add(`modal-${size}`);
        }
        
        // Create modal content
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title || 'Modal'}</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    ${content || ''}
                </div>
                ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
            </div>
        `;
        
        // Add modal to the document
        document.body.appendChild(modal);
        
        // Setup close button
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeModal(modal);
            });
        }
        
        return modal;
    }
    
    // Create an alert modal
    alert(message, title = 'Alert') {
        const modal = this.createModal({
            title,
            content: `<p>${message}</p>`,
            footer: '<button class="btn btn-primary close-modal-btn">OK</button>'
        });
        
        // Setup OK button
        const okBtn = modal.querySelector('.close-modal-btn');
        if (okBtn) {
            okBtn.addEventListener('click', () => {
                this.closeModal(modal);
            });
        }
        
        this.openModal(modal);
        return modal;
    }
    
    // Create a confirmation modal
    confirm(message, title = 'Confirm', onConfirm = null, onCancel = null) {
        const modal = this.createModal({
            title,
            content: `<p>${message}</p>`,
            footer: `
                <button class="btn btn-secondary cancel-btn">Cancel</button>
                <button class="btn btn-primary confirm-btn">Confirm</button>
            `
        });
        
        // Setup buttons
        const confirmBtn = modal.querySelector('.confirm-btn');
        const cancelBtn = modal.querySelector('.cancel-btn');
        
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                if (onConfirm) onConfirm();
                this.closeModal(modal);
            });
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                if (onCancel) onCancel();
                this.closeModal(modal);
            });
        }
        
        this.openModal(modal);
        return modal;
    }
    
    // Set up global event listeners
    setupGlobalEvents() {
        document.addEventListener('DOMContentLoaded', () => {
            // Close modal when clicking outside content
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal')) {
                    this.closeModal(e.target);
                }
            });
            
            // Close modal when Escape key is pressed
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeAllModals();
                }
            });
            
            // Setup close buttons
            document.querySelectorAll('.close-modal, .close-modal-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const modal = btn.closest('.modal');
                    if (modal) {
                        this.closeModal(modal);
                    }
                });
            });
            
            // Setup modal triggers
            document.querySelectorAll('[data-modal-target]').forEach(trigger => {
                trigger.addEventListener('click', () => {
                    const modalId = trigger.dataset.modalTarget;
                    this.openModal(modalId);
                });
            });
        });
    }
}

// Initialize modal manager
const modalManager = new ModalManager();

// Add modal functions to window for global access
window.openModal = (modalId) => modalManager.openModal(modalId);
window.closeModal = (modal) => modalManager.closeModal(modal);
window.alert = (message, title) => modalManager.alert(message, title);
window.confirm = (message, title, onConfirm, onCancel) => 
    modalManager.confirm(message, title, onConfirm, onCancel);

// Setup product modal functionality
document.addEventListener('DOMContentLoaded', () => {
    // Product quick view
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const productName = button.dataset.productName;
            const productPrice = button.dataset.productPrice;
            const productImage = button.dataset.productImage;
            const productDesc = button.dataset.productDesc;
            
            // Update modal content
            const modal = document.getElementById('product-modal');
            if (!modal) return;
            
            document.getElementById('modal-product-name').textContent = productName;
            document.getElementById('modal-product-price').textContent = productPrice;
            document.getElementById('modal-product-description').textContent = productDesc;
            document.getElementById('modal-product-image').src = productImage;
            
            // Store product ID on add buttons
            const addToCartBtn = document.getElementById('modal-add-to-cart');
            const addToWishlistBtn = document.getElementById('modal-add-to-wishlist');
            
            if (addToCartBtn) {
                addToCartBtn.dataset.productId = productId;
            }
            
            if (addToWishlistBtn) {
                addToWishlistBtn.dataset.productId = productId;
            }
            
            // Open modal
            modalManager.openModal('product-modal');
        });
    });
    
    // Add to cart from modal
    const modalAddToCart = document.getElementById('modal-add-to-cart');
    if (modalAddToCart) {
        modalAddToCart.addEventListener('click', () => {
            const productId = modalAddToCart.dataset.productId;
            
            if (window.addToCart) {
                window.addToCart(productId);
            }
            
            modalManager.closeModal('product-modal');
        });
    }
    
    // Add to wishlist from modal
    const modalAddToWishlist = document.getElementById('modal-add-to-wishlist');
    if (modalAddToWishlist) {
        modalAddToWishlist.addEventListener('click', () => {
            const productId = modalAddToWishlist.dataset.productId;
            
            if (window.addToWishlist) {
                window.addToWishlist(productId);
            } else {
                // Check if user is logged in
                if (window.authManager && window.authManager.isLoggedIn()) {
                    if (window.showNotification) {
                        window.showNotification('Item added to wishlist!', 'wishlist');
                    }
                } else {
                    if (window.showNotification) {
                        window.showNotification('Please log in to add items to your wishlist.', 'info');
                    }
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                }
            }
            
            modalManager.closeModal('product-modal');
        });
    }
    
    // Initialize cart modal
    const cartTrigger = document.getElementById('cart-trigger');
    if (cartTrigger) {
        cartTrigger.addEventListener('click', () => {
            if (window.updateCartModal) {
                window.updateCartModal();
            }
            modalManager.openModal('cart-modal');
        });
    }
    
    // Setup continue shopping button
    const continueShoppingBtn = document.getElementById('continue-shopping');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', () => {
            modalManager.closeModal('cart-modal');
        });
    }
    
    // Setup checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            modalManager.closeModal('cart-modal');
            
            // Check if user is logged in
            if (window.authManager && !window.authManager.isLoggedIn()) {
                if (window.showNotification) {
                    window.showNotification('Please log in to checkout.', 'info');
                }
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
                return;
            }
            
            // Redirect to checkout page
            window.location.href = 'checkout.html';
        });
    }
});