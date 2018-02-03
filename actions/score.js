export const LOAD_SCORES = "LOAD_SCORE";
export const UPDATE_SCORE = "UPDATE_SCORE";

export function loadScores(scores){
    return {
        type: LOAD_SCORES,
        scores
    }
}

export function updateScores(score){
    return {
        type: UPDATE_SCORE,
        score
    }
}