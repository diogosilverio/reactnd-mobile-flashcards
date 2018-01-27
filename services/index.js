import { AsyncStorage } from 'react-native';

const FLASHCARDS_STORAGE_KEY = "Flashcards:decks"

export async function persistDeck(deck){
    await AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [deck.name]: deck
    }))
}

export async function deleteDeck(deckKey){
    let decks = await loadDecks();
    delete decks[deckKey];

    await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks));
}

export async function loadDecks() {
    const decks = JSON.parse(await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY));
    return decks !== null ? decks : [];
}

export async function getDeck(deckKey){
    const decks = await loadDecks();
    const deck = decks[deckKey];
    return deck;
}

export async function addCardToDeck(deckKey, card){
    const deck = await getDeck(deckKey);

    if(typeof deck === 'undefined'){
        console.warn(`Trying to fetch invalid deck: ${deckKey}`);
        return;
    }

    deck.cards.push(card)
    await persistDeck(deck);
}

export async function deleteCardFromDeck(deckKey, cardName){
    const deck = await getDeck(deckKey);
    deck.cards = deck.cards.filter(card => card.question !== cardName);

    await persistDeck(deck);
}