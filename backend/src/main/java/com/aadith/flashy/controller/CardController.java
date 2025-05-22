package com.aadith.flashy.controller;

import com.aadith.flashy.model.Card;
import com.aadith.flashy.model.CardDTO;
import com.aadith.flashy.service.CardService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/cards")
@CrossOrigin(origins = "*")
public class CardController {

    private CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping()
    public ResponseEntity<CardDTO> createCard(@RequestBody CardDTO cardDTO) {
        Card persistedCard = cardService.saveCard(cardDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(persistedCard.getCardId()).toUri();
        BeanUtils.copyProperties(persistedCard, cardDTO);
        return ResponseEntity.created(location).body(cardDTO);
    }

    @GetMapping()
    public ResponseEntity<List<CardDTO>> getAllCards() {
        List<Card> returnedCards = cardService.getAllCards();
        List<CardDTO> cardDTOs = new ArrayList<>();
        for(Card card : returnedCards) {
            CardDTO cardDTO = new CardDTO();
            BeanUtils.copyProperties(card, cardDTO);
            cardDTOs.add(cardDTO);
        }
        return ResponseEntity.ok(cardDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CardDTO> getCardById(@PathVariable long id) {
        Card returnedCard = cardService.getCardById(id);
        CardDTO cardDTO = new CardDTO();
        BeanUtils.copyProperties(returnedCard, cardDTO);
        return ResponseEntity.ok(cardDTO);
    }

    @GetMapping("/deck/{deckId}")
    public ResponseEntity<List<CardDTO>> getCardsInDeck(@PathVariable long deckId) {
        List<Card> returnedCards = cardService.getCardsInDeck(deckId);
        List<CardDTO> cardDTOs = new ArrayList<>();
        for(Card card : returnedCards) {
            CardDTO cardDTO = new CardDTO();
            BeanUtils.copyProperties(card, cardDTO);
            cardDTOs.add(cardDTO);
        }
        return ResponseEntity.ok(cardDTOs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CardDTO> updateCardById(@PathVariable long id, @RequestBody CardDTO cardDTO) {
        Card updatedCard = cardService.updateCard(id, cardDTO);
        BeanUtils.copyProperties(updatedCard, cardDTO);
        return ResponseEntity.ok(cardDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCard(@PathVariable long id) {
        cardService.deleteCard(id);
        return ResponseEntity.ok("Card with ID " + id + " was deleted");
    }

    @PostMapping("/set-deck")
    public ResponseEntity<String> addCardToDeck(@RequestParam long cardId, @RequestParam long deckId) {
        cardService.setDeck(cardId, deckId);
        return ResponseEntity.ok("Card with ID " + cardId + " was added to deck with ID " + deckId);
    }
}
