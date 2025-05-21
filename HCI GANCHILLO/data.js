/**
 * Products Database for Ganchillo
 * This file contains all product data used across the site
 */

// Product Database
const productsDB = {
    'prod1': {
        id: 'prod1',
        name: 'Manfinity Hypemode Men\'s Vacation Inspired Floral Embroidery Hollow Knit Sweater',
        price: 592,
        original_price: 697,
        discount: '15%',
        description: 'Beautifully crafted crochet sweater with floral embroidery details, perfect for casual outings.',
        colors: ['Apricot', 'Burgundy', 'Baby Blue', 'Black', 'Dusty Pink', 'Blue', 'Brown', 'Khaki'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        image: 'CATEGORIES/sweaters.png',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1',
            'https://via.placeholder.com/100x100?text=Thumb2',
            'https://via.placeholder.com/100x100?text=Thumb3',
            'https://via.placeholder.com/100x100?text=Thumb4'
        ],
        category: 'Sweaters',
        is_new: true
    },
    'prod2': {
        id: 'prod2',
        name: 'Khaki Crochet Knit Frill Mini Dress',
        price: 813,
        original_price: 999,
        discount: '19%',
        description: 'Stylish crochet mini dress with frilled hem, ideal for summer parties and beach wear.',
        colors: ['Khaki', 'White', 'Black', 'Pink'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        image: 'NEWEST_PRODUCT/summer crochet top.png',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1',
            'https://via.placeholder.com/100x100?text=Thumb2',
            'https://via.placeholder.com/100x100?text=Thumb3'
        ],
        category: 'Dresses',
        is_new: true
    },
    'prod3': {
        id: 'prod3',
        name: 'White Crochet Beach Tote Bag',
        price: 375,
        description: 'Spacious crochet tote bag, perfect for beach outings and summer vacations.',
        colors: ['White', 'Beige', 'Black'],
        sizes: ['One Size'],
        image: 'ALL_PRODUCTS-PRODUCTS_PAGE/crochettablerunner.png',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1',
            'https://via.placeholder.com/100x100?text=Thumb2'
        ],
        category: 'Bags',
        is_new: true
    },
    'prod4': {
        id: 'prod4',
        name: 'Black Crochet Bucket Hat',
        price: 250,
        description: 'Fashionable crochet bucket hat, a must-have accessory for your summer collection.',
        colors: ['Black', 'White', 'Beige', 'Pink'],
        sizes: ['S/M', 'L/XL'],
        image: 'NEWEST_PRODUCT/black crochet bucket hat.png',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1',
            'https://via.placeholder.com/100x100?text=Thumb2'
        ],
        category: 'Accessories',
        is_new: true
    },
    'prod5': {
        id: 'prod5',
        name: 'Handmade Crochet Cardigan',
        price: 725,
        original_price: 850,
        discount: '15%',
        description: 'Elegant handmade crochet cardigan, perfect for layering in any season.',
        colors: ['Cream', 'Soft Blue', 'Sage Green', 'Lavender'],
        sizes: ['S', 'M', 'L', 'XL'],
        image: 'NEWEST_PRODUCT/handmade crochet cardigan.png',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1',
            'https://via.placeholder.com/100x100?text=Thumb2'
        ],
        category: 'Sweaters',
        is_new: true
    },
    'prod6': {
        id: 'prod6',
        name: 'Summer Crochet Top',
        price: 450,
        description: 'Lightweight crochet top with delicate patterns, perfect for summer days.',
        colors: ['White', 'Sky Blue', 'Peach', 'Mint'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        image: 'CATEGORIES/Tops.png',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1',
            'https://via.placeholder.com/100x100?text=Thumb2'
        ],
        category: 'Tops',
        is_new: true
    },
    'prod7': {
        id: 'prod7',
        name: 'Boho Crochet Wall Hanging',
        price: 299,
        original_price: 350,
        discount: '15%',
        description: 'Beautiful boho-style crochet wall hanging, adds warmth and texture to any room.',
        colors: ['Natural', 'Multicolor', 'Earth Tones'],
        sizes: ['Small', 'Medium', 'Large'],
        image: 'ALL_PRODUCTS-PRODUCTS_PAGE/boho.jpg',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1',
            'https://via.placeholder.com/100x100?text=Thumb2'
        ],
        category: 'Home Decor'
    },
    'prod8': {
        id: 'prod8',
        name: 'Crochet Baby Blanket',
        price: 425,
        description: 'Soft and cozy crochet baby blanket, perfect gift for newborns.',
        colors: ['Pastel Blue', 'Pastel Pink', 'Cream', 'Mint Green'],
        sizes: ['Standard'],
        image: 'ALL_PRODUCTS-PRODUCTS_PAGE/baby blanket.jpg',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1',
            'https://via.placeholder.com/100x100?text=Thumb2'
        ],
        category: 'Home Decor'
    },
    'prod9': {
        id: 'prod9',
        name: 'Crochet Bikini Set',
        price: 520,
        original_price: 650,
        discount: '20%',
        description: 'Stylish handmade crochet bikini set, perfect for beach days and summer vacations.',
        colors: ['Turquoise', 'Coral', 'Black', 'White'],
        sizes: ['XS', 'S', 'M', 'L'],
        image: 'ALL_PRODUCTS-PRODUCTS_PAGE/bikini set.jpg',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1',
            'https://via.placeholder.com/100x100?text=Thumb2'
        ],
        category: 'Swimwear'
    },
    'prod10': {
        id: 'prod10',
        name: 'Crochet Plant Hanger',
        price: 180,
        description: 'Decorative crochet plant hanger, adds a bohemian touch to your indoor plants.',
        colors: ['Natural', 'White', 'Terracotta', 'Green'],
        sizes: ['Small', 'Medium', 'Large'],
        image: 'ALL_PRODUCTS-PRODUCTS_PAGE/planthanger.jpg',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1'
        ],
        category: 'Home Decor'
    },
    'prod11': {
        id: 'prod11',
        name: 'Crochet Market Bag',
        price: 320,
        description: 'Eco-friendly crochet market bag, perfect for grocery shopping and beach days.',
        colors: ['Natural', 'Green', 'Blue', 'Mixed'],
        sizes: ['One Size'],
        image: 'ALL_PRODUCTS-PRODUCTS_PAGE/Marketbag.jpg',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1'
        ],
        category: 'Bags'
    },
    'prod12': {
        id: 'prod12',
        name: 'Crochet Fingerless Gloves',
        price: 175,
        original_price: 220,
        discount: '20%',
        description: 'Warm and stylish crochet fingerless gloves, perfect for autumn and winter.',
        colors: ['Gray', 'Black', 'Burgundy', 'Forest Green'],
        sizes: ['S/M', 'L/XL'],
        image: 'ALL_PRODUCTS-PRODUCTS_PAGE/crochet-fingerless-gloves.jpg',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1'
        ],
        category: 'Accessories'
    },
    'prod13': {
        id: 'prod13',
        name: 'Crochet Coasters Set',
        price: 120,
        description: 'Set of 6 handmade crochet coasters, adds a rustic charm to your table.',
        colors: ['Multicolor', 'Earth Tones', 'Pastels', 'Bright Mix'],
        sizes: ['Standard'],
        image: 'ALL_PRODUCTS-PRODUCTS_PAGE/coaster set.webp',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1'
        ],
        category: 'Home Decor'
    },
    'prod14': {
        id: 'prod14',
        name: 'Crochet Throw Blanket',
        price: 850,
        original_price: 999,
        discount: '15%',
        description: 'Luxurious hand-crafted crochet throw blanket, adds warmth and style to your living space.',
        colors: ['Cream', 'Gray', 'Navy Blue', 'Rust'],
        sizes: ['Medium', 'Large'],
        image: 'ALL_PRODUCTS-PRODUCTS_PAGE/crochet throw blanket.jpg',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1'
        ],
        category: 'Home Decor'
    },
    'prod15': {
        id: 'prod15',
        name: 'Crochet Crop Top',
        price: 395,
        description: 'Trendy crochet crop top, perfect for festivals and summer outings.',
        colors: ['White', 'Black', 'Pink', 'Turquoise'],
        sizes: ['XS', 'S', 'M', 'L'],
        image: 'ALL_PRODUCTS-PRODUCTS_PAGE/croptop.jpg',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1'
        ],
        category: 'Tops'
    },
    'prod16': {
        id: 'prod16',
        name: 'Chunky Crochet Scarf',
        price: 280,
        original_price: 350,
        discount: '20%',
        description: 'Soft, chunky crochet scarf, keeps you cozy during colder months.',
        colors: ['Mustard', 'Gray', 'Burgundy', 'Forest Green'],
        sizes: ['One Size'],
        image: 'ALL_PRODUCTS-PRODUCTS_PAGE/super-chunky-scarf.jpg',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1'
        ],
        category: 'Accessories'
    },
    'prod17': {
        id: 'prod17',
        name: 'Crochet Mesh Beach Cover Up',
        price: 480,
        description: 'Stylish crochet mesh beach cover up, perfect for beach days and resort wear.',
        colors: ['White', 'Beige', 'Turquoise', 'Black'],
        sizes: ['S/M', 'L/XL'],
        image: 'ALL_PRODUCTS-PRODUCTS_PAGE/crochet mesh beach cover up.png',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1'
        ],
        category: 'Swimwear'
    },
    'prod18': {
        id: 'prod18',
        name: 'Crochet Cushion Covers',
        price: 230,
        original_price: 285,
        discount: '20%',
        description: 'Set of 2 decorative crochet cushion covers, adds texture and warmth to your home decor.',
        colors: ['Cream', 'Gray', 'Mustard', 'Teal'],
        sizes: ['18x18 inches'],
        image: 'ALL_PRODUCTS-PRODUCTS_PAGE/crochet cushion covers.png',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1'
        ],
        category: 'Home Decor'
    },
    'prod19': {
        id: 'prod19',
        name: 'Crochet Headband',
        price: 120,
        description: 'Stylish and cozy crochet headband, perfect for keeping ears warm with a touch of style.',
        colors: ['Gray', 'Pink', 'Cream', 'Black'],
        sizes: ['One Size'],
        image: 'ALL_PRODUCTS-PRODUCTS_PAGE/crochet headband.png',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1'
        ],
        category: 'Accessories'
    },
    'prod20': {
        id: 'prod20',
        name: 'Crochet Table Runner',
        price: 320,
        original_price: 380,
        discount: '16%',
        description: 'Elegant crochet table runner, adds a delicate touch to your dining table.',
        colors: ['Cream', 'White', 'Gray', 'Light Blue'],
        sizes: ['Small', 'Medium', 'Large'],
        image: 'ALL_PRODUCTS-PRODUCTS_PAGE/crochettablerunner.png',
        thumbnails: [
            'https://via.placeholder.com/100x100?text=Thumb1'
        ],
        category: 'Home Decor'
    }
};

// Helper methods to get products
function getAllProducts() {
    return Object.values(productsDB);
}

function getNewestProducts() {
    return Object.values(productsDB).filter(product => product.is_new).slice(0, 6);
}

function getProductById(productId) {
    return productsDB[productId] || null;
}

function getRelatedProducts(productId, limit = 4) {
    const product = getProductById(productId);
    if (!product) return [];
    
    // Get products with the same category, excluding the current one
    const related = Object.values(productsDB)
        .filter(p => p.category === product.category && p.id !== productId)
        .slice(0, limit);
    
    // If we don't have enough, add some random products from other categories
    if (related.length < limit) {
        const others = Object.values(productsDB)
            .filter(p => p.category !== product.category && p.id !== productId)
            .sort(() => 0.5 - Math.random())
            .slice(0, limit - related.length);
            
        return [...related, ...others];
    }
    
    return related;
}

function getProductsByCategory(category) {
    if (category === 'all') return getAllProducts();
    return Object.values(productsDB).filter(product => product.category === category);
}

function sortProducts(products, sortBy) {
    const sortedProducts = [...products];
    
    switch (sortBy) {
        case 'price-low':
            return sortedProducts.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sortedProducts.sort((a, b) => b.price - a.price);
        case 'newest':
            return sortedProducts.sort((a, b) => a.is_new ? -1 : b.is_new ? 1 : 0);
        case 'discount':
            return sortedProducts.sort((a, b) => {
                if (!a.discount && !b.discount) return 0;
                if (!a.discount) return 1;
                if (!b.discount) return -1;
                
                const aDiscount = parseInt(a.discount);
                const bDiscount = parseInt(b.discount);
                return bDiscount - aDiscount;
            });
        default: // featured
            return sortedProducts;
    }
}

function searchProducts(query) {
    if (!query || query.trim() === '') return [];
    
    query = query.toLowerCase().trim();
    
    return Object.values(productsDB).filter(product => {
        return product.name.toLowerCase().includes(query) || 
               product.description.toLowerCase().includes(query) ||
               product.category.toLowerCase().includes(query);
    });
}