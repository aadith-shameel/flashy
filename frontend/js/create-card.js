import { createCard } from "./api.js";

let params = new URLSearchParams(window.location.search);
let deckId = params.get("deckId");

let questionInput = document.getElementById("question");
let answerInput = document.getElementById("answer");
let form = document.getElementById("create-card-form");
let cancelBtn = document.getElementById("cancel-btn");

cancelBtn.onclick = function (e) {
    e.preventDefault();
    window.location = `manage-cards.html?deckId=${deckId}`;
}

form.onsubmit = async function (e) {
    e.preventDefault();
    let q = questionInput.value.trim();
    let a = answerInput.value.trim();
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