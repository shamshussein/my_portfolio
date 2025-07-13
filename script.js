const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = sanitizeInput(document.getElementById('name').value);
    const email = sanitizeInput(document.getElementById('email').value);
    const subject = sanitizeInput(document.getElementById('subject').value);
    const message = sanitizeInput(document.getElementById('message').value);
    const source = document.getElementById('source').value;

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (isSpamLike(name, email, message)) {
        alert('Please provide a genuine message.');
        return;
    }

    const whatsappMessage = `Hello Hussein,\n\nName: ${name}\nEmail: ${email}\n${subject ? `Subject: ${subject}\n` : ''}\nMessage: ${message}\n${source ? `\nHow I heard about you: ${source}` : ''}`;

    const phoneNumber = '+96171607693';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, '_blank');

    document.querySelector('.contact_form').reset();
    
    showSuccessMessage();
}

function redirectToWhatsApp(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const source = document.getElementById('source').value;

    const whatsappMessage = `Hello, my name is ${name}. My email is ${email}. I wanted to say: ${message}. I heard about you via ${source}.`;

    const phoneNumber = '+96171607693';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, '_blank');
}

function sanitizeInput(input) {
    return input.replace(/[<>\"']/g, '').trim();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isSpamLike(name, email, message) {
    const spamPatterns = [
        /\b(buy now|click here|free money|guaranteed|winner|congratulations)\b/i,
        /(.)\1{4,}/, 
        /\b\d{4,}\b.*\b\d{4,}\b/ 
    ];
    
    const text = `${name} ${email} ${message}`.toLowerCase();
    return spamPatterns.some(pattern => pattern.test(text));
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item, .project-card, .skill-category, .cert-card').forEach(el => {
    observer.observe(el);
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully!');
});