import { getDeck, getCardsInDeck, deleteCard } from "./api.js";

var params = new URLSearchParams(window.location.search);
var deckId = params.get("deckId");
var backBtn = document.getElementById("back-btn");
var deckTitle = document.getElementById("deck-title");
var createBtn = document.getElementById("create-card-btn");
var tableBody = document.querySelector("#cards-table tbody");

createBtn.href = `create-card.html?deckId=${deckId}`;

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

    for (var i = 0; i < cards.length; i++) {
        var c = cards[i];
        var row = document.createElement("tr");
        row.setAttribute("data-id", c.cardId);

        var idCell = document.createElement("td");
        idCell.textContent = c.cardId;
        row.appendChild(idCell);

        var qCell = document.createElement("td");
        qCell.textContent = c.question;
        row.appendChild(qCell);

        var aCell = document.createElement("td");
        aCell.textContent = c.answer;
        row.appendChild(aCell);

        addButtons(row, c.cardId);

        tableBody.appendChild(row);
    }
}

function addButtons(row) {
    var buttonCell = document.createElement("td");

    buttonCell.innerHTML =
        `
        <button class="btn btn-warning update-btn me-2">
            Update
        </button>
        <button class='btn btn-danger delete-btn'>
            Delete
        </button>
    `;

    var updateBtn = buttonCell.querySelector(".update-btn");
    updateBtn.onclick = function () {
        var cardId = row.getAttribute('data-id');
        window.location = `update-card.html?deckId=${deckId}&cardId=${cardId}`;
    };

    var deleteBtn = buttonCell.querySelector(".delete-btn");
    deleteBtn.onclick = async function () {
        var cardId = row.getAttribute('data-id');
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

backBtn.onclick = function () {
    window.location = `../index.html`;
}

document.addEventListener("DOMContentLoaded", displayCards);