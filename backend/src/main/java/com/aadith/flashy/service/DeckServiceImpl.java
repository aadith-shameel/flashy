package com.aadith.flashy.service;

import com.aadith.flashy.model.Deck;
import com.aadith.flashy.model.DeckDTO;
import com.aadith.flashy.repository.DeckRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DeckServiceImpl implements DeckService{

    private DeckRepository deckRepository;

    @Autowired
    public DeckServiceImpl(DeckRepository deckRepository) {
        this.deckRepository = deckRepository;
    }

    @Override
    public List<Deck> getAllDecks() {
        return deckRepository.findAll();
    }

    @Override
    public Deck getDeckById(long id) {
        Optional<Deck> returnedDeck = deckRepository.findById(id);
        return returnedDeck.orElseThrow(() -> new DeckNotFoundException("Deck with ID " + id + " was not found"));
    }

    @Override
    public Deck saveDeck(DeckDTO deckDTO) {
        Deck deck = new Deck();
        BeanUtils.copyProperties(deckDTO, deck, "deckId");
        return deckRepository.save(deck);
    }

    @Override
    public Deck saveDeck(Deck deck) {
        return deckRepository.save(deck);
    }

    @Override
    public Deck updateDeck(long id, DeckDTO deckDTO) {
        Optional<Deck> returnedDeck = deckRepository.findById(id);
        if(returnedDeck.isEmpty()) {
            throw new DeckNotFoundException("Deck with ID " + id + " was not found");
        } else {
            Deck deck = returnedDeck.get();
            BeanUtils.copyProperties(deckDTO, deck, "deckId");
            return deckRepository.save(deck);
        }
    }

    @Override
    public void deleteDeck(long id) {
        Optional<Deck> returnedDeck = deckRepository.findById(id);
        if(returnedDeck.isEmpty()) {
            throw new DeckNotFoundException("Deck with ID " + id + " was not found");
        } else {
            deckRepository.deleteById(id);
        }
    }
}
