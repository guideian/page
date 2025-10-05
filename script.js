// Utility functions
function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=Strict";
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // You can implement proper error logging here
});

// Main application code
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all feature cards and sections
    document.querySelectorAll('.feature-card, .about, .contact').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effect to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Form submission handling with security measures
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = sanitizeInput(contactForm.querySelector('input[type="email"]').value);
            const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': csrfToken
                    },
                    body: JSON.stringify({ email })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                alert('Thank you for your interest! We will contact you soon.');
                contactForm.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    }

    // Secure Cookie/GDPR Notice
    function showCookieBanner() {
        if (getCookie('cookieConsent') === 'accepted') return;
        
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <span>
                This website uses cookies and stores data to enhance your experience and comply with GDPR. 
                By continuing to use this site, you accept our 
                <a href="privacy.html" style="color:var(--secondary-color);text-decoration:underline;">Privacy Policy</a>.
            </span>
            <div>
                <button id="accept-cookies">Accept</button>
                <button id="reject-cookies">Reject</button>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        document.getElementById('accept-cookies').onclick = function() {
            setCookie('cookieConsent', 'accepted', 365);
            banner.remove();
        };
        
        document.getElementById('reject-cookies').onclick = function() {
            setCookie('cookieConsent', 'rejected', 365);
            banner.remove();
        };
    }

    // Load components with error handling
    async function loadComponent(url, targetId) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.text();
            document.getElementById(targetId).outerHTML = data;
        } catch (error) {
            console.error('Error loading component:', error);
            document.getElementById(targetId).innerHTML = 
                '<div class="error">Failed to load content. Please refresh the page.</div>';
        }
    }

    // Load navigation and footer
    loadComponent('nav.html', 'main-nav').then(() => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            });
        }
    });
    loadComponent('footer.html', 'main-footer').then(() => {
        const yearSpan = document.getElementById('footer-year');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    });

    // Show cookie banner
    showCookieBanner();
}); 