package com.aadith.flashy.model;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "CARD")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CARD_ID")
    private Long cardId;

    @Column(name = "QUESTION")
    private String question;

    @Column(name = "ANSWER")
    private String answer;

    @ManyToOne
    @JoinColumn(name = "FK_DECK_ID")
    private Deck deck;

    public Card() {
    }

    public Card(String question, String answer, Deck deck) {
        this.question = question;
        this.answer = answer;
        this.deck = deck;
    }

    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Deck getDeck() {
        return deck;
    }

    public void setDeck(Deck deck) {
        this.deck = deck;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Card card = (Card) o;
        return Objects.equals(cardId, card.cardId) && Objects.equals(question, card.question) && Objects.equals(answer, card.answer) && Objects.equals(deck, card.deck);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cardId, question, answer, deck);
    }

    @Override
    public String toString() {
        return "Card{" +
                "cardId=" + cardId +
                ", question='" + question + '\'' +
                ", answer='" + answer + '\'' +
                ", deck=" + deck +
                '}';
    }
}
