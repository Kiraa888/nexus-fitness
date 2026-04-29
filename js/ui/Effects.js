export const fireLevelUpNova = () => {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:var(--accent-pink);mix-blend-mode:overlay;opacity:0.8;z-index:9998;pointer-events:none;transition:opacity 0.8s ease-out;';
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.style.opacity = '0');
    setTimeout(() => overlay.remove(), 800);

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;pointer-events:none;';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#00d4ff', '#ff006e', '#ffbe0b'];

    for (let i = 0; i < 150; i++) {
        particles.push({
            x: canvas.width / 2, y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 30, vy: (Math.random() - 0.5) * 30,
            radius: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1, decay: Math.random() * 0.02 + 0.015
        });
    }

    let animationId;
    const renderParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;

        particles.forEach(p => {
            if (p.alpha <= 0) return;
            active = true;
            p.x += p.vx; p.y += p.vy; p.vy += 0.2; p.alpha -= p.decay;
            ctx.globalAlpha = p.alpha;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color; ctx.shadowBlur = 15; ctx.shadowColor = p.color; ctx.fill();
        });

        if (active) {
            animationId = requestAnimationFrame(renderParticles);
        } else {
            cancelAnimationFrame(animationId);
            canvas.remove();
        }
    };
    renderParticles();
};
