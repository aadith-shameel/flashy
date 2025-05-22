import { getCard, updateCard } from "./api.js";

var params = new URLSearchParams(window.location.search);
var deckId = params.get("deckId");
var cardId = params.get("cardId");

var questionInput = document.getElementById("question");
var answerInput = document.getElementById("answer");
var form = document.getElementById("update-card-form");
var cancelBtn = document.getElementById("cancel-btn");

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

cancelBtn.onclick = function (e) {
    e.preventDefault();
    window.location = `manage-cards.html?deckId=${deckId}`;
}

form.onsubmit = async function (e) {
    e.preventDefault();
    var q = questionInput.value.trim();
    var a = answerInput.value.trim();
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