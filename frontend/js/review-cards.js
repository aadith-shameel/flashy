import { getDeck, getCardsInDeck } from './api.js';

let params = new URLSearchParams(window.location.search);
let deckId = params.get('deckId');

let backBtn = document.getElementById('back-btn');
let deckTitle = document.getElementById('deck-title');
let prevBtn = document.getElementById('prev-btn');
let nextBtn = document.getElementById('next-btn');
let cardNumber = document.getElementById('card-number');
let question = document.getElementById('question');
let answer = document.getElementById('answer');
let toggleBtn = document.getElementById('toggle-btn');

let cards = [];
let index = 0;

async function init() {
    try {
        var deck = await getDeck(deckId);
    } catch (error) {
        alert('Error: Unable to get deck details');
        return;
    }
    deckTitle.textContent = `Reviewing: ${deck.name}`;
    
    try {
        cards = await getCardsInDeck(deckId);
    } catch (error) {
        alert('Error: Unable to get cards in deck');
    }
    if(cards.length == 0) {
        question.textContent = "No cards in this deck.";
        answer.textContent = "";
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        toggleBtn.style.display = "none";
        return;
    }
    showCard();
}

async function showCard() {
    let card = cards[index];
    question.textContent = card.question;
    answer.textContent = card.answer;
    answer.style.display = "none";
    toggleBtn.textContent = "Show Answer";
    cardNumber.textContent = `${index + 1} / ${cards.length}`;
}

backBtn.onclick = function() {
    window.location = `manage-cards.html?deckId=${deckId}`;
}

toggleBtn.onclick = function() {
    if(answer.style.display == "none") {
        answer.style.display = "block";
        toggleBtn.textContent = "Hide Answer";
    } else {
        answer.style.display = "none";
        toggleBtn.textContent = "Show Answer";
    }
}

prevBtn.onclick = function() {
    if(cards.length == 0) {
        return;
    } else if(index == 0) {
        return;
    } else {
        index--;
    }
    showCard();
}

nextBtn.onclick = function() {
    if(cards.length == 0) {
        return;
    } else if(index == cards.length - 1) {
        return;
    } else {
        index++;
    }
    showCard();
}

document.addEventListener("DOMContentLoaded", init);