/**
 * Product Page Functionality for Ganchillo
 * Handles gallery, variant selection, and product actions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize product galleries
    initProductGallery();
    
    // Initialize product variant selection
    initVariantSelection();
    
    // Initialize quantity controls
    initQuantityControls();
    
    // Initialize related products slider if present
    if (document.querySelector('.related-products-slider')) {
        new ImageSlider('.related-products-slider', {
            autoplay: true,
            interval: 6000,
            showNavigation: true,
            showIndicators: false
        });
    }
});

/**
 * Initializes the product image gallery with thumbnail navigation
 */
function initProductGallery() {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (!mainImage || thumbnails.length === 0) return;
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
            
            // Update main image
            const imgSrc = this.querySelector('img').src;
            mainImage.src = imgSrc;
            
            // Add a slight zoom effect
            mainImage.style.transform = 'scale(1.05)';
            setTimeout(() => {
                mainImage.style.transform = 'scale(1)';
            }, 300);
        });
    });
    
    // Initialize zoom effect on main image hover
    if (window.innerWidth >= 768) { // Only on desktop
        const imageContainer = document.querySelector('.main-image');
        
        imageContainer.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            mainImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
            mainImage.style.transform = 'scale(1.5)';
        });
        
        imageContainer.addEventListener('mouseleave', function() {
            mainImage.style.transform = 'scale(1)';
            mainImage.style.transformOrigin = 'center center';
        });
    }
}

/**
 * Initializes product variant selection (colors, sizes, etc.)
 */
function initVariantSelection() {
    // Color selection
    const colorOptions = document.querySelectorAll('.color-option');
    if (colorOptions.length > 0) {
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                
                // Update any variant-specific information if needed
                updateProductInfo();
            });
        });
    }
    
    // Size selection
    const sizeOptions = document.querySelectorAll('.size-option');
    if (sizeOptions.length > 0) {
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                sizeOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                
                // Update any variant-specific information if needed
                updateProductInfo();
            });
        });
    }
}

/**
 * Updates product information based on selected variants
 * This could update price, availability, SKU, etc.
 */
function updateProductInfo() {
    const selectedColor = document.querySelector('.color-option.selected');
    const selectedSize = document.querySelector('.size-option.selected');
    
    if (!selectedColor || !selectedSize) return;
    
    const colorName = selectedColor.dataset.color;
    const sizeName = selectedSize.dataset.size;
    
    // In a real application, this would likely make an AJAX request to get variant-specific data
    // For this example, we'll just update the product subtitle
    const variantDisplay = document.querySelector('.selected-variant');
    if (variantDisplay) {
        variantDisplay.textContent = `Selected: ${colorName}, Size ${sizeName}`;
    }
    
    // You could also update the main product image to show the correct color
    // updateProductImageForVariant(colorName);
}

/**
 * Updates the main product image to match the selected color variant
 * @param {string} colorName - Name of the selected color
 */
function updateProductImageForVariant(colorName) {
    // In a real application, this would update the image src based on the variant
    // For this example, we'll just log a message
    console.log(`Would update image for ${colorName} variant`);
    
    // Example code to change the image:
    // const mainImage = document.querySelector('.main-image img');
    // if (mainImage) {
    //     mainImage.src = `path/to/product-${colorName.toLowerCase()}.jpg`;
    // }
}

/**
 * Initializes quantity selection controls
 */
function initQuantityControls() {
    const decreaseBtn = document.querySelector('.quantity-btn.decrease');
    const increaseBtn = document.querySelector('.quantity-btn.increase');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (!decreaseBtn || !increaseBtn || !quantityInput) return;
    
    decreaseBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < 99) {
            quantityInput.value = currentValue + 1;
        }
    });
    
    // Validate direct input
    quantityInput.addEventListener('change', function() {
        let currentValue = parseInt(this.value);
        if (isNaN(currentValue) || currentValue < 1) {
            this.value = 1;
        } else if (currentValue > 99) {
            this.value = 99;
        }
    });
}

/**
 * Handles the add to cart action
 */
function handleAddToCart() {
    const productDetail = document.querySelector('.product-detail');
    if (!productDetail) return;
    
    const productId = productDetail.dataset.productId;
    const quantity = parseInt(document.querySelector('.quantity-input').value) || 1;
    
    // Get selected color and size
    const selectedColor = document.querySelector('.color-option.selected');
    const selectedSize = document.querySelector('.size-option.selected');
    
    if (!selectedColor || !selectedSize) {
        modalManager.alert('Please select color and size options before adding to cart.', 'Selection Required');
        return;
    }
    
    const color = selectedColor.dataset.color;
    const size = selectedSize.dataset.size;
    
    // Add to cart (from cart.js)
    addToCart(productId, color, size, quantity);
    
    // Show confirmation message
    const confirmationModal = modalManager.open({
        title: 'Added to Cart',
        content: `
            <div class="add-confirmation">
                <div class="confirmation-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <p class="confirmation-message">
                    <strong>${quantity}x ${document.querySelector('.product-title').textContent}</strong> has been added to your cart.
                </p>
                <div class="selected-options">
                    Color: ${color}, Size: ${size}
                </div>
            </div>
        `,
        footerButtons: [
            {
                text: 'Continue Shopping',
                className: 'btn-secondary',
                onClick: (e, modal) => {
                    modalManager.close(modal);
                }
            },
            {
                text: 'View Cart',
                className: 'btn-primary',
                onClick: (e, modal) => {
                    modalManager.close(modal);
                    showCartModal(); // From cart.js
                }
            }
        ]
    });
}

/**
 * Handles the wishlist action
 */
function handleWishlist() {
    // In a real application, this would add the product to the user's wishlist
    // For this example, we'll just show a message
    modalManager.alert('Item added to your wishlist!', 'Wishlist');
}

/**
 * Handles the share action
 */
function handleShare() {
    const shareModal = modalManager.open({
        title: 'Share This Product',
        content: `
            <div class="share-options">
                <p>Share this product with your friends and family:</p>
                <div class="social-share-buttons">
                    <a href="#" class="share-btn facebook">
                        <i class="fab fa-facebook-f"></i> Facebook
                    </a>
                    <a href="#" class="share-btn twitter">
                        <i class="fab fa-twitter"></i> Twitter
                    </a>
                    <a href="#" class="share-btn pinterest">
                        <i class="fab fa-pinterest-p"></i> Pinterest
                    </a>
                    <a href="#" class="share-btn email">
                        <i class="fas fa-envelope"></i> Email
                    </a>
                </div>
                <div class="share-link">
                    <p>Or copy this link:</p>
                    <div class="link-container">
                        <input type="text" id="share-link" value="${window.location.href}" readonly>
                        <button id="copy-link" class="btn btn-secondary">Copy</button>
                    </div>
                </div>
            </div>
        `,
        onOpen: (modal) => {
            // Set up copy link button
            const copyBtn = modal.querySelector('#copy-link');
            const linkInput = modal.querySelector('#share-link');
            
            copyBtn.addEventListener('click', function() {
                linkInput.select();
                document.execCommand('copy');
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy';
                }, 2000);
            });
            
            // Set up social share buttons (in a real application, these would use the correct sharing URLs)
            modal.querySelectorAll('.share-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const type = this.classList.contains('facebook') ? 'facebook' :
                                this.classList.contains('twitter') ? 'twitter' :
                                this.classList.contains('pinterest') ? 'pinterest' : 'email';
                    
                    let url = '';
                    const pageUrl = encodeURIComponent(window.location.href);
                    const title = encodeURIComponent(document.title);
                    
                    switch (type) {
                        case 'facebook':
                            url = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                            break;
                        case 'twitter':
                            url = `https://twitter.com/intent/tweet?text=${title}&url=${pageUrl}`;
                            break;
                        case 'pinterest':
                            const img = document.querySelector('.main-image img');
                            const imgUrl = img ? encodeURIComponent(img.src) : '';
                            url = `https://pinterest.com/pin/create/button/?url=${pageUrl}&media=${imgUrl}&description=${title}`;
                            break;
                        case 'email':
                            url = `mailto:?subject=${title}&body=Check out this product: ${pageUrl}`;
                            break;
                    }
                    
                    if (url) {
                        window.open(url, '_blank');
                    }
                });
            });
        }
    });
}
