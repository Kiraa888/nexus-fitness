import Store from './utils/Store.js';
import { rootReducer, initialState } from './data/reducers.js';
import { thunkMiddleware, loggerMiddleware, logWorkoutAsync } from './modules/actions.js';
import { createSubscriber, selectUserLevel, selectUserXpInfo, selectStats } from './utils/Selectors.js';
import { el } from './utils/DOM.js';
import { animateValue } from './ui/Animations.js';
import { exerciseDB } from './data/exercises.js';

// --- INIT STORE ---
const appStore = new Store(rootReducer, initialState, [thunkMiddleware, loggerMiddleware]);
const subscribeTo = createSubscriber(appStore);

// --- CACHED DOM ---
const DOM = {
    mainMenu: document.querySelector('.main-menu'),
    views: document.querySelectorAll('.view-section'),
    loggerContainer: document.getElementById('logger-view'),
    xpText: document.querySelector('.xp-header span:last-child'),
    xpFill: document.querySelector('.xp-bar-fill'),
    statWorkouts: document.getElementById('stat-workouts'),
    statVolume: document.getElementById('stat-volume'),
    statStreak: document.getElementById('stat-streak'),
    quickStartBtn: document.getElementById('btn-quick-start')
};

// --- NAVIGATION (Event Delegation) ---
DOM.mainMenu.addEventListener('click', (e) => {
    if (!e.target.matches('.nav-btn')) return;
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    
    const targetId = e.target.getAttribute('data-target');
    DOM.views.forEach(v => v.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');
});

DOM.quickStartBtn.addEventListener('click', () => document.querySelector('[data-target="logger-view"]').click());

// --- SELECTOR SUBSCRIPTIONS ---
subscribeTo(selectUserLevel, (level) => {
    document.querySelectorAll('.level-badge').forEach(b => {
        b.textContent = `LVL ${level}`;
        b.classList.add('pulse-glow');
        setTimeout(() => b.classList.remove('pulse-glow'), 500);
    });
});

subscribeTo(selectUserXpInfo, ({ xp, nextLevelXp }) => {
    const xpPercent = (xp / nextLevelXp) * 100;
    DOM.xpFill.style.width = `${Math.min(xpPercent, 100)}%`;
    
    const currentTextXp = parseInt(DOM.xpText.textContent.split(' ')[0]) || 0;
    const proxyObj = { set textContent(val) { DOM.xpText.textContent = `${val} / ${nextLevelXp}`; } };
    animateValue(proxyObj, currentTextXp, xp, 1000); 
});

subscribeTo(selectStats, (stats) => {
    animateValue(DOM.statWorkouts, parseInt(DOM.statWorkouts.textContent) || 0, stats.totalWorkouts, 800);
    DOM.statVolume.textContent = `${(stats.volume / 1000).toFixed(1)}k`;
    DOM.statStreak.innerHTML = `${stats.streak}<span class="stat-unit">d</span>`;
});

// --- COMPONENT BUILDER ---
const renderLogger = () => {
    const ui = el('div', { className: 'glass-card logger-card', children: [
        el('h2', { className: 'panel-title', text: 'Initiate Protocol: Heavy Lifting' }),
        el('div', { className: 'input-group-dark logger-controls', children: [
            el('select', { className: 'cyber-select', attrs: { id: 'exercise-select' }, children: 
                exerciseDB.map(ex => el('option', { text: ex.name, attrs: { value: ex.name } }))
            }),
            el('input', { className: 'cyber-input', attrs: { id: 'set-sets', type: 'number', placeholder: 'Sets', value: '3' } }),
            el('span', { className: 'mono-text', text: 'x' }),
            el('input', { className: 'cyber-input', attrs: { id: 'set-reps', type: 'number', placeholder: 'Reps', value: '8' } }),
            el('span', { className: 'mono-text', text: '@' }),
            el('input', { className: 'cyber-input', attrs: { id: 'set-weight', type: 'number', placeholder: 'Kg' } })
        ]}),
        el('button', { 
            className: 'btn-primary glow-effect full-width', 
            text: '[ SYSTEM: FINISH & LOG ]',
            onClick: () => {
                const sets = document.getElementById('set-sets').value;
                const reps = document.getElementById('set-reps').value;
                const weight = document.getElementById('set-weight').value;
                
                appStore.dispatch(logWorkoutAsync(sets, reps, weight));
                document.getElementById('set-weight').value = '';
                document.querySelector('[data-target="dashboard-view"]').click();
            }
        })
    ]});

    DOM.loggerContainer.appendChild(ui);
};

// Init
renderLogger();
