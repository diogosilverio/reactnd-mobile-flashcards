export const LOAD_DECKS = "LOAD_DECKS";

export function loadDecks(decks){
    return {
        action: LOAD_DECKS,
        decks
    }
}