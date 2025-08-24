// Enhanced Portfolio JavaScript with smooth animations and interactions

// Loading animation with enhanced error handling
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
    setTimeout(() => {
        loader.classList.add('hidden');
            // Remove loader from DOM after animation
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.remove();
                }
    }, 500);
        }, 800);
    }
});

// Enhanced mobile navigation toggle with accessibility
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
hamburger.addEventListener('click', () => {
        const isActive = navLinks.classList.contains('active');
    navLinks.classList.toggle('active');
        
        // Update hamburger icon and aria-label
        if (isActive) {
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            hamburger.setAttribute('aria-label', 'Open navigation menu');
        } else {
            hamburger.innerHTML = '<i class="fas fa-times"></i>';
            hamburger.setAttribute('aria-label', 'Close navigation menu');
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'auto' : 'hidden';
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
            if (hamburger) {
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                hamburger.setAttribute('aria-label', 'Open navigation menu');
            }
            document.body.style.overflow = 'auto';
        }
    });
});

// Enhanced header scroll effect with performance optimization
const header = document.querySelector('header');
let ticking = false;

function updateHeader() {
    if (header) {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        }
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

// Enhanced active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

// Throttled scroll event for navigation
let navScrollTimeout;
window.addEventListener('scroll', () => {
    if (navScrollTimeout) return;
    
    navScrollTimeout = setTimeout(() => {
        updateActiveNav();
        navScrollTimeout = null;
    }, 100);
});

// Enhanced scroll to top button with smooth animation
const scrollBtn = document.querySelector('.scroll-top');
if (scrollBtn) {
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollBtn.classList.add('active');
    } else {
        scrollBtn.classList.remove('active');
    }
});

scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
}

// Enhanced form submission with better validation and user feedback
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
        const name = formData.get('name') || document.getElementById('name')?.value || '';
        const email = formData.get('email') || document.getElementById('email')?.value || '';
        const subject = formData.get('subject') || document.getElementById('subject')?.value || '';
        const message = formData.get('message') || document.getElementById('message')?.value || '';
        
        // Enhanced validation
        if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
        
        if (message.length < 10) {
            showNotification('Message must be at least 10 characters long', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    showNotification('Thank you for your message! I will get back to you soon.', 'success');
    contactForm.reset();
            
            // Add success animation to form
            contactForm.style.animation = 'formSuccess 0.5s ease';
            setTimeout(() => {
                contactForm.style.animation = '';
            }, 500);
            
        } catch (error) {
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Enhanced email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system with better positioning and animations
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add enhanced styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%) scale(0.8);
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 350px;
        font-family: 'Poppins', sans-serif;
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in with bounce effect
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%) scale(0.8)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
    }
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
        }
    }, 6000);
}

// Enhanced animation on scroll with intersection observer for better performance
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .cert-card, .testimonial-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });

    // Animate progress bars with enhanced effects
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const elementPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            const width = bar.getAttribute('data-width');
            if (width && bar.style.width === '0px') {
            bar.style.width = width + '%';
            
            // Add completion animation
                if (parseInt(width) >= 90) {
                    bar.style.animation = 'progressComplete 0.8s ease-in-out';
                }
            }
        }
    });
};

// Set initial state for animated elements
document.querySelectorAll('.timeline-item, .project-card, .skill-category, .cert-card, .testimonial-card').forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Initialize progress bars width to 0
document.querySelectorAll('.progress').forEach(bar => {
    bar.style.width = '0';
});

// Add enhanced progress completion animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes progressComplete {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes formSuccess {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        margin-left: 15px;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;
document.head.appendChild(style);

// Throttled scroll event for animations
let animationTimeout;
window.addEventListener('scroll', () => {
    if (animationTimeout) return;
    
    animationTimeout = setTimeout(() => {
        animateOnScroll();
        animationTimeout = null;
    }, 16); // 60fps
});

// Trigger once on load
window.addEventListener('load', animateOnScroll);

// Enhanced Dark/Light mode toggle with smooth transitions and better UX
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle?.querySelector('i');

if (themeToggle && themeIcon) {
// Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    // Add transition class for smooth theme change
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        showNotification('Dark mode enabled', 'info');
    } else {
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        showNotification('Light mode enabled', 'info');
    }
    
    // Remove transition class after animation
    setTimeout(() => {
        document.body.style.transition = '';
    }, 500);
});
}

// Enhanced Project modals with keyboard support and better accessibility
const projectCards = document.querySelectorAll('.project-card');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.modal-close');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const modal = document.getElementById(`project-modal-${projectId}`);
        
        if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                setTimeout(() => closeBtn.focus(), 100);
            }
            
            // Add entrance animation
            modal.style.animation = 'modalEntrance 0.3s ease-out';
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
            
            // Reset focus to body
            document.body.focus();
        }
    });
});

// Close modal when clicking outside
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});

// Enhanced keyboard support for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            openModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }
});

// Enhanced smooth scrolling for navigation links with offset adjustment
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced parallax effect to hero section with performance optimization
let heroParallaxTicking = false;

function updateHeroParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
    heroParallaxTicking = false;
}

window.addEventListener('scroll', () => {
    if (!heroParallaxTicking) {
        requestAnimationFrame(updateHeroParallax);
        heroParallaxTicking = true;
    }
});

// Enhanced typing effect to hero title with better performance
function typeWriter(element, text, speed = 100) {
    if (!element) return;
    
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Enhanced typing effect for professional titles
const professionalTitles = [
    "Web Developer",
    "Penetration Tester", 
    "Ethical Hacker",
    "Security Specialist",
    "Full Stack Developer",
    "Cybersecurity Expert",
    "Bug Bounty Hunter",
    "Security Researcher"
];

let currentTitleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 120;

function typeProfessionalTitle() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const currentTitle = professionalTitles[currentTitleIndex];
    
    if (isDeleting) {
        // Delete characters with faster speed
        typingElement.textContent = currentTitle.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 80;
    } else {
        // Type characters with natural speed
        typingElement.textContent = currentTitle.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 120;
    }
    
    // Handle typing completion
    if (!isDeleting && currentCharIndex === currentTitle.length) {
        // Pause at end of word to let people read
        typingSpeed = 2500;
        isDeleting = true;
        
        // Add completion effect
        typingElement.style.animation = 'typingComplete 0.3s ease-in-out';
        setTimeout(() => {
            typingElement.style.animation = '';
        }, 300);
    } else if (isDeleting && currentCharIndex === 0) {
        // Move to next word with pause
        isDeleting = false;
        currentTitleIndex = (currentTitleIndex + 1) % professionalTitles.length;
        typingSpeed = 800;
        
        // Add transition effect
        typingElement.style.opacity = '0.5';
        setTimeout(() => {
            typingElement.style.opacity = '1';
        }, 200);
    }
    
    setTimeout(typeProfessionalTitle, typingSpeed);
}

// Start the typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        typeProfessionalTitle();
    }, 2500); // Start after name animation completes
});

// Enhanced hover effects to skill items with better performance
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced loading animation to buttons with better UX
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Don't add loading state for navigation buttons
        if (this.getAttribute('href')?.startsWith('#')) return;
        
        if (!this.classList.contains('btn-outline')) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 2000);
        }
    });
});

// Enhanced performance optimization: Better throttling for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events for better performance
const throttledAnimateOnScroll = throttle(animateOnScroll, 16); // 60fps
const throttledHeaderUpdate = throttle(updateHeader, 16);

window.addEventListener('scroll', throttledAnimateOnScroll);
window.addEventListener('scroll', throttledHeaderUpdate);

// Add enhanced modal entrance animation
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    @keyframes modalEntrance {
        from {
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
`;
document.head.appendChild(modalStyle);

// Enhanced accessibility: Add skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 10001;
    transition: top 0.3s;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// Enhanced error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Error querying selector: ${selector}`, error);
        return null;
    }
}

// Enhanced performance monitoring
let performanceObserver;
if ('PerformanceObserver' in window) {
    try {
        performanceObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'navigation') {
                    console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
                }
            }
        });
        performanceObserver.observe({ entryTypes: ['navigation'] });
    } catch (error) {
        console.warn('PerformanceObserver not supported:', error);
    }
}

// Enhanced mobile detection and touch support
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    // Add touch-specific enhancements
    document.body.classList.add('mobile-device');
    
    // Improve touch scrolling
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
}

// Enhanced error boundary for JavaScript errors
window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
    // You could send this to an error tracking service
});

// Enhanced unhandled promise rejection handling
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // You could send this to an error tracking service
});

console.log('Portfolio enhanced with improved performance, accessibility, and user experience!');
