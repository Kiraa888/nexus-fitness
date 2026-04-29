const STORAGE_VERSION = 1;
const IS_DEV = true;

const deepFreeze = (obj) => {
    Object.freeze(obj);
    Object.getOwnPropertyNames(obj).forEach(prop => {
        if (obj[prop] !== null && (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') && !Object.isFrozen(obj[prop])) {
            deepFreeze(obj[prop]);
        }
    });
    return obj;
};

export default class Store {
    constructor(reducer, initialState = {}, middlewares = []) {
        this.reducer = reducer;
        this.state = this.loadFromStorage() || initialState;
        this.listeners = [];
        this.isRendering = false;

        if (IS_DEV) window.__NEXUS_STORE__ = this;

        const storeAPI = { getState: () => this.state, dispatch: (action) => this.dispatch(action) };
        const chain = middlewares.map(mw => mw(storeAPI));
        this.dispatch = chain.reduceRight((next, mw) => mw(next), this._baseDispatch.bind(this));
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => { this.listeners = this.listeners.filter(l => l !== listener); };
    }

    _baseDispatch(action) {
        const prevState = this.state;
        this.state = this.reducer(this.state, action);
        
        if (IS_DEV) deepFreeze(this.state);
        this.syncToStorage();

        if (!this.isRendering) {
            this.isRendering = true;
            requestAnimationFrame(() => {
                this.listeners.forEach(l => l(this.state, prevState));
                this.isRendering = false;
            });
        }
    }

    getState() { return this.state; }

    syncToStorage() {
        try { localStorage.setItem('nexus_data', JSON.stringify({ version: STORAGE_VERSION, data: this.state })); } 
        catch (e) { console.error('[STORAGE]:', e); }
    }

    loadFromStorage() {
        try {
            const raw = localStorage.getItem('nexus_data');
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (parsed.version !== STORAGE_VERSION) return null;
            return parsed.data;
        } catch { return null; }
    }
}
