import { AsyncStorage } from 'react-native';

const FLASHCARDS_STORAGE_KEY = "Flashcards:decks"

export async function persistDeck(deck){
    await AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [deck.name]: deck
    }))
}

export async function loadDecks() {
    const decks = JSON.parse(await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY));
    return decks !== null ? decks : [];
}