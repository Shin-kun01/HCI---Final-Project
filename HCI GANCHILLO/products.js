/**
 * Products Module for Ganchillo
 * Handles product loading, filtering, and display
 */

class ProductsManager {
    constructor() {
        this.currentCategory = 'all';
        this.currentSort = 'featured';
        this.searchQuery = '';
        this.setupEvents();
        this.loadProducts();
    }
    
    // Load products into different sections
    loadProducts() {
        this.loadNewestProducts();
        this.loadAllProducts();
        this.loadProductDetails();
    }
    
    // Load newest products for homepage
    loadNewestProducts() {
        const newestProductsContainer = document.getElementById('newest-products');
        if (!newestProductsContainer) return;
        
        const products = getNewestProducts();
        
        if (products.length === 0) {
            newestProductsContainer.innerHTML = '<p>No products found.</p>';
            return;
        }
        
        newestProductsContainer.innerHTML = this.renderProductGrid(products);
        this.setupProductButtons();
    }
    
    // Load all products for products page
    loadAllProducts() {
        const allProductsContainer = document.getElementById('all-products');
        if (!allProductsContainer) return;
        
        // Get products
        let products = getAllProducts();
        
        // Apply category filter
        if (this.currentCategory !== 'all') {
            products = products.filter(product => product.category === this.currentCategory);
        }
        
        // Apply search filter
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            products = products.filter(product => {
                return product.name.toLowerCase().includes(query) || 
                       product.description.toLowerCase().includes(query) ||
                       product.category.toLowerCase().includes(query);
            });
        }
        
        // Apply sorting
        products = sortProducts(products, this.currentSort);
        
        if (products.length === 0) {
            allProductsContainer.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters or search criteria.</p>
                </div>
            `;
            return;
        }
        
        allProductsContainer.innerHTML = this.renderProductGrid(products);
        this.setupProductButtons();
    }
    
    // Load product details for product page
    loadProductDetails() {
        const productDetailsContainer = document.getElementById('product-details');
        if (!productDetailsContainer) return;
        
        // Get product ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (!productId) {
            productDetailsContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h2>Product Not Found</h2>
                    <p>The product you are looking for could not be found.</p>
                    <a href="products.html" class="btn btn-primary">Browse Products</a>
                </div>
            `;
            return;
        }
        
        const product = getProductById(productId);
        
        if (!product) {
            productDetailsContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h2>Product Not Found</h2>
                    <p>The product you are looking for could not be found.</p>
                    <a href="products.html" class="btn btn-primary">Browse Products</a>
                </div>
            `;
            return;
        }
        
        // Update page title and breadcrumb
        document.title = `${product.name} - Ganchillo`;
        const breadcrumb = document.getElementById('product-breadcrumb');
        if (breadcrumb) {
            breadcrumb.textContent = product.name;
        }
        
        // Render product details
        productDetailsContainer.innerHTML = this.renderProductDetails(product);
        
        // Setup color and size options
        this.setupProductOptions();
        
        // Setup quantity control
        this.setupQuantityControl();
        
        // Load related products
        this.loadRelatedProducts(productId);
    }
    
    // Load related products for product page
    loadRelatedProducts(productId) {
        const relatedProductsContainer = document.getElementById('related-products');
        if (!relatedProductsContainer) return;
        
        const relatedProducts = getRelatedProducts(productId, 4);
        
        if (relatedProducts.length === 0) {
            relatedProductsContainer.style.display = 'none';
            return;
        }
        
        relatedProductsContainer.innerHTML = this.renderProductGrid(relatedProducts);
        this.setupProductButtons();
    }
    
    // Render a grid of products
    renderProductGrid(products) {
        return products.map(product => `
            <div class="product-card" data-product-id="${product.id}" data-category="${product.category}">
                <div class="product-image">
                    <a href="product.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}">
                    </a>
                </div>
                <div class="product-details">
                    <h3 class="product-title">
                        <a href="product.html?id=${product.id}">${product.name}</a>
                    </h3>
                    <div class="product-price">
                        ₱${product.price} 
                        ${product.original_price ? `
                            <span class="original-price">₱${product.original_price}</span>
                            <span class="discount-badge">${product.discount} OFF</span>
                        ` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-secondary view-details-btn" 
                                data-product-id="${product.id}"
                                data-product-name="${product.name}"
                                data-product-price="₱${product.price}"
                                ${product.original_price ? `
                                    data-original-price="₱${product.original_price}"
                                    data-discount="${product.discount}"
                                ` : ''}
                                data-product-image="${product.image}"
                                data-product-desc="${product.description}">
                            View Details
                        </button>
                        <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Render detailed product page
    renderProductDetails(product) {
        return `
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <div class="product-info-price">
                    ₱${product.price}
                    ${product.original_price ? `
                        <span class="original-price">₱${product.original_price}</span>
                        <span class="discount-badge">${product.discount} OFF</span>
                    ` : ''}
                </div>
                <div class="product-info-description">
                    ${product.description}
                </div>
                
                <div class="product-detail-options">
                    ${product.colors && product.colors.length > 0 ? `
                        <div class="option-group">
                            <h3>Color</h3>
                            <div class="color-options">
                                ${product.colors.map((color, index) => `
                                    <div class="color-option ${index === 0 ? 'selected' : ''}" 
                                        data-color="${color}" 
                                        style="background-color: ${this.getColorCode(color)};"
                                        title="${color}">
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${product.sizes && product.sizes.length > 0 ? `
                        <div class="option-group">
                            <h3>Size</h3>
                            <div class="size-options">
                                ${product.sizes.map((size, index) => `
                                    <div class="size-option ${index === 0 ? 'selected' : ''}" 
                                        data-size="${size}">
                                        ${size}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
                
                <div class="quantity-control">
                    <h3>Quantity</h3>
                    <div class="quantity-buttons">
                        <button class="quantity-btn decrease-btn">-</button>
                        <input type="number" class="quantity-input" value="1" min="1" max="99">
                        <button class="quantity-btn increase-btn">+</button>
                    </div>
                </div>
                
                <div class="product-actions-detail">
                    <button class="btn btn-primary add-to-cart-btn" 
                            data-product-id="${product.id}">
                        Add to Cart
                    </button>
                    <button class="btn btn-secondary add-to-wishlist-btn" 
                            data-product-id="${product.id}">
                        <i class="far fa-heart"></i> Add to Wishlist
                    </button>
                </div>
                
                <div class="product-meta">
                    <p><strong>Category:</strong> ${product.category}</p>
                </div>
            </div>
        `;
    }
    
    // Get color code from color name
    getColorCode(colorName) {
        const colorMap = {
            'Black': '#000000',
            'White': '#FFFFFF',
            'Red': '#FF0000',
            'Blue': '#0000FF',
            'Green': '#008000',
            'Yellow': '#FFFF00',
            'Purple': '#800080',
            'Pink': '#FFC0CB',
            'Orange': '#FFA500',
            'Brown': '#A52A2A',
            'Gray': '#808080',
            'Beige': '#F5F5DC',
            'Turquoise': '#40E0D0',
            'Gold': '#FFD700',
            'Silver': '#C0C0C0',
            'Navy': '#000080',
            'Teal': '#008080',
            'Lavender': '#E6E6FA',
            'Mint': '#98FB98',
            'Coral': '#FF7F50',
            'Burgundy': '#800020',
            'Khaki': '#F0E68C',
            'Sage Green': '#9CAF88',
            'Dusty Pink': '#DCABAB',
            'Baby Blue': '#89CFF0',
            'Cream': '#FFFDD0',
            'Apricot': '#FBCEB1',
            'Peach': '#FFE5B4',
            'Forest Green': '#228B22',
            'Sky Blue': '#87CEEB',
            'Mustard': '#E1AD01',
            'Terracotta': '#E2725B',
            'Natural': '#E8D4B4',
            'Multicolor': 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
            'Earth Tones': 'linear-gradient(to right, #a08679, #b6a587, #704f38)',
            'Pastels': 'linear-gradient(to right, #ffcccc, #ccffcc, #ccccff)',
            'Light Blue': '#ADD8E6',
            'Soft Blue': '#B0C4DE',
            'Mixed': 'linear-gradient(to right, #f6d8ce, #ceebf6, #d8f6ce)'
        };
        
        return colorMap[colorName] || '#CCCCCC';
    }
    
    // Setup product option selection (colors, sizes)
    setupProductOptions() {
        // Color options
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove selected class from all options
                colorOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to clicked option
                option.classList.add('selected');
            });
        });
        
        // Size options
        const sizeOptions = document.querySelectorAll('.size-option');
        sizeOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove selected class from all options
                sizeOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to clicked option
                option.classList.add('selected');
            });
        });
    }
    
    // Setup quantity control for product page
    setupQuantityControl() {
        const decreaseBtn = document.querySelector('.decrease-btn');
        const increaseBtn = document.querySelector('.increase-btn');
        const quantityInput = document.querySelector('.quantity-input');
        
        if (!decreaseBtn || !increaseBtn || !quantityInput) return;
        
        decreaseBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value) - 1;
            if (quantity < 1) quantity = 1;
            quantityInput.value = quantity;
        });
        
        increaseBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value) + 1;
            if (quantity > 99) quantity = 99;
            quantityInput.value = quantity;
        });
        
        quantityInput.addEventListener('change', () => {
            let quantity = parseInt(quantityInput.value);
            if (isNaN(quantity) || quantity < 1) quantity = 1;
            if (quantity > 99) quantity = 99;
            quantityInput.value = quantity;
        });
    }
    
    // Setup event listeners for product buttons
    // Setup event listeners for product buttons
setupProductButtons() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            
            // Get selected options if on product page
            let options = {};
            let quantity = 1;

            // Check if the button is in the product modal or product grid
            const isInModal = button.closest('#product-modal') !== null;

            if (isInModal) {
                // If in modal, retrieve options from modal
                const selectedColor = document.querySelector('.color-option.selected');
                const selectedSize = document.querySelector('.size-option.selected');
                const quantityInput = document.querySelector('.quantity-input');

                if (selectedColor) {
                    options.color = selectedColor.dataset.color;
                }

                if (selectedSize) {
                    options.size = selectedSize.dataset.size;
                }

                if (quantityInput) {
                    quantity = parseInt(quantityInput.value);
                    if (isNaN(quantity) || quantity < 1) quantity = 1;
                    if (quantity > 99) quantity = 99;
                }
            } else {
                // If in product grid, retrieve options from grid
                const selectedColor = document.querySelector('.color-option.selected');
                const selectedSize = document.querySelector('.size-option.selected');
                const quantityInput = document.querySelector('.quantity-input');

                if (selectedColor) {
                    options.color = selectedColor.dataset.color;
                }

                if (selectedSize) {
                    options.size = selectedSize.dataset.size;
                }

                if (quantityInput) {
                    quantity = parseInt(quantityInput.value);
                    if (isNaN(quantity) || quantity < 1) quantity = 1;
                    if (quantity > 99) quantity = 99;
                }
            }

            if (window.addToCart) {
                window.addToCart(productId, quantity, options);
            }
        });
    });

    // Add to wishlist buttons
    document.querySelectorAll('.add-to-wishlist-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;

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
        });
    });
}

    
    // Setup event listeners for filters and search
    setupEvents() {
        document.addEventListener('DOMContentLoaded', () => {
            // Category filter buttons
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    // Update category filter
                    this.currentCategory = button.dataset.category;
                    
                    // Reload products
                    this.loadAllProducts();
                });
            });
            
            // Sort select
            const sortSelect = document.getElementById('sort-select');
            if (sortSelect) {
                sortSelect.addEventListener('change', () => {
                    this.currentSort = sortSelect.value;
                    this.loadAllProducts();
                });
            }
            
            // Search input
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.addEventListener('input', () => {
                    this.searchQuery = searchInput.value;
                });
                
                // Search on Enter key
                searchInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        this.loadAllProducts();
                    }
                });
                
                // Search button
                const searchBtn = document.querySelector('.search-btn');
                if (searchBtn) {
                    searchBtn.addEventListener('click', () => {
                        this.searchQuery = searchInput.value;
                        this.loadAllProducts();
                    });
                }
            }
        });
    }
}

// Initialize products manager
const productsManager = new ProductsManager();