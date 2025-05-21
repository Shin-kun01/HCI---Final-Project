document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart functionality
    const minusButtons = document.querySelectorAll('.quantity-btn.minus');
    const plusButtons = document.querySelectorAll('.quantity-btn.plus');
    const removeButtons = document.querySelectorAll('.remove-btn');
    const continueShopping = document.querySelector('.continue-shopping-btn');
    const closeBtn = document.querySelector('.close-btn');
    
    // Minus button functionality
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.nextElementSibling;
            const currentValue = parseInt(input.value);
            if (currentValue > 1) {
                input.value = currentValue - 1;
                updateCartTotals();
            }
        });
    });
    
    // Plus button functionality
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const currentValue = parseInt(input.value);
            input.value = currentValue + 1;
            updateCartTotals();
        });
    });
    
    // Remove button functionality
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItem.remove();
            updateCartTotals();
            
            // If cart is empty, show empty cart message
            if (document.querySelectorAll('.cart-item').length === 0) {
                const cartContainer = document.querySelector('.cart-container');
                cartContainer.innerHTML = `
                    <div class="empty-cart">
                        <h2>Your cart is empty</h2>
                        <p>You haven't added any items to your cart yet.</p>
                        <button class="continue-shopping-btn">CONTINUE SHOPPING</button>
                    </div>
                `;
                
                const continueShopping = cartContainer.querySelector('.continue-shopping-btn');
                continueShopping.addEventListener('click', function() {
                    window.location.href = 'index.html';
                });
            }
        });
    });
    
    // Continue shopping button
    if (continueShopping) {
        continueShopping.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // Calculate and update cart totals
    function updateCartTotals() {
        let subtotal = 0;
        
        // Calculate subtotal based on items in cart
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseInt(item.querySelector('.cart-item-price').textContent.replace('₱', ''));
            const quantity = parseInt(item.querySelector('.quantity-input').value);
            subtotal += price * quantity;
        });
        
        // Calculate shipping, tax, and total
        const shipping = subtotal > 0 ? 500 : 0;
        const tax = Math.round(subtotal * 0.1 * 10) / 10;
        const total = subtotal + shipping + tax;
        
        // Update summary values
        document.querySelector('.cart-summary .summary-row:nth-child(1) .summary-value').textContent = `₱${subtotal.toLocaleString()}`;
        document.querySelector('.cart-summary .summary-row:nth-child(2) .summary-value').textContent = `₱${shipping.toLocaleString()}`;
        document.querySelector('.cart-summary .summary-row:nth-child(3) .summary-value').textContent = `₱${tax.toLocaleString()}`;
        document.querySelector('.cart-summary .total-row .summary-value').textContent = `₱${total.toLocaleString()}`;
    }
    
    // Shipping calculator
    const checkShippingBtn = document.getElementById('check-shipping-btn');
    if (checkShippingBtn) {
        checkShippingBtn.addEventListener('click', function() {
            const zipCode = document.getElementById('zip-code-input').value;
            if (zipCode) {
                alert('Free shipping is available for your location!');
            } else {
                alert('Please enter a zip code.');
            }
        });
    }
});