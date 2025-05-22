package com.aadith.flashy.controller;

import com.aadith.flashy.model.Deck;
import com.aadith.flashy.model.DeckDTO;
import com.aadith.flashy.service.DeckService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/decks")
@CrossOrigin(origins = "*")
public class DeckController {

    private DeckService deckService;

    @Autowired
    public DeckController(DeckService deckService) {
        this.deckService = deckService;
    }

    @PostMapping()
    public ResponseEntity<DeckDTO> createDeck(@RequestBody DeckDTO deckDTO) {
        Deck persistedDeck = deckService.saveDeck(deckDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(persistedDeck.getDeckId()).toUri();
        DeckDTO returnedDeckDTO = new DeckDTO();
        BeanUtils.copyProperties(persistedDeck, returnedDeckDTO);
        return ResponseEntity.created(location).body(returnedDeckDTO);
    }

    @GetMapping
    public ResponseEntity<List<DeckDTO>> getAllDecks() {
        List<Deck> returnedDecks = deckService.getAllDecks();
        List<DeckDTO> returnedDeckDTOs = new ArrayList<>();
        for(Deck deck : returnedDecks) {
            DeckDTO deckDTO = new DeckDTO();
            BeanUtils.copyProperties(deck, deckDTO);
            returnedDeckDTOs.add(deckDTO);
        }
        return ResponseEntity.ok(returnedDeckDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeckDTO> getDeckById(@PathVariable long id) {
        Deck returnedDeck = deckService.getDeckById(id);
        DeckDTO deckDTO = new DeckDTO();
        BeanUtils.copyProperties(returnedDeck, deckDTO);
        return ResponseEntity.ok(deckDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeckDTO> updateDeck(@PathVariable long id, @RequestBody DeckDTO deckDTO) {
        Deck updatedDeck = deckService.updateDeck(id, deckDTO);
        DeckDTO updatedDeckDTO = new DeckDTO();
        BeanUtils.copyProperties(updatedDeck, updatedDeckDTO);
        return ResponseEntity.ok(updatedDeckDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDeck(@PathVariable long id) {
        deckService.deleteDeck(id);
        return ResponseEntity.ok("Deck with ID " + id + " was deleted");
    }
}
