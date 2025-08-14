const workImages = [
  {
    src: "/shree-cleaning-website/images/image1.jpg",
    alt: "Home Cleaning",
    title: "Home Cleaning",
    desc: "Spotless home and kitchen cleaning.",
  },
  {
    src: "/shree-cleaning-website/images/image2.jpg",
    alt: "Office Cleaning",
    title: "Office Cleaning",
    desc: "Professional office workspace cleaning.",
  },
  {
    src: "/shree-cleaning-website/images/image3.jpg",
    alt: "Glass Cleaning",
    title: "Glass Cleaning",
    desc: "Windows, mirrors, and glass surfaces.",
  },
  {
    src: "/shree-cleaning-website/images/image4.jpg",
    alt: "Sanitization",
    title: "Sanitization",
    desc: "Germ-free, safe environments.",
  },
  {
    src: "/shree-cleaning-website/images/image5.jpg",
    alt: "Pantry Upkeep",
    title: "Pantry Upkeep",
    desc: "Clean, stocked, and well-managed pantries.",
  },
  {
    src: "/shree-cleaning-website/images/image6.jpg",
    alt: "After Event Clean-up",
    title: "Event Clean-up",
    desc: "Post-event rapid cleaning services.",
  },
]

function loadGallery() {
  const gallery = document.getElementById("workGallery")
  workImages.forEach((item, index) => {
    const div = document.createElement("div")
    div.className = "gallery-item"
    div.style.animationDelay = `${index * 0.1}s`
    div.innerHTML = `
            <img src="${item.src}" alt="${item.alt}" title="${item.title}" loading="lazy" />
            <div class="gallery-overlay">
                // <h3>${item.title}</h3>
                // <p>${item.desc}</p>
            </div>
        `
    gallery.appendChild(div)
  })
}

// Reviews System
const reviews = [
  {
    name: "Sarvesh Walkar",
    text: "Very professional and reliable. Our office is always spotless after their visit!",
    rating: 5,
  },
  {
    name: "Priya Kulkarni",
    text: "Excellent cleaning and friendly staff. Highly recommended for home cleaning.",
    rating: 4,
  },
  {
    name: "Amit Joshi",
    text: "We hire Shree Cleaning for every event at our office. Outstanding job every time!",
    rating: 5,
  },
]

function displayReviews() {
  const container = document.getElementById("reviewsContainer")
  container.innerHTML = ""

  reviews.forEach((review, index) => {
    const div = document.createElement("div")
    div.className = "review-card"
    div.style.animationDelay = `${index * 0.2}s`

    const stars = "★".repeat(Math.floor(review.rating)) + (review.rating % 1 ? "☆" : "")

    div.innerHTML = `
            <div class="review-header">
                <h4>${review.name}</h4>
                <div class="stars">${stars}</div>
            </div>
            <p class="review-text">${review.text}</p>
        `
    container.appendChild(div)
  })
}

// Handle new review submission
document.addEventListener("DOMContentLoaded", () => {
  const reviewForm = document.getElementById("addReviewForm")
  if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const name = document.getElementById("reviewerName").value
      const text = document.getElementById("reviewText").value

      if (name && text) {
        reviews.unshift({ name, text, rating: 5 })
        displayReviews()
        this.reset()

        // Show success message
        const button = this.querySelector("button")
        const originalText = button.innerHTML
        button.innerHTML = '<i class="fas fa-check"></i> Review Added!'
        button.style.background = "#10b981"

        setTimeout(() => {
          button.innerHTML = originalText
          button.style.background = ""
        }, 2000)
      }
    })
  }
})

// Mobile menu toggle
function toggleMobileMenu() {
  const navLinks = document.getElementById("navLinks")
  navLinks.classList.toggle("active")
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }

      // Close mobile menu if open
      document.getElementById("navLinks").classList.remove("active")
    })
  })
}

// Nav background on scroll
function initNavScroll() {
  window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav")
    if (window.scrollY > 100) {
      nav.style.background = "rgba(255, 255, 255, 0.98)"
      nav.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
    } else {
      nav.style.background = "rgba(255, 255, 255, 0.95)"
      nav.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
    }
  })
}

// Close mobile menu when clicking outside
function initClickOutside() {
  document.addEventListener("click", (e) => {
    const nav = document.querySelector("nav")
    const navLinks = document.getElementById("navLinks")
    const menuBtn = document.getElementById("mobileMenuBtn")

    if (!nav.contains(e.target) && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active")
    }
  })
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadGallery()
  displayReviews()
  initSmoothScrolling()
  initNavScroll()
  initClickOutside()

  // Mobile menu button
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu)
  }

  // Add loading animation to images
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })
    img.style.opacity = "0"
    img.style.transition = "opacity 0.3s ease"
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Observe sections for animations
  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(30px)"
    section.style.transition = "all 0.8s ease-out"
    observer.observe(section)
  })
})
