// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

mobileMenuBtn.addEventListener('click', () => {
    const icon = mobileMenuBtn.querySelector('i');
    
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
        navActions.style.display = 'none';
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(18, 18, 26, 0.98)';
        navLinks.style.padding = '30px';
        navLinks.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
        navLinks.style.gap = '25px';
        navLinks.style.borderTop = '1px solid rgba(0, 243, 255, 0.2)';
        navLinks.style.backdropFilter = 'blur(10px)';
        
        navActions.style.display = 'flex';
        navActions.style.flexDirection = 'column';
        navActions.style.position = 'absolute';
        navActions.style.top = 'calc(100% + 250px)';
        navActions.style.left = '0';
        navActions.style.width = '100%';
        navActions.style.padding = '0 30px 30px';
        navActions.style.background = 'rgba(18, 18, 26, 0.98)';
        navActions.style.backdropFilter = 'blur(10px)';
        
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animated terminal output
const terminalOutput = document.getElementById('terminal-output');
const outputs = [
    'Deployment complete in 2.3ms',
    'Quantum optimization applied',
    'Neural patterns synchronized',
    'Holographic interface active',
    'Cybersecurity protocols engaged'
];

let outputIndex = 0;

function changeTerminalOutput() {
    terminalOutput.textContent = outputs[outputIndex];
    outputIndex = (outputIndex + 1) % outputs.length;
    
    // Add typing effect
    terminalOutput.style.animation = 'none';
    setTimeout(() => {
        terminalOutput.style.animation = 'typing 2s steps(40, end)';
    }, 10);
}

setInterval(changeTerminalOutput, 4000);

// Animated counter for stats
const statCounters = document.querySelectorAll('.stat-counter');

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 20);
}

// Start counters when in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            animateCounter(counter);
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

statCounters.forEach(counter => {
    observer.observe(counter);
});

// Enhanced Testimonials Slider
const testimonialTrack = document.querySelector('.testimonials-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;
const totalSlides = testimonialCards.length;
let autoSlideInterval;
const slideInterval = 5000; // 5 seconds

function updateSlider() {
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    testimonialDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Add animation class for smooth transition
    testimonialTrack.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

// Initialize slider
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
        resetAutoSlide();
    });
});

// Arrow button functionality
prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

// Auto slide functionality
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, slideInterval);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Pause auto slide on hover
const testimonialsSlider = document.querySelector('.testimonials-slider');
testimonialsSlider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

testimonialsSlider.addEventListener('mouseleave', () => {
    startAutoSlide();
});

// Start auto sliding
startAutoSlide();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (navLinks.style.display === 'flex') {
                mobileMenuBtn.click();
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Button hover effects with sound simulation
const cyberButtons = document.querySelectorAll('.cyber-btn');

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

cyberButtons.forEach(button => {
    button.addEventListener('mouseenter', createRipple);
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .blinking-cursor::after {
        content: '|';
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Simulate deployment on button click
const deployButtons = document.querySelectorAll('.cyber-btn-primary');
deployButtons.forEach(button => {
    if (button.textContent.includes('DEPLOY')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create deployment animation
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.zIndex = '9999';
            overlay.style.flexDirection = 'column';
            overlay.style.color = 'var(--neon-blue)';
            overlay.style.fontFamily = "'Orbitron', sans-serif";
            overlay.style.fontSize = '1.5rem';
            overlay.style.backdropFilter = 'blur(10px)';
            
            const deploymentText = document.createElement('div');
            deploymentText.textContent = 'INITIATING DEPLOYMENT SEQUENCE...';
            deploymentText.style.marginBottom = '30px';
            deploymentText.style.textAlign = 'center';
            
            const progressBar = document.createElement('div');
            progressBar.style.width = '300px';
            progressBar.style.height = '10px';
            progressBar.style.backgroundColor = 'var(--cyber-gray)';
            progressBar.style.borderRadius = '5px';
            progressBar.style.overflow = 'hidden';
            progressBar.style.marginBottom = '20px';
            
            const progressFill = document.createElement('div');
            progressFill.style.width = '0%';
            progressFill.style.height = '100%';
            progressFill.style.background = 'linear-gradient(90deg, var(--neon-blue), var(--neon-purple))';
            progressFill.style.transition = 'width 3s ease-in-out';
            progressBar.appendChild(progressFill);
            
            const statusText = document.createElement('div');
            statusText.textContent = '0%';
            statusText.style.fontSize = '1rem';
            statusText.style.marginBottom = '30px';
            
            overlay.appendChild(deploymentText);
            overlay.appendChild(progressBar);
            overlay.appendChild(statusText);
            
            document.body.appendChild(overlay);
            
            // Animate progress
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 1;
                progressFill.style.width = `${progress}%`;
                statusText.textContent = `${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        deploymentText.textContent = 'DEPLOYMENT COMPLETE!';
                        statusText.textContent = 'SYSTEM ONLINE';
                        
                        setTimeout(() => {
                            document.body.removeChild(overlay);
                            alert('DEPLOYMENT SUCCESSFUL: Your cyber template has been deployed to the digital frontier.');
                        }, 1500);
                    }, 500);
                }
            }, 30);
        });
    }
});

// Enhanced template card hover effects
const templateCards = document.querySelectorAll('.template-card');
templateCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const img = card.querySelector('.template-image img');
        img.style.transform = 'scale(1.1)';
        img.style.transition = 'transform 0.5s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('.template-image img');
        img.style.transform = 'scale(1)';
    });
});

// Initialize solutions animations
const solutionCards = document.querySelectorAll('.solution-card');
const solutionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

solutionCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    solutionObserver.observe(card);
});

// Add keyboard navigation for testimonials
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoSlide();
    }
});

// Add touch swipe support for testimonials on mobile
let touchStartX = 0;
let touchEndX = 0;

testimonialsSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

testimonialsSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        nextSlide();
        resetAutoSlide();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        prevSlide();
        resetAutoSlide();
    }
}

// Initialize the page with first slide
updateSlider();