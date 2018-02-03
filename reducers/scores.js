import { UPDATE_SCORE, LOAD_SCORES } from '../actions/score';

function scores(state = [], action) {
    const { type } = action;
    const scores = state;

    switch (type) {
        case UPDATE_SCORE: {
            const refreshedScores = [...scores, action.score];
            return refreshedScores;
        }
        case LOAD_SCORES: {
            return action.scores;
        }
        default: {
            return state;
        }
    }
}

export default scores;