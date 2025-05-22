package com.aadith.flashy.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "DECK")
public class Deck {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DECK_ID_GEN")
    @SequenceGenerator(name = "DECK_ID_GEN")
    @Column(name = "DECK_ID")
    private Long deckId;

    @Column(name = "NAME")
    private String name;

    @OneToMany(mappedBy = "deck", cascade = CascadeType.ALL)
    private List<Card> cards;

    public Deck() {
    }

    public Deck(String name, List<Card> cards) {
        this.name = name;
        this.cards = cards;
    }

    public Long getDeckId() {
        return deckId;
    }

    public void setDeckId(Long deckId) {
        this.deckId = deckId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Deck deck = (Deck) o;
        return Objects.equals(deckId, deck.deckId) && Objects.equals(name, deck.name) && Objects.equals(cards, deck.cards);
    }

    @Override
    public int hashCode() {
        return Objects.hash(deckId, name, cards);
    }

    @Override
    public String toString() {
        return "Deck{" +
                "deckId=" + deckId +
                ", name='" + name + '\'' +
                ", cards=" + cards +
                '}';
    }
}
