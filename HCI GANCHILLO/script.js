// Sample product data
const products = [
    {
        id: 1,
        name: 'Manfinity Hypemode Men\'s Vacation Inspired Floral Embroidery Hollow Knit Sweater',
        price: 592,
        description: 'Stylish knit sweater with floral embroidery',
        image: 'https://via.placeholder.com/200x200?text=Sweater',
        variants: ['Default', 'Apricot'],
        sizes: ['One Size', 'M', 'L', 'XL']
    },
    {
        id: 2,
        name: 'Classic Denim Jacket',
        price: 850,
        description: 'Timeless denim jacket with premium quality materials',
        image: 'https://via.placeholder.com/200x200?text=Jacket',
        variants: ['Blue', 'Black'],
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: 3,
        name: 'Premium Cotton T-Shirt',
        price: 350,
        description: 'Soft and comfortable premium cotton t-shirt',
        image: 'https://via.placeholder.com/200x200?text=TShirt',
        variants: ['White', 'Black', 'Gray'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    }
];

// DOM Elements
const mainContent = document.getElementById('mainContent');
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize application
function initApp() {
    renderProducts();
    updateCartCount();

    // Add event listeners
    cartIcon.addEventListener('click', showCart);
}

// Render products on the homepage
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">₱${product.price}</p>
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // For simplicity, we're just adding the product with default options
    const cartItem = {
        id: Date.now(), // Unique ID for the cart item
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        variant: product.variants[0],
        size: product.sizes[0]
    };
    
    cart.push(cartItem);
    saveCart();
    updateCartCount();
    
    // Show the cart after adding an item
    showCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update the cart count indicator
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Remove an item from the cart
function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.id !== cartItemId);
    saveCart();
    updateCartCount();
    renderCart();
}

// Update the quantity of a cart item
function updateCartItemQuantity(cartItemId, newQuantity) {
    if (newQuantity < 1) return;
    
    const itemIndex = cart.findIndex(item => item.id === cartItemId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        saveCart();
        updateCartCount();
        renderCart();
    }
}

// Calculate cart totals
function calculateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 500 : 0; // ₱500 shipping fee
    const tax = Math.round(subtotal * 0.1 * 10) / 10; // 10% tax, rounded to 1 decimal
    const total = subtotal + shipping + tax;
    
    return {
        subtotal,
        shipping,
        tax,
        total
    };
}

// Show the shopping cart
function showCart() {
    mainContent.innerHTML = '';
    
    const cartContainer = document.createElement('div');
    cartContainer.innerHTML = `
        <div class="cart-header">
            <span>SHOPPING CART</span>
            <button class="close-btn">&times;</button>
        </div>
        <div class="cart-container"></div>
    `;
    
    mainContent.appendChild(cartContainer);
    
    // Add event listener to close button
    const closeBtn = cartContainer.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        renderProducts();
    });
    
    renderCart();
}

// Render the contents of the cart
function renderCart() {
    const cartContainer = document.querySelector('.cart-container');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>You haven't added any items to your cart yet.</p>
                <button class="continue-shopping-btn">CONTINUE SHOPPING</button>
            </div>
        `;
        
        const continueBtn = cartContainer.querySelector('.continue-shopping-btn');
        continueBtn.addEventListener('click', renderProducts);
    } else {
        const totals = calculateCartTotals();
        
        cartContainer.innerHTML = `
            <div class="cart-items">
                ${cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h3 class="cart-item-name">${item.name}</h3>
                            <p class="cart-item-price">₱${item.price}</p>
                            <p class="cart-item-variant">Color: ${item.variant}, Size: ${item.size}</p>
                            <div class="quantity-control">
                                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            </div>
                        </div>
                        <button class="remove-btn" data-id="${item.id}">Remove</button>
                    </div>
                `).join('')}
            </div>
            
            <div class="shipping-calculator">
                <h3>Is your cart eligible for free shipping? Enter your zip code.</h3>
                <div class="zip-form">
                    <input type="text" id="zip-code-input" placeholder="Enter ZIP code" class="form-input">
                    <button id="check-shipping-btn" class="shipping-btn">Find out</button>
                </div>
            </div>
            
            <div class="cart-summary">
                <div class="summary-row">
                    <span class="summary-label">Subtotal</span>
                    <span class="summary-value">₱${totals.subtotal}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Shipping</span>
                    <span class="summary-value">₱${totals.shipping}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Tax</span>
                    <span class="summary-value">₱${totals.tax}</span>
                </div>
                <div class="summary-row total-row">
                    <span class="summary-label">Total</span>
                    <span class="summary-value">₱${totals.total}</span>
                </div>
            </div>
            
            <div class="cart-actions">
                <button class="continue-shopping-btn">CONTINUE SHOPPING</button>
                <button class="checkout-btn">PROCEED TO CHECKOUT</button>
            </div>
        `;
        
        // Add event listeners to buttons
        const continueShopping = cartContainer.querySelector('.continue-shopping-btn');
        const proceedToCheckout = cartContainer.querySelector('.checkout-btn');
        const minusButtons = cartContainer.querySelectorAll('.quantity-btn.minus');
        const plusButtons = cartContainer.querySelectorAll('.quantity-btn.plus');
        const removeButtons = cartContainer.querySelectorAll('.remove-btn');
        
        continueShopping.addEventListener('click', renderProducts);
        proceedToCheckout.addEventListener('click', showCheckout);
        
        minusButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.getAttribute('data-id'));
                const item = cart.find(i => i.id === itemId);
                if (item && item.quantity > 1) {
                    updateCartItemQuantity(itemId, item.quantity - 1);
                }
            });
        });
        
        plusButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.getAttribute('data-id'));
                const item = cart.find(i => i.id === itemId);
                if (item) {
                    updateCartItemQuantity(itemId, item.quantity + 1);
                }
            });
        });
        
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.getAttribute('data-id'));
                removeFromCart(itemId);
            });
        });
    }
}

// Show checkout page
function showCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to proceed to checkout.');
        return;
    }
    
    mainContent.innerHTML = '';
    
    const totals = calculateCartTotals();
    
    const checkoutContainer = document.createElement('div');
    checkoutContainer.innerHTML = `
        <div class="checkout-header">
            <span>CHECKOUT</span>
            <button class="back-to-cart"><i class="fas fa-arrow-left"></i> Back to Cart</button>
            <button class="close-btn">&times;</button>
        </div>
        
        <div class="checkout-container">
            <div class="checkout-form">
                <form id="checkout-form">
                    <!-- Customer Details Section -->
                    <div class="section-title">Customer Details</div>
                    
                    <div class="form-group">
                        <label for="email" class="form-label">Email Address</label>
                        <input type="email" id="email" name="email" class="form-input" required>
                        <p id="email-error" class="error-message">Please enter a valid email address.</p>
                    </div>
                    
                    <div class="form-group">
                        <label for="full-name" class="form-label">Full Name</label>
                        <input type="text" id="full-name" name="full_name" class="form-input" required>
                        <p id="full-name-error" class="error-message">Please enter your full name.</p>
                    </div>
                    
                    <div class="form-group">
                        <label for="address" class="form-label">Address</label>
                        <input type="text" id="address" name="address" class="form-input" required>
                        <p id="address-error" class="error-message">Please enter your address.</p>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="city" class="form-label">City</label>
                            <input type="text" id="city" name="city" class="form-input" required>
                            <p id="city-error" class="error-message">Please enter your city.</p>
                        </div>
                        
                        <div class="form-group">
                            <label for="zip-code" class="form-label">Zip Code</label>
                            <input type="text" id="zip-code" name="zip_code" class="form-input" required>
                            <p id="zip-code-error" class="error-message">Please enter a valid zip code.</p>
                        </div>
                    </div>
                    
                    <!-- Payment Method Section -->
                    <div class="section-title">Payment Method</div>
                    
                    <div class="payment-options">
                        <div id="credit-card-option" class="payment-option selected">
                            <i class="fas fa-credit-card"></i>
                            <span>Credit Card</span>
                        </div>
                        
                        <div id="paypal-option" class="payment-option">
                            <i class="fab fa-paypal"></i>
                            <span>PayPal</span>
                        </div>
                        
                        <div id="bank-transfer-option" class="payment-option">
                            <i class="fas fa-university"></i>
                            <span>Bank Transfer</span>
                        </div>
                    </div>
                    
                    <!-- Credit Card Form -->
                    <div id="credit-card-form">
                        <div class="form-group">
                            <label for="card-number" class="form-label">Card Number</label>
                            <input type="text" id="card-number" name="card_number" class="form-input" placeholder="1234 5678 9012 3456" value="1234 5678 9012 3456">
                            <p id="card-number-error" class="error-message">Please enter a valid card number.</p>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="expiry-date" class="form-label">Expiry Date</label>
                                <input type="text" id="expiry-date" name="expiry_date" class="form-input" placeholder="MM/YY" value="MM/YY">
                                <p id="expiry-date-error" class="error-message">Please enter a valid date.</p>
                            </div>
                            
                            <div class="form-group">
                                <label for="cvv" class="form-label">CVV</label>
                                <input type="text" id="cvv" name="cvv" class="form-input" placeholder="123" value="123">
                                <p id="cvv-error" class="error-message">Please enter your CVV.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="order-summary">
                        <div class="section-title">Order Summary</div>
                        
                        ${cart.map(item => `
                            <div class="product-item">
                                <img src="${item.image}" alt="${item.name}" class="product-image">
                                <div class="product-details">
                                    <div class="product-name">${item.name}</div>
                                    <div class="product-variant">${item.variant}, ${item.size} × ${item.quantity}</div>
                                </div>
                                <div class="product-price">₱${item.price}</div>
                            </div>
                        `).join('')}
                        
                        <div class="order-totals">
                            <div class="total-row">
                                <div class="total-label">Subtotal</div>
                                <div class="total-value">₱${totals.subtotal}</div>
                            </div>
                            
                            <div class="total-row">
                                <div class="total-label">Shipping</div>
                                <div class="total-value">₱${totals.shipping}</div>
                            </div>
                            
                            <div class="total-row">
                                <div class="total-label">Tax</div>
                                <div class="total-value">₱${totals.tax}</div>
                            </div>
                            
                            <div class="total-row grand-total">
                                <div class="total-label">Total</div>
                                <div class="total-value">₱${totals.total}</div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="place-order-btn">PLACE ORDER</button>
                </form>
            </div>
        </div>
    `;
    
    mainContent.appendChild(checkoutContainer);
    
    // Add event listeners
    const closeBtn = checkoutContainer.querySelector('.close-btn');
    const backToCartBtn = checkoutContainer.querySelector('.back-to-cart');
    const paymentOptions = checkoutContainer.querySelectorAll('.payment-option');
    const checkoutForm = checkoutContainer.querySelector('#checkout-form');
    
    closeBtn.addEventListener('click', renderProducts);
    backToCartBtn.addEventListener('click', showCart);
    
    // Payment option selection
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            option.classList.add('selected');
            
            // Show/hide credit card form
            const creditCardForm = document.getElementById('credit-card-form');
            if (option.id === 'credit-card-option') {
                creditCardForm.style.display = 'block';
            } else {
                creditCardForm.style.display = 'none';
            }
        });
    });
    
    // Form submission
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        placeOrder();
    });
    
    // Credit card number formatting
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            // Format card number with spaces after every 4 digits
            let value = this.value.replace(/\s+/g, '').replace(/\D/g, '');
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            this.value = formattedValue;
        });
    }
    
    // Expiry date formatting
    const expiryDateInput = document.getElementById('expiry-date');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function() {
            // Format expiry date as MM/YY
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                let month = value.substring(0, 2);
                let year = value.substring(2, 4);
                
                if (month.length === 1 && parseInt(month) > 1) {
                    month = '0' + month;
                }
                
                if (month.length === 2) {
                    if (parseInt(month) > 12) {
                        month = '12';
                    }
                    if (year.length > 0) {
                        this.value = month + '/' + year;
                    } else {
                        this.value = month;
                    }
                } else {
                    this.value = month;
                }
            }
        });
    }
}

// Place order function
function placeOrder() {
    // In a real app, this would send data to a server
    // For demo purposes, we'll just show a confirmation and clear the cart
    
    // Show order confirmation
    mainContent.innerHTML = '';
    
    const confirmationContainer = document.createElement('div');
    confirmationContainer.innerHTML = `
        <div class="checkout-header">
            <span>ORDER CONFIRMATION</span>
            <button class="close-btn">&times;</button>
        </div>
        
        <div class="order-confirmation">
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h2>Thank you for your order!</h2>
                <p>Your order has been successfully placed.</p>
                <p>Order ID: #${Date.now().toString().substring(5)}</p>
            </div>
            
            <button class="continue-shopping-btn">CONTINUE SHOPPING</button>
        </div>
    `;
    
    mainContent.appendChild(confirmationContainer);
    
    // Add event listeners
    const closeBtn = confirmationContainer.querySelector('.close-btn');
    const continueShoppingBtn = confirmationContainer.querySelector('.continue-shopping-btn');
    
    closeBtn.addEventListener('click', () => {
        // Clear cart and return to products
        cart = [];
        saveCart();
        updateCartCount();
        renderProducts();
    });
    
    continueShoppingBtn.addEventListener('click', () => {
        // Clear cart and return to products
        cart = [];
        saveCart();
        updateCartCount();
        renderProducts();
    });
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);