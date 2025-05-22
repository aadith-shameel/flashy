package com.aadith.flashy.service;

import com.aadith.flashy.model.Card;
import com.aadith.flashy.model.CardDTO;
import com.aadith.flashy.model.Deck;
import com.aadith.flashy.model.DeckDTO;
import com.aadith.flashy.repository.CardRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CardServiceImpl implements CardService{

    private CardRepository cardRepository;
    private DeckService deckService;

    @Autowired
    public CardServiceImpl(CardRepository cardRepository, DeckService deckService) {
        this.cardRepository = cardRepository;
        this.deckService = deckService;
    }

    @Override
    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    @Override
    public Card getCardById(long id) {
        Optional<Card> returnedCard = cardRepository.findById(id);
        return returnedCard.orElseThrow(() -> new CardNotFoundException("Card with ID " + id + " was not found"));
    }

    @Override
    public List<Card> getCardsInDeck(long deckId) {
        return cardRepository.getCardsInDeck(deckId);
    }

    @Override
    public Card saveCard(CardDTO cardDTO) {
        Card card = new Card();
        BeanUtils.copyProperties(cardDTO, card, "cardId");
        return cardRepository.save(card);
    }

    @Override
    public Card updateCard(long id, CardDTO cardDTO) {
        Optional<Card> returnedCard = cardRepository.findById(id);
        if(returnedCard.isEmpty()) {
            throw new CardNotFoundException("Card with ID " + id + " was not found");
        } else {
            Card updatedCard = returnedCard.get();
            BeanUtils.copyProperties(cardDTO, updatedCard, "cardId");
            return cardRepository.save(updatedCard);
        }
    }

    @Override
    public void deleteCard(long id) {
        Optional<Card> returnedCard = cardRepository.findById(id);
        if(returnedCard.isEmpty()) {
            throw new CardNotFoundException("Card with ID " + id + " was not found");
        } else {
            cardRepository.deleteById(id);
        }
    }

    @Override
    public void setDeck(long cardId, long deckId) {
        Card receivedCard = getCardById(cardId);
        Deck receivedDeck = deckService.getDeckById(deckId);
        receivedCard.setDeck(receivedDeck);
        cardRepository.save(receivedCard);
        receivedDeck.getCards().add(receivedCard);
        deckService.saveDeck(receivedDeck);
    }


}
