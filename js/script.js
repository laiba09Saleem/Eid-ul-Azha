document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        document.querySelector('.preloader').style.opacity = '0';
        document.querySelector('.main-container').classList.add('loaded');
        setTimeout(function() {
            document.querySelector('.preloader').style.display = 'none';
        }, 500);
    }, 2000);

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Add current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', options);

    // Page navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page') + '-page';
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected page
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === pageId) {
                    page.classList.add('active');
                }
            });
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });

    // Countdown timer (set to Eid ul Azha on 7th June)
    function updateCountdown() {
        const now = new Date();
        // Set Eid date to June 7th of current year
        const eidDate = new Date(now.getFullYear(), 5, 7); // June 7th (month is 0-indexed, so 5 = June)
        
        // If Eid has already passed this year, set to next year
        if (now > eidDate) {
            eidDate.setFullYear(now.getFullYear() + 1);
        }
        
        const diff = eidDate - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Celebration button
    const celebrationBtn = document.getElementById('celebration-btn');
    const celebrationContainer = document.querySelector('.celebration-container');
    
    celebrationBtn.addEventListener('click', function() {
        celebrationContainer.style.display = 'block';
        startCelebration();
        
        // Hide after some time
        setTimeout(function() {
            celebrationContainer.style.display = 'none';
        }, 5000);
    });
    
    function startCelebration() {
        // Create fireworks
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.classList.add('firework');
                firework.style.setProperty('--x', Math.random() * window.innerWidth - 100 + 'px');
                firework.style.setProperty('--y', Math.random() * window.innerHeight - 100 + 'px');
                firework.style.backgroundColor = `hsl(${Math.random() * 60 + 30}, 100%, 50%)`;
                celebrationContainer.appendChild(firework);
                
                // Remove after animation
                setTimeout(() => {
                    firework.remove();
                }, 2000);
            }, i * 200);
        }
        
        // Create confetti
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                confetti.style.animationDelay = Math.random() * 5 + 's';
                celebrationContainer.appendChild(confetti);
                
                // Remove after animation
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }, i * 50);
        }
    }

    // Animate elements when scrolling
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .gallery-item, .countdown-box');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.card, .gallery-item, .countdown-box');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});