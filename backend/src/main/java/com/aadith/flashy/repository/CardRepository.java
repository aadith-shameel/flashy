package com.aadith.flashy.repository;

import com.aadith.flashy.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {
    @Query("SELECT c from Card c WHERE c.deck.deckId = :deckId")
    List<Card> getCardsInDeck(@Param("deckId") long deckId);
}
