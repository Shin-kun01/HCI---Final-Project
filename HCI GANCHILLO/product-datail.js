// product-detail.js

document.addEventListener("DOMContentLoaded", () => {
    const productId = getProductIdFromURL();
    const product = productsDB[productId];

    const detailsContainer = document.getElementById('product-details');
    const breadcrumb = document.getElementById('product-breadcrumb');

    if (!product) {
        detailsContainer.innerHTML = `
            <div class="error-message">
                <h2>Product Not Found</h2>
                <p>The product you're looking for doesn't exist.</p>
            </div>
        `;
        return;
    }

    breadcrumb.textContent = product.name;

    detailsContainer.innerHTML = `
        <div class="product-details">
            <div class="product-images">
                <img src="${product.image}" alt="${product.name}" class="main-image">
                <div class="thumbnails">
                    ${product.thumbnails?.map(thumb => `<img src="${thumb}" class="thumbnail" alt="Thumbnail">`).join('') || ''}
                </div>
            </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <p class="price">
                    ₱${product.price}
                    ${product.original_price ? `<span class="original-price">₱${product.original_price}</span>` : ''}
                    ${product.discount ? `<span class="discount">(${product.discount} OFF)</span>` : ''}
                </p>
                <p class="description">${product.description}</p>
                
                <div class="selectors">
                    <div class="color-select">
                        <label>Color:</label>
                        <select>
                            ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                        </select>
                    </div>
                    <div class="size-select">
                        <label>Size:</label>
                        <select>
                            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                        </select>
                    </div>
                </div>

                <div class="product-actions">
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="btn btn-secondary add-to-wishlist" data-id="${product.id}">Add to Wishlist</button>
                </div>
            </div>
        </div>
    `;

    setupThumbnailPreview();
    setupAddToCart(product);
});

/**
 * Get the product ID from the URL query string.
 */
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/**
 * Setup thumbnail image click behavior.
 */
function setupThumbnailPreview() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImage.src = thumb.src;
        });
    });
}

/**
 * Set up add to cart button logic.
 */
function setupAddToCart(product) {
    document.querySelector('.add-to-cart').addEventListener('click', () => {
        addToCart(product.id);
        showToast(`${product.name} has been added to your cart.`);
    });

    document.querySelector('.add-to-wishlist').addEventListener('click', () => {
        // You can implement wishlist logic here
        showToast(`${product.name} has been added to your wishlist.`);
    });
}

/**
 * Dummy cart add function (replace with actual cart logic).
 */
function addToCart(productId) {
    // Logic to add to cart goes here (e.g., update cart state, save to localStorage)
    console.log("Added to cart:", productId);
}

/**
 * Show toast notification
 */
function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
}
