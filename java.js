// Create Advanced Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
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
    let mouseX = 0, mouseY = 0;

        if (!window._mouseTrailParticles) window._mouseTrailParticles = [];
        const trails = window._mouseTrailParticles;
        let ticking = false;

        function addTrail(x, y) {
            const trail = document.createElement('div');
            trail.className = 'trail-particle';
            trail.style.left = x + 'px';
            trail.style.top = y + 'px';
            mouseTrail.appendChild(trail);
            trails.push(trail);
            while (trails.length > maxTrail) {
                const old = trails.shift();
                if (old && old.parentNode) old.remove();
            }
            setTimeout(() => {
                if (trail.parentNode) trail.remove();
            }, 700);
        }

        function onMove(e) {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    addTrail(e.clientX, e.clientY);
                    ticking = false;
                });
                ticking = true;
            }
        }
        document.addEventListener('mousemove', onMove);
}

// Initialize effects
window.addEventListener('load', () => {
    createParticles();
    createMouseTrail();
});

// Update particles on resize
window.addEventListener('resize', () => {
    document.getElementById('particles').innerHTML = '';
    createParticles();
});
