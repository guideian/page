document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
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

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = contactForm.querySelector('input[type="email"]').value;
            // Here you would typically send the email to your backend
            alert('Thank you for your interest! We will contact you soon.');
            contactForm.reset();
        });
    }

    // Cookie/GDPR Notice
    function showCookieBanner() {
        if (localStorage.getItem('cookieConsent') === 'accepted') return;
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <span>
                This website uses cookies and stores data to enhance your experience and comply with GDPR. By continuing to use this site, you accept our <a href="privacy.html" style="color:var(--secondary-color);text-decoration:underline;">Privacy Policy</a>.
            </span>
            <button id="accept-cookies">Accept</button>
        `;
        document.body.appendChild(banner);
        document.getElementById('accept-cookies').onclick = function() {
            localStorage.setItem('cookieConsent', 'accepted');
            banner.remove();
        };
    }

    window.addEventListener('DOMContentLoaded', showCookieBanner);
}); 