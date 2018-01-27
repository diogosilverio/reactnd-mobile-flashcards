export const LOAD_DECKS = "LOAD_DECKS";
export const NEW_DECK = "NEW_DECK";

export const ADD_CARD = "ADD_CARD";

export function loadDecks(decks){
    return {
        type: LOAD_DECKS,
        decks
    }
}

export function newDeck(deck){
    return {
        type: NEW_DECK,
        deck
    }
}

export function addCard(deckKey, card){
    return {
        type: ADD_CARD,
        deckKey,
        card
    }
}