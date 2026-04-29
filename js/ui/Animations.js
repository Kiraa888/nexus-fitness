const activeAnimations = new WeakMap();

export const animateValue = (obj, start, end, duration) => {
    if (activeAnimations.has(obj)) {
        cancelAnimationFrame(activeAnimations.get(obj));
    }

    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        obj.textContent = Math.floor(easeProgress * (end - start) + start);
        
        if (progress < 1) {
            activeAnimations.set(obj, requestAnimationFrame(step));
        } else {
            obj.textContent = end;
            activeAnimations.delete(obj);
        }
    };
    
    activeAnimations.set(obj, requestAnimationFrame(step));
};
