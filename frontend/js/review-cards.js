import { getDeck, getCardsInDeck } from './api.js';

var params = new URLSearchParams(window.location.search);
var deckId = params.get('deckId');

var backBtn = document.getElementById('back-btn');
var deckTitle = document.getElementById('deck-title');
var prevBtn = document.getElementById('prev-btn');
var nextBtn = document.getElementById('next-btn');
var cardNumber = document.getElementById('card-number');
var question = document.getElementById('question');
var answer = document.getElementById('answer');
var toggleBtn = document.getElementById('toggle-btn');

var cards = [];
var index = 0;

async function init() {
    try {
        var deck = await getDeck(deckId);
    } catch (error) {
        alert('Error: Unable to get deck details');
        return;
    }
    deckTitle.textContent = `Review ${deck.name}`;
    
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
    var card = cards[index];
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