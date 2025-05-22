import { createCard } from "./api.js";

var params = new URLSearchParams(window.location.search);
var deckId = params.get("deckId");

var questionInput = document.getElementById("question");
var answerInput = document.getElementById("answer");
var form = document.getElementById("create-card-form");
var cancelBtn = document.getElementById("cancel-btn");

cancelBtn.onclick = function (e) {
    e.preventDefault();
    window.location = `manage-cards.html?deckId=${deckId}`;
}

form.onsubmit = async function (e) {
    e.preventDefault();
    var q = questionInput.value.trim();
    var a = answerInput.value.trim();
    if (!q || !a) {
        alert('Please fill in both the question and answer fields');
        return;
    }

    try {
        await createCard(deckId, q, a);
    } catch (error) {
        alert('Error: Unable to create card');
    }
    window.location = `manage-cards.html?deckId=${deckId}`;
};