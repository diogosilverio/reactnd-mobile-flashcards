import {
    LOAD_DECKS,
    NEW_DECK,
    ADD_CARD,
    DELETE_DECK,
    DELETE_CARD
} from '../actions/deck';

function decks(state = {}, action) {
    const { type } = action;
    const decks = state;

    switch (type) {
        case LOAD_DECKS: {
            const decks = action.decks;

            return decks;
        }
        case NEW_DECK: {
            const deck = action.deck;
            const freshDecks = {
                ...decks,
                [deck.name]: deck
            }

            return freshDecks;
        }
        case DELETE_DECK: {
            const { deckKey } = action;
            
            const refreshedDecks = Object.assign({}, decks);
            delete refreshedDecks[deckKey];
            return refreshedDecks;
        }
        case ADD_CARD: {
            const { card, deckKey } = action;
            const freshDeck = decks[deckKey];

            freshDeck.cards.push(card);

            const freshDecks = {
                ...decks,
                [deckKey]: freshDeck
            }
            return freshDecks;
        }
        case DELETE_CARD: {
            const { deckKey, cardName } = action;
            const freshDecks = {
                ...decks,
                [deckKey]: {
                    ...decks[deckKey],
                    cards: decks[deckKey].cards.filter(card => card.question !== cardName)
                }
            };

            return freshDecks;
        }
        default: {
            return state;
        }
    }
}

export default decks;