import { UPDATE_SCORE } from '../actions';

function scores(state = [], action) {
    const { type } = action;
    const scores = state;

    switch (type) {
        case UPDATE_SCORE: {
            return action.scores;
        }
        default: {
            return state;
        }
    }
}

export default scores;