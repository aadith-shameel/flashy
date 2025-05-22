package com.aadith.flashy.service;

import com.aadith.flashy.model.Card;
import com.aadith.flashy.model.CardDTO;

import java.util.List;

public interface CardService {

    List<Card> getAllCards();
    Card getCardById(long id);
    List<Card> getCardsInDeck(long deckId);
    Card saveCard(CardDTO cardDTO);
    Card updateCard(long id, CardDTO cardDTO);
    void deleteCard(long id);
    void setDeck(long cardId, long deckId);
}
