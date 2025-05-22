package com.aadith.flashy.service;

import com.aadith.flashy.model.Deck;
import com.aadith.flashy.model.DeckDTO;

import java.util.List;

public interface DeckService {

    List<Deck> getAllDecks();
    Deck getDeckById(long id);
    Deck saveDeck(DeckDTO deckDTO);
    Deck saveDeck(Deck deck);
    Deck updateDeck(long id, DeckDTO deckDTO);
    void deleteDeck(long id);

}