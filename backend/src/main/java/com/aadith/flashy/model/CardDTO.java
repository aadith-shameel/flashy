package com.aadith.flashy.model;

import java.util.Objects;

public class CardDTO {

    private long cardId;
    private String question;
    private String answer;

    public CardDTO() {
    }

    public CardDTO(long id, String question, String answer) {
        this.cardId = id;
        this.question = question;
        this.answer = answer;
    }

    public long getCardId() {
        return cardId;
    }

    public void setCardId(long cardId) {
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

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        CardDTO cardDTO = (CardDTO) o;
        return cardId == cardDTO.cardId && Objects.equals(question, cardDTO.question) && Objects.equals(answer, cardDTO.answer);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cardId, question, answer);
    }

    @Override
    public String toString() {
        return "CardDTO{" +
                "id=" + cardId +
                ", question='" + question + '\'' +
                ", answer='" + answer + '\'' +
                '}';
    }
}
