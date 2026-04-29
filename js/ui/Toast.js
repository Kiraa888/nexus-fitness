export const showToast = (message, type = 'success') => {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `glass-card`;
    toast.style.cssText = 'padding: 15px 20px; color: #fff; border-left: 4px solid var(--accent-blue); animation: fadeIn 0.3s ease-out;';
    toast.textContent = message;

    if (type === 'levelup') {
        toast.style.borderLeftColor = 'var(--accent-pink)';
        toast.style.boxShadow = 'var(--neon-glow-pink)';
    }

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
};
