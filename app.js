// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initLoadingScreen();
    initScrollAnimations();
    initPulseEffects();
    
    // Loading Screen Management
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        
        // Hide loading screen after 1.5 seconds
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            
            // Remove loading screen and show main content
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContent.classList.remove('hidden');
                
                // Start first page animations
                startFirstPageAnimations();
            }, 500);
        }, 1500);
    }
    
    // First Page Animations
    function startFirstPageAnimations() {
        const profilePhoto = document.getElementById('profile-photo');
        const name = document.getElementById('name');
        const contactInfo = document.getElementById('contact-info');
        
        // Profile photo animation
        setTimeout(() => {
            profilePhoto.classList.add('animate-in');
            
            // Add floating animation after rotate/scale completes
            setTimeout(() => {
                profilePhoto.classList.remove('animate-in');
                profilePhoto.classList.add('floating');
            }, 1000);
        }, 200);
        
        // Name slide up animation
        setTimeout(() => {
            name.classList.add('slide-up');
        }, 700);
        
        // Contact info slide up animation
        setTimeout(() => {
            contactInfo.classList.add('slide-up');
        }, 1200);
    }
    
    // Scroll Animations using Intersection Observer
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special handling for skills section
                    if (entry.target.classList.contains('skills-section')) {
                        animateSkillItems(entry.target);
                    }
                    
                    // Stop observing once animated
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all sections in the second page
        const sections = document.querySelectorAll('.second-page .section');
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    // Animate skill items with staggered timing
    function animateSkillItems(skillsSection) {
        const skillItems = skillsSection.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-in');
            }, index * 100);
        });
    }
    
    // Pulse effects on clicks
    function initPulseEffects() {
        // Add pulse effect to clickable elements
        const clickableElements = document.querySelectorAll('a, .profile-photo, .section');
        
        clickableElements.forEach(element => {
            element.addEventListener('click', function(e) {
                // Add pulse effect
                this.classList.add('pulse-effect');
                
                // Remove the class after animation completes
                setTimeout(() => {
                    this.classList.remove('pulse-effect');
                }, 600);
            });
        });
    }
    
    // Smooth scrolling for internal links (if any are added)
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Add scroll progress indicator
    function addScrollProgress() {
        const scrollProgress = document.createElement('div');
        scrollProgress.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #1abc9c, #2980b9);
            z-index: 9998;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(scrollProgress);
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
        });
    }
    
    // Initialize additional features
    initSmoothScrolling();
    addScrollProgress();
    
    // Enhanced hover effects for sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Enhanced contact links with additional feedback
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a subtle shake animation for phone numbers
            if (this.href.startsWith('tel:')) {
                this.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
            }
            
            // Add a bounce effect for email links
            if (this.href.startsWith('mailto:')) {
                this.style.animation = 'bounce 0.6s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            }
        });
    });
    
    // Add some additional CSS animations via JavaScript
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
        }
        
        @keyframes bounceIn {
            0% { transform: scale(0.8); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Add a subtle parallax effect to the first page background
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const firstPage = document.querySelector('.first-page');
        const rate = scrolled * -0.5;
        
        if (firstPage) {
            firstPage.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Add typing effect to the name (optional enhancement)
    function addTypingEffect() {
        const nameElement = document.getElementById('name');
        const originalText = nameElement.textContent;
        
        // Only add typing effect on desktop
        if (window.innerWidth > 768) {
            nameElement.textContent = '';
            
            setTimeout(() => {
                let i = 0;
                const typingInterval = setInterval(() => {
                    if (i < originalText.length) {
                        nameElement.textContent += originalText.charAt(i);
                        i++;
                    } else {
                        clearInterval(typingInterval);
                    }
                }, 100);
            }, 1300); // Start after other animations
        }
    }
    
    // Uncomment the line below if you want the typing effect
    // addTypingEffect();
    
    // Add intersection observer for skill items individual animation
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateY(0)';
                        item.style.opacity = '1';
                    }, index * 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSections = document.querySelectorAll('.skills-section');
    skillsSections.forEach(section => {
        skillObserver.observe(section);
    });
    
    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Any additional scroll-based logic can go here
        }, 10);
    }, { passive: true });
    
    console.log('Samarpan Behera Portfolio - All animations initialized!');
});