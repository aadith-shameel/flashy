import { getCard, updateCard } from "./api.js";

let params = new URLSearchParams(window.location.search);
let deckId = params.get("deckId");
let cardId = params.get("cardId");

let questionInput = document.getElementById("question");
let answerInput = document.getElementById("answer");
let form = document.getElementById("update-card-form");
let cancelBtn = document.getElementById("cancel-btn");

async function init() {
    try {
        var card = await getCard(cardId);
    } catch (error) {
        alert('Error: Unable to get card details');
    }
    questionInput.value = card.question;
    answerInput.value = card.answer;
}
document.addEventListener("DOMContentLoaded", init);

cancelBtn.onclick = function () {
    window.location = `manage-cards.html?deckId=${deckId}`;
}

form.onsubmit = async function (e) {
    e.preventDefault();
    let q = questionInput.value.trim();
    let a = answerInput.value.trim();
    if (!q || !a) {
        alert("Please fill in both fields");
        return;
    }

    try {
        await updateCard(cardId, q, a);
    } catch (error) {
        alert('Error: Unable to update card');
    }
    window.location = `manage-cards.html?deckId=${deckId}`;
};