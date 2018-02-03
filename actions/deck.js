export const LOAD_DECKS = "LOAD_DECKS";
export const NEW_DECK = "NEW_DECK";
export const DELETE_DECK = "DELETE_DECK";
export const UPDATE_DECK_SCORE = "UPDATE_DECK_SCORE";

export const ADD_CARD = "ADD_CARD";
export const DELETE_CARD = "DELETE_CARD";

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

export function deleteDeck(deckKey){
    return {
        type: DELETE_DECK,
        deckKey
    }
}

export function addCard(deckKey, card){
    return {
        type: ADD_CARD,
        deckKey,
        card
    }
}

export function deleteCard(deckKey, cardName){
    return {
        type: DELETE_CARD,
        deckKey,
        cardName
    }
}

export function updateDeckScore(deckKey, score){
    return {
        type: UPDATE_DECK_SCORE,
        deckKey,
        score
    }
}