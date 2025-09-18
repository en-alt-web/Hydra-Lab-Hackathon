// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileNav.classList.toggle('active');
    menuBtn.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileNav.classList.remove('active');
    menuBtn.classList.remove('active');
}

// Smooth scrolling for navigation links
function scrollToApply() {
    const applySection = document.getElementById('apply');
    if (applySection) {
        applySection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    closeMobileMenu();
}

// Handle application button click
function handleApplyClick() {
    // Replace with your actual application form URL
    const applicationUrl = 'https://forms.gle/gHwEn4W76wbNje876';
    window.open(applicationUrl, '_blank');
}

// Smooth scrolling for all navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            closeMobileMenu();
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to sections and observe them
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileNav = document.getElementById('mobileNav');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (!menuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // Preload images for better performance
    const imageUrls = [
        'IMG/frame-1707479815.png',
        'IMG/frame-1707479816.png',
        'IMG/Group 37.svg',
        'IMG/unsplash-r4id--ftqis.png',
        'IMG/rectangle-33.png',
        'IMG/rectangle-34.png',
        'IMG/streamline-hand-held-tablet-writing-1.png',
        'IMG/streamline-hand-held-tablet-writing.png',
        'IMG/clip-path-group.png',
        'IMG/clip-path-group-1.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
});

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
}

// Add loading states for better UX
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Error handling for missing images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            // You could add a placeholder image here
            // this.src = '/placeholder.png';
        });
    });
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Handle Enter key on buttons
    if (e.key === 'Enter' && e.target.classList.contains('nav-link')) {
        e.target.click();
    }
});

// Add focus management for better accessibility
function manageFocus() {
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
}

  // Add loading animation for the big HYDRA text
    const hydraText = document.querySelector('.hydra-text');
    if (hydraText) {
        hydraText.style.opacity = '0';
        hydraText.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            hydraText.style.transition = 'opacity 1s ease, transform 1s ease';
            hydraText.style.opacity = '1';
            hydraText.style.transform = 'translateY(0)';
        }, 500);
    }



// Responsive text sizing adjustment
function adjustHydraTextSize() {
    const hydraText = document.querySelector('.hydra-text');
    const footer = document.querySelector('.hydra-footer');
    
    if (hydraText && footer) {
        const footerWidth = footer.offsetWidth;
        const footerHeight = footer.offsetHeight;
        
        // Calculate optimal font size based on container dimensions
        let fontSize;
        if (footerWidth < 640) {
            fontSize = Math.min(footerWidth * 0.25, footerHeight * 0.4);
        } else if (footerWidth < 768) {
            fontSize = Math.min(footerWidth * 0.3, footerHeight * 0.5);
        } else if (footerWidth < 1024) {
            fontSize = Math.min(footerWidth * 0.35, footerHeight * 0.6);
        } else {
            fontSize = Math.min(footerWidth * 0.4, footerHeight * 0.7);
        }
        
        // Ensure minimum and maximum sizes
        fontSize = Math.max(fontSize, 120); // Minimum 120px
        fontSize = Math.min(fontSize, 500); // Maximum 500px
        
        hydraText.style.fontSize = fontSize + 'px';
    }
}

// Adjust text size on window resize
window.addEventListener('resize', adjustHydraTextSize);

// Initial adjustment when page loads
window.addEventListener('load', adjustHydraTextSize);

document.addEventListener('DOMContentLoaded', manageFocus);