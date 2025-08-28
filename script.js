// Personal Portfolio - Futuristic JavaScript
class FuturisticPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupParticles();
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupInteractiveElements();
        this.setupFormHandling();
        this.setupParallaxEffects();
        this.setupTypingEffects();
        this.setupCounterAnimations();
        this.setupMouseEffects();
        this.setupThreeJSBackground();
        this.initThemeToggle();
    }

    // Loading Screen Management
    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        // Simulate loading process
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                this.animateHeroElements();
            }, 500);
        }, 3000);
    }

    // Particle Background System
    setupParticles() {
        const particlesContainer = document.getElementById('particles-bg');
        const particleCount = 100;

        for (let i = 0; i < particleCount; i++) {
            this.createParticle(particlesContainer);
        }

        // Animate particles
        this.animateParticles();
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: particleFloat ${duration}s linear infinite;
            animation-delay: ${delay}s;
            pointer-events: none;
        `;

        container.appendChild(particle);
    }

    animateParticles() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach(particle => {
            particle.addEventListener('animationend', () => {
                // Reset particle position for infinite loop
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                particle.style.left = x + '%';
                particle.style.top = y + '%';
            });
        });
    }

    // Navigation System
    setupNavigation() {
        const nav = document.querySelector('.nav');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
                // Prevent body scroll when menu is open
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active link highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const scrollY = window.scrollY;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    const targetLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (targetLink) targetLink.classList.add('active');
                }
            });
        });
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Observe skill bars
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // Interactive Elements
    setupInteractiveElements() {
        // Portfolio filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        item.classList.add('animate-in');
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Publication filtering
        const pubFilterButtons = document.querySelectorAll('.pub-filter-btn');
        const publicationItems = document.querySelectorAll('.publication-item');

        pubFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                pubFilterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items
                publicationItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        item.classList.add('animate-in');
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Form Handling
    setupFormHandling() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(contactForm);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                // Simple validation
                if (!name || !email || !message) {
                    this.showNotification('Please fill in all fields', 'error');
                    return;
                }
                
                if (!this.isValidEmail(email)) {
                    this.showNotification('Please enter a valid email address', 'error');
                    return;
                }
                
                // Simulate form submission
                this.showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            });
        }

        // Real-time validation
        const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        if (!value) {
            field.classList.add('error');
            field.setAttribute('data-error', `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
        } else if (fieldName === 'email' && !this.isValidEmail(value)) {
            field.classList.add('error');
            field.setAttribute('data-error', 'Please enter a valid email address');
        } else {
            field.classList.remove('error');
            field.removeAttribute('data-error');
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Parallax Effects
    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Typing Effects
    setupTypingEffects() {
        const typewriterText = document.getElementById('typewriterText');
        if (typewriterText) {
            const fullName = "Yasser Salah Eddine\nBouchareb";
            let currentIndex = 0;
            
            const typeNextChar = () => {
                if (currentIndex < fullName.length) {
                    if (fullName[currentIndex] === '\n') {
                        typewriterText.innerHTML += '<br>';
                    } else {
                        typewriterText.innerHTML += fullName[currentIndex];
                    }
                    currentIndex++;
                    setTimeout(typeNextChar, 100);
                }
            };
            
            // Start typing after page load
            setTimeout(typeNextChar, 3500);
        }
    }

    // Counter Animations
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => observer.observe(counter));
    }

    // Mouse Effects - Fixed to ensure cursor appears
    setupMouseEffects() {
        const cursor = document.getElementById('customCursor');
        if (!cursor) {
            console.log('Custom cursor element not found');
            return;
        }

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor following
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(animateCursor);
        };
        
        animateCursor();

        // Hide default cursor
        document.body.style.cursor = 'none';

        // Show custom cursor on hoverable elements
        const hoverableElements = document.querySelectorAll('a, button, .card, .experience-card, .publication-card, .award-card');
        hoverableElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });

        // Ensure cursor is visible
        cursor.style.display = 'block';
        cursor.style.opacity = '1';
    }

    // Three.js Background (Advanced)
    setupThreeJSBackground() {
        if (typeof THREE !== 'undefined') {
            try {
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setClearColor(0x000000, 0);
                
                const particlesContainer = document.getElementById('particles-bg');
                particlesContainer.appendChild(renderer.domElement);
                
                // Create particle system
                const geometry = new THREE.BufferGeometry();
                const particleCount = 200;
                const positions = new Float32Array(particleCount * 3);
                const colors = new Float32Array(particleCount * 3);
                
                for (let i = 0; i < particleCount * 3; i += 3) {
                    positions[i] = (Math.random() - 0.5) * 20;
                    positions[i + 1] = (Math.random() - 0.5) * 20;
                    positions[i + 2] = (Math.random() - 0.5) * 20;
                    
                    colors[i] = Math.random() * 0.5 + 0.5;
                    colors[i + 1] = Math.random() * 0.5 + 0.5;
                    colors[i + 2] = 1;
                }
                
                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
                
                const material = new THREE.PointsMaterial({
                    size: 0.05,
                    vertexColors: true,
                    transparent: true,
                    opacity: 0.8
                });
                
                const particles = new THREE.Points(geometry, material);
                scene.add(particles);
                
                camera.position.z = 5;
                
                // Animation loop
                const animate = () => {
                    requestAnimationFrame(animate);
                    
                    particles.rotation.x += 0.001;
                    particles.rotation.y += 0.002;
                    
                    renderer.render(scene, camera);
                };
                
                animate();
                
                // Handle window resize
                window.addEventListener('resize', () => {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                });
                
            } catch (error) {
                console.log('Three.js not available, using CSS particles');
            }
        }
    }

    // Theme Toggle - Fixed to ensure light theme works
    initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        if (themeToggle) {
            // Set initial theme based on localStorage
            const savedTheme = localStorage.getItem('darkMode');
            if (savedTheme === 'false') {
                body.classList.add('light-mode');
                this.updateThemeIcon(true);
            }

            themeToggle.addEventListener('click', () => {
                body.classList.toggle('light-mode');
                const isLight = body.classList.contains('light-mode');
                localStorage.setItem('darkMode', !isLight);
                this.updateThemeIcon(isLight);
                
                // Force cursor visibility after theme change
                const cursor = document.getElementById('customCursor');
                if (cursor) {
                    cursor.style.display = 'block';
                    cursor.style.opacity = '1';
                }
            });
        }
    }

    updateThemeIcon(isLight) {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }

    // Hero Element Animations
    animateHeroElements() {
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-actions');
        
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FuturisticPortfolio();
});

// Global utility functions
function scrollToSection(sectionId) {
    const section = document.querySelector('#' + sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showComingSoon() {
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification notification-info';
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>Coming Soon! This feature is under development.</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for custom cursor, notifications, and light theme
const additionalStyles = `
    .custom-cursor {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        display: block !important;
        opacity: 1 !important;
    }
    
    .cursor-dot {
        width: 8px;
        height: 8px;
        background: #00d4ff;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
    }
    
    .cursor-ring {
        width: 32px;
        height: 32px;
        border: 2px solid #00d4ff;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
    }
    
    .custom-cursor.hover .cursor-dot {
        transform: translate(-50%, -50%) scale(1.5);
    }
    
    .custom-cursor.hover .cursor-ring {
        transform: translate(-50%, -50%) scale(1.5);
        border-color: #4ecdc4;
    }
    
    /* Light Theme Styles - Fixed and Complete */
    .light-mode {
        --bg-primary: #ffffff;
        --bg-secondary: #f8f9fa;
        --bg-tertiary: #e9ecef;
        --text-primary: #1a1a1a;
        --text-secondary: #4a4a4a;
        --text-muted: #6c757d;
        --primary-color: #007bff;
        --accent-color: #28a745;
        --border-color: rgba(0, 0, 0, 0.1);
        --card-bg: rgba(0, 0, 0, 0.05);
        --shadow-color: rgba(0, 0, 0, 0.1);
        --dark-bg: #ffffff;
        --darker-bg: #f5f5f5;
        --glass-bg: rgba(0, 0, 0, 0.1);
        --glass-border: rgba(0, 0, 0, 0.2);
    }
    
    .light-mode body {
        background-color: var(--bg-primary);
        color: var(--text-primary);
    }
    
    .light-mode .nav {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border-color);
    }
    
    .light-mode .card {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        box-shadow: 0 4px 20px var(--shadow-color);
    }
    
    .light-mode .btn-primary {
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: white;
    }
    
    .light-mode .btn-secondary {
        border: 2px solid var(--primary-color);
        color: var(--primary-color);
    }
    
    .light-mode .section-title {
        color: var(--text-primary);
    }
    
    .light-mode .section-subtitle {
        color: var(--text-secondary);
    }
    
    .light-mode .hero-badge {
        background: rgba(0, 123, 255, 0.1);
        color: var(--primary-color);
        border: 1px solid rgba(0, 123, 255, 0.2);
    }
    
    .light-mode .hero-title {
        color: var(--text-primary);
    }
    
    .light-mode .hero-description {
        color: var(--text-secondary);
    }
    
    .light-mode .about-content {
        background: var(--bg-secondary);
    }
    
    .light-mode .timeline-content {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
    }
    
    .light-mode .experience-card,
    .light-mode .publication-card,
    .light-mode .award-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
    }
    
    .light-mode .contact-form input,
    .light-mode .contact-form textarea {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
    }
    
    .light-mode .hero {
        background: var(--bg-primary);
    }
    
    .light-mode .about {
        background: var(--bg-secondary);
    }
    
    .light-mode .education {
        background: var(--bg-primary);
    }
    
    .light-mode .experience {
        background: var(--bg-secondary);
    }
    
    .light-mode .publications {
        background: var(--bg-primary);
    }
    
    .light-mode .writing {
        background: var(--bg-secondary);
    }
    
    .light-mode .awards {
        background: var(--bg-primary);
    }
    
    .light-mode .contact {
        background: var(--bg-secondary);
    }
    
    .light-mode .footer {
        background: var(--bg-primary);
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 16px 24px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 12px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 10000;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left: 4px solid #4ecdc4;
    }
    
    .notification i {
        font-size: 1.2rem;
    }
    
    .particle {
        position: absolute;
        pointer-events: none;
    }
    
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(5, 5, 5, 0.98);
            backdrop-filter: blur(20px);
            padding: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .custom-cursor {
            display: none;
        }
        
        body {
            cursor: auto;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
