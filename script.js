// Work Images for Gallery
const workImages = [
  {
    src: "./images/image1.jpg",
    alt: "Home Cleaning",
    title: "Home Cleaning",
    desc: "Spotless home and kitchen cleaning.",
  },
  {
    src: "./images/image2.jpg",
    alt: "Office Cleaning",
    title: "Office Cleaning",
    desc: "Professional office workspace cleaning.",
  },
  {
    src: "./images/image3.jpg",
    alt: "Glass Cleaning",
    title: "Glass Cleaning",
    desc: "Windows, mirrors, and glass surfaces.",
  },
  {
    src: "./images/image4.jpg",
    alt: "Sanitization",
    title: "Sanitization",
    desc: "Germ-free, safe environments.",
  },
  {
    src: "./images/image5.jpg",
    alt: "Pantry Upkeep",
    title: "Pantry Upkeep",
    desc: "Clean, stocked, and well-managed pantries.",
  },
  {
    src: "./images/image6.jpg",
    alt: "After Event Clean-up",
    title: "Event Clean-up",
    desc: "Post-event rapid cleaning services.",
  },
];

// Enhanced Reviews Management System
class ReviewsManager {
  constructor() {
    this.storageKey = 'shreeCleaningReviews';
    this.currentRating = 0;
    this.autoScrollInterval = null;
    this.currentIndex = 0;
    this.reviewsPerView = this.getReviewsPerView();
    this.scrollSpeed = 30; // pixels per second for auto-scroll
    
    // Initial sample reviews with dates
    this.initialReviews = [
      { 
        name: "Priya Shah", 
        rating: 5, 
        text: "Exceptional cleaning service! They transformed my home completely. Very professional team and great attention to detail.", 
        date: "2025-01-10" 
      },
      { 
        name: "Rahul Mehta", 
        rating: 4, 
        text: "Very professional team and great attention to detail. Highly recommend for office cleaning services.", 
        date: "2025-01-08" 
      },
      { 
        name: "Anjali Patel", 
        rating: 5, 
        text: "Best cleaning service in Pune! Always punctual and thorough in their work. Will definitely use again.", 
        date: "2025-01-05" 
      },
      { 
        name: "Sarvesh Walkar", 
        rating: 5, 
        text: "Outstanding service for our office cleaning needs. The team is reliable and efficient.", 
        date: "2025-01-03" 
      },
      { 
        name: "Amit Joshi", 
        rating: 4, 
        text: "Great experience with their deep cleaning service. Very satisfied with the results.", 
        date: "2024-12-28" 
      },
      { 
        name: "Sneha Kulkarni", 
        rating: 5, 
        text: "Amazing attention to detail and very professional staff. Our office has never looked better!", 
        date: "2024-12-25" 
      },
      { 
        name: "Rajesh Patil", 
        rating: 4, 
        text: "Good service and reasonable pricing. They completed the deep cleaning on time.", 
        date: "2024-12-20" 
      },
      { 
        name: "Meera Desai", 
        rating: 5, 
        text: "Excellent post-event cleaning service. They handled everything perfectly and quickly.", 
        date: "2024-12-15" 
      }
    ];
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadReviews();
    this.renderReviews();
    this.updateStats();
    this.startAutoScroll();
    this.handleResize();
  }

  getReviewsPerView() {
    const width = window.innerWidth;
    if (width < 480) return 1;
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  }

  handleResize() {
    window.addEventListener('resize', () => {
      this.reviewsPerView = this.getReviewsPerView();
      this.currentIndex = 0;
      this.updateCarouselPosition();
      this.restartAutoScroll();
    });
  }

  bindEvents() {
    // Star rating events
    const stars = document.querySelectorAll('#ratingStars i');
    stars.forEach(star => {
      star.addEventListener('mouseover', (e) => this.highlightStars(e.target.dataset.rating));
      star.addEventListener('click', (e) => this.selectRating(e.target.dataset.rating));
      star.addEventListener('mouseleave', () => this.resetStars());
    });

    // Form submission
    document.getElementById('reviewForm').addEventListener('submit', (e) => this.handleFormSubmit(e));

    // Navigation buttons
    document.getElementById('prevReview').addEventListener('click', () => this.previousReview());
    document.getElementById('nextReview').addEventListener('click', () => this.nextReview());

    // Pause auto-scroll on hover
    const carousel = document.getElementById('reviewsCarousel');
    const wrapper = document.querySelector('.reviews-carousel-wrapper');
    
    wrapper.addEventListener('mouseenter', () => this.stopAutoScroll());
    wrapper.addEventListener('mouseleave', () => this.startAutoScroll());
    
    // Touch events for mobile
    wrapper.addEventListener('touchstart', () => this.stopAutoScroll());
    wrapper.addEventListener('touchend', () => {
      setTimeout(() => this.startAutoScroll(), 3000); // Resume after 3 seconds
    });
  }

  loadReviews() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.reviews = JSON.parse(stored);
      } else {
        this.reviews = [...this.initialReviews];
        this.saveReviews();
      }
    } catch (error) {
      console.warn('Error loading reviews from localStorage:', error);
      this.reviews = [...this.initialReviews];
    }
  }

  saveReviews() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.reviews));
    } catch (error) {
      console.warn('Error saving reviews to localStorage:', error);
    }
  }

  highlightStars(rating) {
    const stars = document.querySelectorAll('#ratingStars i');
    stars.forEach(star => {
      if (star.dataset.rating <= rating) {
        star.classList.remove('far');
        star.classList.add('fas');
      } else {
        star.classList.add('far');
        star.classList.remove('fas');
      }
    });
  }

  selectRating(rating) {
    this.currentRating = parseInt(rating);
    this.highlightStars(rating);
  }

  resetStars() {
    this.highlightStars(this.currentRating);
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  createStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<i class="fas fa-star"></i>';
      } else {
        stars += '<i class="far fa-star"></i>';
      }
    }
    return stars;
  }

  renderReviews() {
    const carousel = document.getElementById('reviewsCarousel');
    if (!carousel) return;
    
    carousel.innerHTML = this.reviews.map(review => `
      <div class="review-card">
        <div class="review-header">
          <div class="reviewer-name">${this.escapeHtml(review.name)}</div>
          <div class="review-date">${this.formatDate(review.date)}</div>
        </div>
        <div class="stars">${this.createStarRating(review.rating)}</div>
        <div class="review-text">${this.escapeHtml(review.text)}</div>
      </div>
    `).join('');
    
    this.updateCarouselPosition();
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  updateStats() {
    const totalReviews = this.reviews.length;
    const averageRating = totalReviews > 0 ? 
      (this.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1) : 
      '0.0';
    const fiveStarReviews = this.reviews.filter(review => review.rating === 5).length;

    // Update DOM elements
    const totalElement = document.getElementById('totalReviews');
    const averageElement = document.getElementById('averageRating');
    const fiveStarElement = document.getElementById('fiveStarReviews');

    if (totalElement) totalElement.textContent = totalReviews;
    if (averageElement) averageElement.textContent = averageRating;
    if (fiveStarElement) fiveStarElement.textContent = fiveStarReviews;
  }

  handleFormSubmit(e) {
    e.preventDefault();
    
    if (!this.currentRating) {
      this.showMessage('Please select a rating', 'error');
      return;
    }

    const nameInput = document.getElementById('nameInput');
    const reviewText = document.getElementById('reviewText');
    
    if (!nameInput.value.trim() || !reviewText.value.trim()) {
      this.showMessage('Please fill in all fields', 'error');
      return;
    }

    const newReview = {
      name: nameInput.value.trim(),
      rating: this.currentRating,
      text: reviewText.value.trim(),
      date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    };

    // Add to beginning of array (most recent first)
    this.reviews.unshift(newReview);
    this.saveReviews();
    this.renderReviews();
    this.updateStats();

    // Reset form
    this.resetForm();
    this.showMessage('Thank you! Your review has been submitted successfully.', 'success');

    // Scroll to show new review
    this.currentIndex = 0;
    this.updateCarouselPosition();
  }

  resetForm() {
    document.getElementById('reviewForm').reset();
    this.currentRating = 0;
    const stars = document.querySelectorAll('#ratingStars i');
    stars.forEach(star => {
      star.classList.add('far');
      star.classList.remove('fas');
    });
  }

  showMessage(message, type) {
    const messageElement = document.getElementById('successMessage');
    if (!messageElement) return;
    
    messageElement.textContent = message;
    messageElement.className = `success-message ${type === 'success' ? 'show' : 'error show'}`;
    
    setTimeout(() => {
      messageElement.classList.remove('show', 'error');
    }, 3000);
  }

  startAutoScroll() {
    if (this.reviews.length <= this.reviewsPerView) return;
    
    this.stopAutoScroll();
    this.autoScrollInterval = setInterval(() => {
      this.nextReview();
    }, 4000); // Change slide every 4 seconds
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  restartAutoScroll() {
    this.stopAutoScroll();
    setTimeout(() => this.startAutoScroll(), 1000);
  }

  nextReview() {
    const maxIndex = Math.max(0, this.reviews.length - this.reviewsPerView);
    this.currentIndex = this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1;
    this.updateCarouselPosition();
  }

  previousReview() {
    const maxIndex = Math.max(0, this.reviews.length - this.reviewsPerView);
    this.currentIndex = this.currentIndex <= 0 ? maxIndex : this.currentIndex - 1;
    this.updateCarouselPosition();
    this.restartAutoScroll();
  }

  updateCarouselPosition() {
    const carousel = document.getElementById('reviewsCarousel');
    if (!carousel) return;
    
    const cardWidth = 320; // min-width of review card
    const gap = 32; // gap between cards (2rem)
    const translateX = -(this.currentIndex * (cardWidth + gap));
    
    carousel.style.transform = `translateX(${translateX}px)`;
  }
}

// Gallery functionality
function loadGallery() {
  const gallery = document.getElementById("workGallery");
  if (!gallery) return;
  
  workImages.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "gallery-item";
    div.style.animationDelay = `${index * 0.1}s`;
    div.innerHTML = `
      <img src="${item.src}" alt="${item.alt}" title="${item.title}" loading="lazy" />
      <div class="gallery-overlay">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `;
    gallery.appendChild(div);
  });
}

// Mobile menu toggle
function toggleMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  if (navLinks) {
    navLinks.classList.toggle("active");
  }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      // Close mobile menu if open
      const navLinks = document.getElementById("navLinks");
      if (navLinks) {
        navLinks.classList.remove("active");
      }
    });
  });
}

// ... (previous code remains the same until nav scroll function)

// Nav background on scroll
function initNavScroll() {
  window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (!nav) return;
    
    if (window.scrollY > 100) {
      nav.style.background = "rgba(255, 255, 255, 0.98)";
      nav.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
    } else {
      nav.style.background = "transparent";
      nav.style.boxShadow = "none";
    }
  });
}

// Initialize all functionalities
document.addEventListener("DOMContentLoaded", () => {
  // Initialize ReviewsManager
  const reviewsManager = new ReviewsManager();
  
  // Load gallery images
  loadGallery();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize nav scroll effects
  initNavScroll();
  
  // Mobile menu button functionality
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const navLinks = document.getElementById("navLinks");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    
    if (navLinks && mobileMenuBtn) {
      if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove("active");
      }
    }
  });
});
