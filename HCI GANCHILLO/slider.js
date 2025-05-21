/**
 * Image Slider for Ganchillo Homepage
 * Handles automatic image transitions with customizable options
 */

class ImageSlider {
    constructor(options = {}) {
        this.currentSlide = 0;
        this.autoplayTimeout = null;
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.slider-prev');
        this.nextBtn = document.querySelector('.slider-next');
        
        // Default options
        this.options = {
            autoplay: options.autoplay !== undefined ? options.autoplay : true,
            autoplaySpeed: options.autoplaySpeed || 5000,
            fade: options.fade !== undefined ? options.fade : true
        };
        
        if (this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        // Setup UI
        this.setupUI();
        
        // Start autoplay if enabled
        if (this.options.autoplay) {
            this.startAutoplay();
        }
        
        // Add event listeners
        this.addEventListeners();
    }
    
    setupUI() {
        // Hide all slides except the first one
        this.slides.forEach((slide, index) => {
            if (index !== 0) {
                slide.classList.remove('active');
            }
        });
        
        // Activate first indicator
        if (this.indicators.length > 0) {
            this.indicators[0].classList.add('active');
        }
    }
    
    addEventListeners() {
        // Previous button
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.gotoSlide(this.currentSlide - 1);
                
                // Reset autoplay
                if (this.options.autoplay) {
                    this.stopAutoplay();
                    this.startAutoplay();
                }
            });
        }
        
        // Next button
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.gotoSlide(this.currentSlide + 1);
                
                // Reset autoplay
                if (this.options.autoplay) {
                    this.stopAutoplay();
                    this.startAutoplay();
                }
            });
        }
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.gotoSlide(index);
                
                // Reset autoplay
                if (this.options.autoplay) {
                    this.stopAutoplay();
                    this.startAutoplay();
                }
            });
        });
        
        // Pause autoplay on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer && this.options.autoplay) {
            sliderContainer.addEventListener('mouseenter', () => {
                this.stopAutoplay();
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                this.startAutoplay();
            });
        }
        
        // Touch swipe functionality
        if (sliderContainer) {
            let touchStartX = 0;
            let touchEndX = 0;
            
            sliderContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            sliderContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe(touchStartX, touchEndX);
            });
        }
    }
    
    handleSwipe(startX, endX) {
        const diff = startX - endX;
        const threshold = 50; // Minimum distance to register as swipe
        
        if (diff > threshold) {
            // Swipe left, go to next slide
            this.gotoSlide(this.currentSlide + 1);
        } else if (diff < -threshold) {
            // Swipe right, go to previous slide
            this.gotoSlide(this.currentSlide - 1);
        }
        
        // Reset autoplay
        if (this.options.autoplay) {
            this.stopAutoplay();
            this.startAutoplay();
        }
    }
    
    gotoSlide(index) {
        // Get correct index (loop around if needed)
        const slideCount = this.slides.length;
        const newIndex = (index + slideCount) % slideCount;
        
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.remove('active');
        }
        
        // Add active class to new slide and indicator
        this.slides[newIndex].classList.add('active');
        if (this.indicators[newIndex]) {
            this.indicators[newIndex].classList.add('active');
        }
        
        // Update current slide index
        this.currentSlide = newIndex;
    }
    
    startAutoplay() {
        this.autoplayTimeout = setInterval(() => {
            this.gotoSlide(this.currentSlide + 1);
        }, this.options.autoplaySpeed);
    }
    
    stopAutoplay() {
        clearInterval(this.autoplayTimeout);
    }
}

// Initialize slider on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Check if slider exists on the page
    if (document.querySelector('.slider-container')) {
        const slider = new ImageSlider({
            autoplay: true,
            autoplaySpeed: 5000,
            fade: true
        });
    }
});