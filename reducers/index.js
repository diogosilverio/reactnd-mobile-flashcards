import {
    LOAD_DECKS,
    NEW_DECK,
    ADD_CARD,
    DELETE_DECK
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
                decks: freshDecks
            }
        }
        case DELETE_DECK: {
            const { deckKey } = action;
            delete decks[deckKey];

            const refreshedDecks = decks;
            return {
                decks: refreshedDecks
            }
        }
        case ADD_CARD: {
            const { card, deckKey } = action;
            const freshDeck = decks[deckKey];

            freshDeck.cards.push(card);

            const freshDecks = {
                ...decks,
                [deckKey]: freshDeck
            }
            return {
                decks: freshDecks
            }

        }
        default: {
            return state;
        }
    }
}

export default decks;