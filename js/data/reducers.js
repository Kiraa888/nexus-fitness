import { ACTIONS } from '../config/constants.js';

export const initialState = {
    user: { level: 1, xp: 0, nextLevelXp: 500 },
    stats: { totalWorkouts: 0, streak: 0, volume: 0 },
    history: []
};

export const rootReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.LOG_WORKOUT:
            return {
                ...state,
                user: {
                    ...state.user,
                    level: action.payload.newLevel,
                    xp: action.payload.newXp,
                    nextLevelXp: action.payload.newNextLevelXp
                },
                stats: {
                    ...state.stats,
                    totalWorkouts: state.stats.totalWorkouts + 1,
                    volume: state.stats.volume + action.payload.volume,
                    streak: state.stats.streak === 0 ? 1 : state.stats.streak
                }
            };
        case ACTIONS.APP_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
