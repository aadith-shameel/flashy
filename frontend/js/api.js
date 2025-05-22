export const API_BASE = "http://localhost:8080/api/v1";

export async function getAllDecks() {
  const res = await fetch(`${API_BASE}/decks`);
  return res.json();
}

export async function getDeck(deckId) {
  const res = await fetch(`${API_BASE}/decks/${deckId}`);
  return res.json();
}

export async function createDeck(name) {
  const res = await fetch(`${API_BASE}/decks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  return res.json();
}

export async function updateDeck(deckId, name) {
  const res = await fetch(`${API_BASE}/decks/${deckId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  return res.json();
}

export async function deleteDeck(deckId) {
  await fetch(`${API_BASE}/decks/${deckId}`, { method: "DELETE" });
}


export async function getCardsInDeck(deckId) {
  const res = await fetch(`${API_BASE}/cards/deck/${deckId}`);
  return res.json();
}

export async function getCard(cardId) {
  const res = await fetch(`${API_BASE}/cards/${cardId}`);
  return res.json();
}

export async function createCard(deckId, question, answer) {
  const res = await fetch(`${API_BASE}/cards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answer })
  });
  const createdCard = await res.json();
  const cardId = createdCard.cardId;
  const set = await fetch(`${API_BASE}/cards/set-deck?cardId=${cardId}&deckId=${deckId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cardId, deckId  })
  })
  return createdCard;
}

export async function updateCard(cardId, question, answer) {
  const res = await fetch(`${API_BASE}/cards/${cardId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answer })
  });
  return res.json();
}

export async function deleteCard(cardId) {
  await fetch(`${API_BASE}/cards/${cardId}`, { method: "DELETE" });
}