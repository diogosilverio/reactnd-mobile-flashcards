export const LOAD_DECKS = "LOAD_DECKS";
export const NEW_DECK = "NEW_DECK";

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