// Create Advanced Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return; // guard
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 25 + 15}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Create Mouse Trail Effect
function createMouseTrail() {
    const mouseTrail = document.getElementById('mouseTrail');
    if (!mouseTrail) return; // guard if element missing
    const maxTrail = 30; // limit trail length

    if (!window._mouseTrailParticles) window._mouseTrailParticles = [];
    const trails = window._mouseTrailParticles;
    let ticking = false;

    function addTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'trail-particle';
        // position relative to viewport
        trail.style.left = (x - 2) + 'px';
        trail.style.top = (y - 2) + 'px';
        mouseTrail.appendChild(trail);
        trails.push(trail);
        while (trails.length > maxTrail) {
            const old = trails.shift();
            if (old && old.parentNode) old.parentNode.removeChild(old);
        }
        setTimeout(() => {
            if (trail.parentNode) trail.parentNode.removeChild(trail);
        }, 700);
    }

    function onMove(e) {
        const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
        const clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                addTrail(clientX, clientY);
                ticking = false;
            });
            ticking = true;
        }
    }

    document.addEventListener('mousemove', onMove);
    // support touch move if on mobile
    document.addEventListener('touchmove', onMove, { passive: true });
}

// Initialize effects
window.addEventListener('load', () => {
    try {
        createParticles();
        createMouseTrail();
    } catch (err) {
        console.error('Initialization error:', err);
    }
});

// Update particles on resize
window.addEventListener('resize', () => {
    const container = document.getElementById('particles');
    if (container) {
        container.innerHTML = '';
        createParticles();
    }
});
