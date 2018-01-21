import {
    LOAD_DECKS,
    NEW_DECK
} from '../actions';

function decks(state = { decks: {} }, action) {
    const { type } = action;
    const { decks } = state;

    switch (type) {
        case LOAD_DECKS: {
            const decks = action.decks;

            return {
                decks
            };
        }
        case NEW_DECK: {
            const deck = action.deck;
            const freshDecks = {
                ...decks,
                [deck.name]: deck
            }

            return {
                decks
            }
        }
        default: {
            return state;
        }
    }
}

export default decks;