document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation
    const formElements = {
        email: document.getElementById('email'),
        fullName: document.getElementById('full-name'),
        address: document.getElementById('address'),
        city: document.getElementById('city'),
        zipCode: document.getElementById('zip-code'),
        cardNumber: document.getElementById('card-number'),
        expiryDate: document.getElementById('expiry-date'),
        cvv: document.getElementById('cvv')
    };

    const errorElements = {
        email: document.getElementById('email-error'),
        fullName: document.getElementById('full-name-error'),
        address: document.getElementById('address-error'),
        city: document.getElementById('city-error'),
        zipCode: document.getElementById('zip-code-error'),
        cardNumber: document.getElementById('card-number-error'),
        expiryDate: document.getElementById('expiry-date-error'),
        cvv: document.getElementById('cvv-error')
    };
    
    // Show error messages by default
    Object.values(errorElements).forEach(element => {
        if (element) {
            element.style.display = 'block';
        }
    });

    // Payment method selection
    const paymentOptions = document.querySelectorAll('.payment-option');
    const creditCardForm = document.getElementById('credit-card-form');

    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            paymentOptions.forEach(o => o.classList.remove('selected'));
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Show/hide credit card form based on selection
            if (this.id === 'credit-card-option') {
                creditCardForm.style.display = 'block';
            } else {
                creditCardForm.style.display = 'none';
            }
        });
    });

    // Input validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateCardNumber(cardNumber) {
        // Remove spaces and dashes
        cardNumber = cardNumber.replace(/\s+/g, '').replace(/-/g, '');
        // Check if it contains only digits and has a valid length
        return /^\d{13,19}$/.test(cardNumber);
    }

    function validateExpiryDate(expiryDate) {
        // Format should be MM/YY
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return false;
        
        const [month, year] = expiryDate.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits of year
        const currentMonth = currentDate.getMonth() + 1; // getMonth() is 0-indexed
        
        // Check if month is valid (1-12)
        if (Number(month) < 1 || Number(month) > 12) return false;
        
        // Check if the expiry date is in the future
        if (Number(year) < currentYear || (Number(year) === currentYear && Number(month) < currentMonth)) {
            return false;
        }
        
        return true;
    }

    function validateCVV(cvv) {
        // CVV should be 3-4 digits
        return /^\d{3,4}$/.test(cvv);
    }

    // Form input handlers with validation
    formElements.email.addEventListener('blur', function() {
        if (!this.value) {
            errorElements.email.textContent = 'Please enter a valid email address.';
        } else if (!validateEmail(this.value)) {
            errorElements.email.textContent = 'Please enter a valid email address.';
        } else {
            errorElements.email.textContent = '';
        }
    });

    formElements.fullName.addEventListener('blur', function() {
        if (!this.value) {
            errorElements.fullName.textContent = 'Please enter your full name.';
        } else {
            errorElements.fullName.textContent = '';
        }
    });

    formElements.address.addEventListener('blur', function() {
        if (!this.value) {
            errorElements.address.textContent = 'Please enter your address.';
        } else {
            errorElements.address.textContent = '';
        }
    });

    formElements.city.addEventListener('blur', function() {
        if (!this.value) {
            errorElements.city.textContent = 'Please enter your city.';
        } else {
            errorElements.city.textContent = '';
        }
    });

    formElements.zipCode.addEventListener('blur', function() {
        if (!this.value) {
            errorElements.zipCode.textContent = 'Please enter a valid zip code.';
        } else {
            errorElements.zipCode.textContent = '';
        }
    });

    formElements.cardNumber.addEventListener('input', function() {
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

    formElements.cardNumber.addEventListener('blur', function() {
        const cardNumber = this.value.replace(/\s+/g, '');
        if (!cardNumber) {
            errorElements.cardNumber.textContent = 'Please enter a valid card number.';
        } else if (!validateCardNumber(cardNumber)) {
            errorElements.cardNumber.textContent = 'Please enter a valid card number.';
        } else {
            errorElements.cardNumber.textContent = '';
        }
    });

    formElements.expiryDate.addEventListener('input', function() {
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

    formElements.expiryDate.addEventListener('blur', function() {
        if (!this.value) {
            errorElements.expiryDate.textContent = 'Please enter a valid date.';
        } else if (!validateExpiryDate(this.value)) {
            errorElements.expiryDate.textContent = 'Please enter a valid date.';
        } else {
            errorElements.expiryDate.textContent = '';
        }
    });

    formElements.cvv.addEventListener('blur', function() {
        if (!this.value) {
            errorElements.cvv.textContent = 'Please enter your CVV.';
        } else if (!validateCVV(this.value)) {
            errorElements.cvv.textContent = 'Please enter a valid CVV.';
        } else {
            errorElements.cvv.textContent = '';
        }
    });

    // Form submission handler
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            
            // Validate customer details
            if (!formElements.email.value || !validateEmail(formElements.email.value)) {
                errorElements.email.textContent = 'Please enter a valid email address.';
                isValid = false;
            }
            
            if (!formElements.fullName.value) {
                errorElements.fullName.textContent = 'Please enter your full name.';
                isValid = false;
            }
            
            if (!formElements.address.value) {
                errorElements.address.textContent = 'Please enter your address.';
                isValid = false;
            }
            
            if (!formElements.city.value) {
                errorElements.city.textContent = 'Please enter your city.';
                isValid = false;
            }
            
            if (!formElements.zipCode.value) {
                errorElements.zipCode.textContent = 'Please enter a valid zip code.';
                isValid = false;
            }
            
            // Validate payment details if credit card is selected
            const creditCardOption = document.getElementById('credit-card-option');
            if (creditCardOption.classList.contains('selected')) {
                if (!formElements.cardNumber.value || !validateCardNumber(formElements.cardNumber.value)) {
                    errorElements.cardNumber.textContent = 'Please enter a valid card number.';
                    isValid = false;
                }
                
                if (!formElements.expiryDate.value || !validateExpiryDate(formElements.expiryDate.value)) {
                    errorElements.expiryDate.textContent = 'Please enter a valid date.';
                    isValid = false;
                }
                
                if (!formElements.cvv.value || !validateCVV(formElements.cvv.value)) {
                    errorElements.cvv.textContent = 'Please enter a valid CVV.';
                    isValid = false;
                }
            }
            
            if (isValid) {
                // Simulate successful order placement
                alert('Order placed successfully!');
                // Redirect to a confirmation page or clear the cart
                window.location.href = 'index.html';
            } else {
                // Scroll to the first error
                const firstError = document.querySelector('.error-message:not(:empty)');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    // Close button functionality
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // Back to cart button
    const backToCartBtn = document.querySelector('.back-to-cart');
    if (backToCartBtn) {
        backToCartBtn.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }
});