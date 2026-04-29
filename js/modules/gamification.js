import { GAME_CONFIG } from '../config/constants.js';

export const calculateXP = (sets, reps, weight) => {
    const validSets = Math.max(1, parseInt(sets, 10) || 1);
    const validReps = Math.max(1, parseInt(reps, 10) || 1);
    const validWeight = Math.max(0, parseInt(weight, 10) || 0);

    const volume = validSets * validReps * validWeight;
    const baseXP = Math.floor(volume / GAME_CONFIG.VOL_DIVISOR);
    const bonusXP = validSets >= GAME_CONFIG.BONUS_SETS_THRESHOLD ? GAME_CONFIG.BONUS_XP_AMOUNT : 0; 
    
    return { xp: baseXP + bonusXP, volume };
};

export const checkLevelUp = (currentXp, currentLevel) => {
    const nextLevelXp = Math.floor(GAME_CONFIG.BASE_XP_REQ * Math.pow(GAME_CONFIG.XP_MULTIPLIER, currentLevel - 1));
    
    if (currentXp >= nextLevelXp) {
        const higherLevelNextXp = Math.floor(GAME_CONFIG.BASE_XP_REQ * Math.pow(GAME_CONFIG.XP_MULTIPLIER, currentLevel));
        return { leveledUp: true, newLevel: currentLevel + 1, newNextLevelXp: higherLevelNextXp };
    }
    return { leveledUp: false, newLevel: currentLevel, newNextLevelXp: nextLevelXp };
};

export const processWorkout = (state, sets, reps, weight) => {
    const { xp, volume } = calculateXP(sets, reps, weight);
    const pendingXp = state.user.xp + xp;
    const levelData = checkLevelUp(pendingXp, state.user.level);
    
    return { volume, newXp: pendingXp, ...levelData };
};
