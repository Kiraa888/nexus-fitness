const shallowEqual = (a, b) => {
    if (Object.is(a, b)) return true;
    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
    const keysA = Object.keys(a), keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => Object.is(a[key], b[key]));
};

export const createSubscriber = (store) => (selector, callback) => {
    let currentValue = selector(store.getState());
    callback(currentValue);

    return store.subscribe((state) => {
        const newValue = selector(state);
        if (!shallowEqual(currentValue, newValue)) {
            currentValue = newValue;
            callback(newValue);
        }
    });
};

export const selectUserLevel = state => state.user.level;
export const selectUserXpInfo = state => ({ xp: state.user.xp, nextLevelXp: state.user.nextLevelXp });
export const selectStats = state => state.stats;
