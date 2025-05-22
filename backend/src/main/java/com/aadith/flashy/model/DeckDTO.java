package com.aadith.flashy.model;

import java.util.Objects;

public class DeckDTO {

    private Long deckId;
    private String name;

    public DeckDTO() {
    }

    public DeckDTO(long id, String name) {
        this.deckId = id;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getDeckId() {
        return deckId;
    }

    public void setDeckId(long deckId) {
        this.deckId = deckId;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        DeckDTO deckDTO = (DeckDTO) o;
        return deckId == deckDTO.deckId && Objects.equals(name, deckDTO.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(deckId, name);
    }

    @Override
    public String toString() {
        return "DeckDTO{" +
                "id=" + deckId +
                ", name='" + name + '\'' +
                '}';
    }
}
