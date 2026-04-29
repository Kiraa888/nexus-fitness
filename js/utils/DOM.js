export const el = (tag, options = {}) => {
    const element = document.createElement(tag);
    if (options.className) element.className = options.className;
    if (options.text) element.textContent = options.text;
    if (options.onClick) element.addEventListener('click', options.onClick);
    if (options.key) element.dataset.key = options.key;
    
    if (options.attrs) {
        Object.entries(options.attrs).forEach(([k, v]) => element.setAttribute(k, v));
    }
    
    if (options.children) {
        options.children.forEach(child => {
            if (child) element.appendChild(child);
        });
    }
    return element;
};
