import { LOAD_DECKS } from '../actions';

function decks(state, action) {
    const { type } = action;

    switch(type){
        case LOAD_DECKS:{
            const decks = action.decks;

            return {
                decks
            };
        }
        default:{
            return state;
        }
    }
}

export default decks;