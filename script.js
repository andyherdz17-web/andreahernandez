// Modern Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on links
        const allNavLinks = document.querySelectorAll('.nav-link');
        allNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Smooth Scroll Navigation
    const navLink = document.querySelectorAll('.nav-link, .footer-link');
    
    navLink.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(254, 253, 251, 0.95)';
            header.style.boxShadow = '0 4px 6px rgba(139, 115, 85, 0.1)';
        } else {
            header.style.background = 'rgba(254, 253, 251, 0.9)';
            header.style.boxShadow = 'none';
        }
        
        // Close mobile menu when scrolling
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            const headerOffset = 80;
            
            if (sectionTop <= headerOffset && sectionTop + sectionHeight > headerOffset) {
                current = section.getAttribute('id');
            }
        });

        navLink.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Scroll Animations
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section-header, .job-card, .skill-card, .contact-item, .cta-section');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Language Translation Functionality
    const languageToggle = document.getElementById('languageToggle');
    const translatableElements = document.querySelectorAll('.translatable');
    const languageText = document.querySelector('.language-text');
    const htmlLang = document.querySelector('html');
    
    let currentLanguage = 'en';

    function translatePage(language) {
        // Translate all translatable elements
        translatableElements.forEach(element => {
            const translation = element.getAttribute(`data-${language}`);
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Update language toggle text
        if (languageToggle && languageText) {
            languageText.textContent = language.toUpperCase();
        }
        
        // Update HTML lang attribute
        htmlLang.setAttribute('lang', language);
        currentLanguage = language;
        
        // Add smooth transition effect
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 200);
    }

    // Language toggle event listener
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
            translatePage(newLanguage);
        });
    }
    
    // Interactive Elements Hover Effects
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Skill cards interactive effect
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Achievement items hover effect
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Tag hover effects
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Contact items hover effects
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(-5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Profile image hover effect
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        profileImg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Dynamic typing animation for name (optional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Initialize typing animation after page load
    setTimeout(() => {
        const nameElement = document.querySelector('.name');
        if (nameElement) {
            const originalText = nameElement.textContent;
            typeWriter(nameElement, originalText, 150);
        }
    }, 1000);
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const imageContainer = document.querySelector('.image-container');
        
        if (hero && imageContainer) {
            const rate = scrolled * -0.3;
            imageContainer.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Scroll to top functionality
    let scrollTopBtn = document.querySelector('.scroll-top-btn');
    
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.innerHTML = '↑';
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), var(--primary-light));
            color: white;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(139, 115, 85, 0.3);
            font-family: var(--font-sans);
            font-weight: 600;
        `;
        
        document.body.appendChild(scrollTopBtn);

        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
            }
        });

        // Scroll to top functionality
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Hover effects for scroll button
        scrollTopBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 6px 16px rgba(139, 115, 85, 0.4)';
        });
        
        scrollTopBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 12px rgba(139, 115, 85, 0.3)';
        });
    }
    
    // Initialize page
    console.log('🚀 Portfolio loaded successfully!');
    
    // Add CSS for scroll to top button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn:hover {
            background: linear-gradient(135deg, var(--brown-600), var(--primary)) !important;
        }
        
        /* Smooth transitions for reduced motion users */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
});
