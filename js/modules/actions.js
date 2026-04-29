import { ACTIONS } from '../config/constants.js';
import { processWorkout } from './gamification.js';
import { showToast } from '../ui/Toast.js';
import { fireLevelUpNova } from '../ui/Effects.js';

export const thunkMiddleware = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
        return action(dispatch, getState);
    }
    return next(action);
};

export const loggerMiddleware = store => next => action => {
    console.groupCollapsed(`[ACTION]: ${action.type}`);
    console.log('Payload:', action.payload);
    const result = next(action);
    console.log('New State:', store.getState());
    console.groupEnd();
    return result;
};

export const logWorkoutAsync = (sets, reps, weight) => (dispatch, getState) => {
    const state = getState();
    const workoutData = processWorkout(state, sets, reps, weight);

    // Simulate network latency
    setTimeout(() => {
        dispatch({ type: ACTIONS.LOG_WORKOUT, payload: workoutData });

        if (workoutData.leveledUp) {
            fireLevelUpNova();
            showToast(`⚡ SYSTEM UPGRADE: LEVEL ${workoutData.newLevel} UNLOCKED ⚡`, 'levelup');
        } else {
            const earnedXp = workoutData.newXp - state.user.xp;
            showToast(`Workout logged. +${earnedXp} XP`, 'success');
        }
    }, 300);
};
