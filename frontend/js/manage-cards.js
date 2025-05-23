import { getDeck, getCardsInDeck, deleteCard } from "./api.js";

let params = new URLSearchParams(window.location.search);
let deckId = params.get("deckId");
let backBtn = document.getElementById("back-btn");
let deckTitle = document.getElementById("deck-title");
let createBtn = document.getElementById("create-card-btn");
let tableBody = document.querySelector("#cards-table tbody");

async function displayCards() {
    try {
        var deck = await getDeck(deckId);
    } catch (error) {
        alert('Error: Unable to fetch deck details');
    }
    deckTitle.textContent = "Deck: " + deck.name;

    try {
        var cards = await getCardsInDeck(deckId);
    } catch (error) {
        alert('Error: Unable to fetch cards');
    }
    tableBody.innerHTML = "";

    for (let i = 0; i < cards.length; i++) {
        let c = cards[i];
        let row = document.createElement("tr");
        row.setAttribute("data-id", c.cardId);

        let idCell = document.createElement("td");
        idCell.textContent = c.cardId;
        row.appendChild(idCell);

        let qCell = document.createElement("td");
        qCell.textContent = c.question;
        row.appendChild(qCell);

        let aCell = document.createElement("td");
        aCell.textContent = c.answer;
        row.appendChild(aCell);

        addButtons(row, c.cardId);

        tableBody.appendChild(row);
    }
}

function addButtons(row) {
    let buttonCell = document.createElement("td");

    buttonCell.innerHTML =
        `
        <button class="btn btn-warning update-btn me-2">
            Update
        </button>
        <button class='btn btn-danger delete-btn'>
            Delete
        </button>
    `;

    let updateBtn = buttonCell.querySelector(".update-btn");
    updateBtn.onclick = function () {
        let cardId = row.getAttribute('data-id');
        window.location = `update-card.html?deckId=${deckId}&cardId=${cardId}`;
    };

    let deleteBtn = buttonCell.querySelector(".delete-btn");
    deleteBtn.onclick = async function () {
        let cardId = row.getAttribute('data-id');
        if (confirm("Delete this card?")) {
            try {
                await deleteCard(cardId);
                await displayCards();
            } catch (error) {
                alert('Error: Unable to delete card');
            }
        }
    };

    row.appendChild(buttonCell);
}

createBtn.onclick = function () {
    window.location = `create-card.html?deckId=${deckId}`;
}

backBtn.onclick = function () {
    window.location = `../index.html`;
}

document.addEventListener("DOMContentLoaded", displayCards);