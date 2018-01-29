export const UPDATE_SCORE = "UPDATE_SCORE";

export function updateScore(scores){
    return {
        type: UPDATE_SCORE,
        scores
    }
}